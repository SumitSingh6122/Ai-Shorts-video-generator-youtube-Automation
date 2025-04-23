import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://aigurulab.tech/api/generate-image";

async function generateImage() {
  const prompt = "A peaceful mountain landscape with a lake at sunrise, in watercolor style";

  try {
    const response = await axios.post(
      BASE_URL,
      {
        input: prompt,
        width: 1024,
        height: 1024,
        model: "sdxl",
        aspectRatio: "1:1"
      },
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_GURU_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Generated Image URL:", response.data.image);
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
  }
}

generateImage();
