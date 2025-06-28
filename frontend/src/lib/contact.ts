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
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};

const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/contact/newsletter`,
      { email },
    );
    return response.data;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
};

export { sendContactEmail, subscribeToNewsletter };
