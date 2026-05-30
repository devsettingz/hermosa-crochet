export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string | null;
  category?: {
    name: string;
    slug: string;
  } | null;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  paymentNote: string | null;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: Product;
  }[];
}

export interface CustomOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemType: string;
  description: string;
  preferredColors: string | null;
  size: string | null;
  budgetRange: string | null;
  referenceImages: string[];
  status: string;
  approved: boolean;
  price: number | null;
  deliveryDays: number | null;
  deliveryDate: string | null;
  adminNotes: string | null;
  createdAt: string;
}