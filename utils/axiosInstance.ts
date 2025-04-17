import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function contactUs(data: any): Promise<any | null> {
  try {
    const response = await axiosInstance.post("/contact", data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error sending contact form:",
      error.response?.data || error.message
    );
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendRequest(data: any): Promise<any | null> {
  try {
    const response = await axiosInstance.post("/request", data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error sending prayer request:",
      error.response?.data || error.message
    );
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function joinMinistry(data: any): Promise<any | null> {
  try {
    const response = await axiosInstance.post("/join-ministery", data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error joining ministry:",
      error.response?.data || error.message
    );
    return null;
  }
}
