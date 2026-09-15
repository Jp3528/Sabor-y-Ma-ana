export type MenuCategory = "desayunos" | "almuerzos" | "bebidas" | "postres";

export type MenuFilter = "todos" | MenuCategory;

export interface Product {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  badge?: "Más vendido" | "Nuevo" | "Recomendado";
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  filter: MenuFilter;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes: string;
}

export interface Reservation {
  name: string;
  phone: string;
  date: string;
  time: string;
  people: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  avatar: string;
  rating: number;
}
