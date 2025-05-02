export interface PaystackProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  files: { path: string }[];
  metadata?: { background_color?: string };
  type: "good" | "digital"; // 'good' = physical, 'digital_asset' = digital
  slug: string;
}
