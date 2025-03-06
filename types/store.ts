export interface BaseProduct {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  price: number;
  coverArt: string;
  category: "book" | "audio";
}

export interface Book extends BaseProduct {
  category: "book";
  author: string;
  pages: number;
  isbn: string;
}

export interface AudioMessage extends BaseProduct {
  category: "audio";
  speaker: string;
  duration: string;
  date: string;
}

export type Product = Book | AudioMessage;

export interface CartItem {
  product: Product;
  quantity: number;
}
