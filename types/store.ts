export interface PaystackProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  files: { path: string }[];
  metadata?: { background_color?: string };
  type: "good" | "digital_asset"; // 'good' = physical, 'digital_asset' = digital
  slug: string;
}
