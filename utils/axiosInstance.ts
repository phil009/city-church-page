import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Add this line to enable credentials
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function subscribeNewsletter(email: string): Promise<any | null> {
  try {
    const response = await axiosInstance.post("/subscribe", { email });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error subscribing to newsletter:",
      error.response?.data || error.message
    );
    return null;
  }
}
