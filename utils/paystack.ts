import { PaystackProduct } from "@/types/store";
import axios from "axios";
const secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;
const paystackInstance = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secretKey}`,
  },
});


// Function to fetch products from Paystack store
export async function fetchPaystackProducts(): Promise<PaystackProduct[]> {
  try {
    const response = await paystackInstance.get("/product");
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error fetching Paystack products:",
      error.response?.data || error.message
    );
    return [];
  }
}
