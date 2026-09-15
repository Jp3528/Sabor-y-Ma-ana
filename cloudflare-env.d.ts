declare global {
  namespace Cloudflare {
    type Env = Record<string, never>;
  }
}

export {};
