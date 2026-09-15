import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the restaurant application", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /SABOR &amp; MAÑANA/i);
  assert.match(html, /Desayunos y almuerzos en Lima/i);
  assert.doesNotMatch(html, /Habita|propiedades excepcionales/i);
});

test("keeps menu data typed and the interface componentized", async () => {
  const [components, menu, types, css] = await Promise.all([
    readdir(new URL("../app/components/", import.meta.url)),
    readFile(new URL("../app/data/menu.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/types/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  for (const component of ["Navbar.tsx", "Hero.tsx", "Menu.tsx", "ProductModal.tsx", "CartDrawer.tsx", "Reservation.tsx", "Footer.tsx"]) {
    assert.ok(components.includes(component), `missing ${component}`);
  }
  for (const dish of ["Pancakes de la Casa", "Lomo Saltado", "Pasta Alfredo", "Bowl Criollo"]) assert.match(menu, new RegExp(dish));
  for (const typeName of ["Product", "Category", "CartItem", "Reservation", "Testimonial"]) assert.match(types, new RegExp(`interface ${typeName}`));
  assert.match(css, /@media \(max-width: 620px\)/);
  assert.match(css, /prefers-reduced-motion/);
});

test("uses local food imagery and no legacy backend routes", async () => {
  for (const image of ["hero-breakfast.webp", "pancakes.webp", "lomo.webp", "kitchen.webp", "og.png"]) await access(new URL(`../public/${image}`, import.meta.url));
  await assert.rejects(access(new URL("../app/api/favorites/route.ts", import.meta.url)));
  await assert.rejects(access(new URL("../app/api/inquiries/route.ts", import.meta.url)));
  await assert.rejects(access(new URL("../app/panel/page.tsx", import.meta.url)));
});
