import axios from "axios";

const sendContactEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string,
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      { name, email, subject, message },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to send message");
  }
};

const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/contact/newsletter`,
      { email },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to subscribe to newsletter");
  }
};

export { sendContactEmail, subscribeToNewsletter };
