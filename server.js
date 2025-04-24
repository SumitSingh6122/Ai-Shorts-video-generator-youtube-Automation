import axios from "axios";


async function testVideoGeneration() {
  const API_URL = 'http://localhost:3000/api/render-video';
  
  const testData = {
    audioURL: "https://res.cloudinary.com/dk75dh0nv/video/upload/v1745392622/generated_audio/audio_1745392620273.mp3",
    captions:[
      {
        confidence: 0.9867865,
        end: 0.39999998,
        start: 0,
        word: "in",
      },
      {
        confidence: 0.9999286,
        end: 0.48,
        start: 0.39999998,
        word: "the",
      },
      {
        confidence: 0.9987754,
        end: 0.88,
        start: 0.48,
        word: "ancient",
      },
      {
        confidence: 0.9941081,
        end: 1.12,
        start: 0.88,
        word: "city",
      },
      {
        confidence: 0.9999895,
        end: 1.28,
        start: 1.12,
        word: "of",
      },
      {
        confidence: 0.99906886,
        end: 1.76,
        start: 1.28,
        word: "rome",
      },
      {
        confidence: 0.9999063,
        end: 1.92,
        start: 1.76,
        word: "a",
      },
      {
        confidence: 0.9999393,
        end: 2.24,
        start: 1.92,
        word: "humble",
      },
      {
        confidence: 0.9997208,
        end: 2.72,
        start: 2.24,
        word: "gladiator",
      },
      {
        confidence: 0.9998567,
        end: 3.04,
        start: 2.72,
        word: "named",
      },
      {
        confidence: 0.9868334,
        end: 3.4399998,
        start: 3.04,
        word: "marcus",
      },
      {
        confidence: 0.9989796,
        end: 3.84,
        start: 3.4399998,
        word: "trained",
      },
      {
        confidence: 0.9971596,
        end: 4.8,
        start: 3.84,
        word: "tirelessly",
      },
      {
        confidence: 0.9999397,
        end: 5.2,
        start: 5.04,
        word: "he",
      },
      {
        confidence: 0.9989822,
        end: 5.6,
        start: 5.2,
        word: "dreamt",
      },
      {
        confidence: 0.998643,
        end: 5.7599998,
        start: 5.6,
        word: "not",
      },
      {
        confidence: 0.999956,
        end: 5.92,
        start: 5.7599998,
        word: "of",
      },
      {
        confidence: 0.9995758,
        end: 6.16,
        start: 5.92,
        word: "wealth",
      },
      {
        confidence: 0.9987785,
        end: 6.3999996,
        start: 6.16,
        word: "or",
      },
      {
        confidence: 0.9810857,
        end: 7.04,
        start: 6.3999996,
        word: "fame",
      },
      {
        confidence: 0.9999503,
        end: 7.12,
        start: 7.04,
        word: "but",
      },
      {
        confidence: 0.9961825,
        end: 7.3599997,
        start: 7.12,
        word: "of",
      },
      {
        confidence: 0.99903333,
        end: 8,
        start: 7.3599997,
        word: "freedom",
      },
      {
        confidence: 0.99962413,
        end: 8.4,
        start: 8.16,
        word: "the",
      },
      {
        confidence: 0.92499155,
        end: 8.96,
        start: 8.4,
        word: "emperor",
      },
      {
        confidence: 0.999173,
        end: 9.04,
        start: 8.96,
        word: "a",
      },
      {
        confidence: 0.9995974,
        end: 9.28,
        start: 9.04,
        word: "cruel",
      },
      {
        confidence: 0.99961436,
        end: 9.5199995,
        start: 9.28,
        word: "and",
      },
      {
        confidence: 0.9997367,
        end: 10.08,
        start: 9.5199995,
        word: "unpredictable",
      },
      {
        confidence: 0.9997149,
        end: 10.719999,
        start: 10.08,
        word: "man",
      },
      {
        confidence: 0.9997373,
        end: 11.12,
        start: 10.719999,
        word: "announced",
      },
      {
        confidence: 0.9997631,
        end: 11.36,
        start: 11.12,
        word: "a",
      },
      {
        confidence: 0.99812967,
        end: 11.5199995,
        start: 11.36,
        word: "grand",
      },
      {
        confidence: 0.9973258,
        end: 12,
        start: 11.5199995,
        word: "tournament",
      },
      {
        confidence: 0.9697481,
        end: 12.895,
        start: 12.495,
        word: "marcus",
      },
      {
        confidence: 0.9997857,
        end: 13.215,
        start: 12.895,
        word: "saw",
      },
      {
        confidence: 0.99992275,
        end: 13.375,
        start: 13.215,
        word: "his",
      },
      {
        confidence: 0.8807142,
        end: 14.015,
        start: 13.375,
        word: "chance",
      },
      {
        confidence: 0.9998908,
        end: 14.255,
        start: 14.095,
        word: "he",
      },
      {
        confidence: 0.99993074,
        end: 14.495001,
        start: 14.255,
        word: "fought",
      },
      {
        confidence: 0.9999758,
        end: 14.655001,
        start: 14.495001,
        word: "with",
      },
      {
        confidence: 0.9995215,
        end: 15.295,
        start: 14.655001,
        word: "unparalleled",
      },
      {
        confidence: 0.9997737,
        end: 15.695,
        start: 15.295,
        word: "skill",
      },
      {
        confidence: 0.9999486,
        end: 15.935,
        start: 15.695,
        word: "and",
      },
      {
        confidence: 0.99381375,
        end: 16.654999,
        start: 15.935,
        word: "bravery",
      },
      {
        confidence: 0.99975556,
        end: 17.135,
        start: 16.895,
        word: "each",
      },
      {
        confidence: 0.99982077,
        end: 17.455,
        start: 17.135,
        word: "victory",
      },
      {
        confidence: 0.99962604,
        end: 17.775,
        start: 17.455,
        word: "bringing",
      },
      {
        confidence: 0.9999602,
        end: 18.015,
        start: 17.775,
        word: "him",
      },
      {
        confidence: 0.9999198,
        end: 18.335,
        start: 18.015,
        word: "closer",
      },
      {
        confidence: 0.9999689,
        end: 18.495,
        start: 18.335,
        word: "to",
      },
      {
        confidence: 0.99988925,
        end: 18.655,
        start: 18.495,
        word: "his",
      },
      {
        confidence: 0.99902844,
        end: 19.215,
        start: 18.655,
        word: "goal",
      },
      {
        confidence: 0.9996252,
        end: 19.615,
        start: 19.455,
        word: "in",
      },
      {
        confidence: 0.99994004,
        end: 19.775,
        start: 19.615,
        word: "the",
      },
      {
        confidence: 0.99989784,
        end: 20.095001,
        start: 19.775,
        word: "final",
      },
      {
        confidence: 0.99949896,
        end: 20.575,
        start: 20.095001,
        word: "battle",
      },
      {
        confidence: 0.9998135,
        end: 20.895,
        start: 20.575,
        word: "facing",
      },
      {
        confidence: 0.999902,
        end: 21.055,
        start: 20.895,
        word: "the",
      },
      {
        confidence: 0.99922526,
        end: 21.775,
        start: 21.055,
        word: "champion",
      },
      {
        confidence: 0.99891317,
        end: 22.335,
        start: 21.855,
        word: "marcus",
      },
      {
        confidence: 0.9997422,
        end: 22.575,
        start: 22.335,
        word: "fought",
      },
      {
        confidence: 0.9999472,
        end: 22.735,
        start: 22.575,
        word: "with",
      },
      {
        confidence: 0.9994405,
        end: 22.895,
        start: 22.735,
        word: "the",
      },
      {
        confidence: 0.99993,
        end: 23.215,
        start: 22.895,
        word: "strength",
      },
      {
        confidence: 0.99993074,
        end: 23.375,
        start: 23.215,
        word: "of",
      },
      {
        confidence: 0.99980825,
        end: 23.535,
        start: 23.375,
        word: "a",
      },
      {
        confidence: 0.9964061,
        end: 23.935001,
        start: 23.535,
        word: "thousand",
      },
      {
        confidence: 0.9999045,
        end: 24.72,
        start: 24.48,
        word: "he",
      },
      {
        confidence: 0.9786558,
        end: 25.359999,
        start: 24.72,
        word: "won",
      },
      {
        confidence: 0.9999057,
        end: 25.6,
        start: 25.36,
        word: "not",
      },
      {
        confidence: 0.999925,
        end: 25.76,
        start: 25.6,
        word: "with",
      },
      {
        confidence: 0.98192173,
        end: 26.48,
        start: 25.76,
        word: "rage",
      },
      {
        confidence: 0.99996686,
        end: 26.72,
        start: 26.48,
        word: "but",
      },
      {
        confidence: 0.9999579,
        end: 26.88,
        start: 26.72,
        word: "with",
      },
      {
        confidence: 0.9994418,
        end: 27.6,
        start: 26.88,
        word: "calculated",
      },
      {
        confidence: 0.9414829,
        end: 28.32,
        start: 27.6,
        word: "precision",
      },
      {
        confidence: 0.99972075,
        end: 28.8,
        start: 28.64,
        word: "the",
      },
      {
        confidence: 0.8825971,
        end: 29.439999,
        start: 28.8,
        word: "emperor",
      },
      {
        confidence: 0.9987494,
        end: 30.32,
        start: 29.439999,
        word: "impressed",
      },
      {
        confidence: 0.99912304,
        end: 30.8,
        start: 30.32,
        word: "granted",
      },
      {
        confidence: 0.9999759,
        end: 30.96,
        start: 30.8,
        word: "him",
      },
      {
        confidence: 0.9998964,
        end: 31.2,
        start: 30.96,
        word: "his",
      },
      {
        confidence: 0.9370168,
        end: 31.84,
        start: 31.2,
        word: "freedom",
      },
      {
        confidence: 0.83470416,
        end: 32.559998,
        start: 32,
        word: "marcus",
      },
      {
        confidence: 0.9999602,
        end: 32.72,
        start: 32.559998,
        word: "once",
      },
      {
        confidence: 0.99990344,
        end: 32.879997,
        start: 32.72,
        word: "a",
      },
      {
        confidence: 0.9226156,
        end: 33.28,
        start: 32.879997,
        word: "slave",
      },
      {
        confidence: 0.99983644,
        end: 33.52,
        start: 33.28,
        word: "walked",
      },
      {
        confidence: 0.9999888,
        end: 33.68,
        start: 33.52,
        word: "out",
      },
      {
        confidence: 0.99990606,
        end: 33.76,
        start: 33.68,
        word: "of",
      },
      {
        confidence: 0.9998853,
        end: 33.92,
        start: 33.76,
        word: "the",
      },
      {
        confidence: 0.99812406,
        end: 34.239998,
        start: 33.92,
        word: "arena",
      },
      {
        confidence: 0.9535591,
        end: 34.48,
        start: 34.239998,
        word: "a",
      },
      {
        confidence: 0.999767,
        end: 34.72,
        start: 34.48,
        word: "free",
      },
      {
        confidence: 0.9147541,
        end: 34.96,
        start: 34.72,
        word: "man",
      },
      {
        confidence: 0.8612718,
        end: 35.36,
        start: 34.96,
        word: "forever",
      },
      {
        confidence: 0.999406,
        end: 35.76,
        start: 35.36,
        word: "changed",
      },
      {
        confidence: 0.9998641,
        end: 35.92,
        start: 35.76,
        word: "by",
      },
      {
        confidence: 0.9998018,
        end: 36.08,
        start: 35.92,
        word: "the",
      },
      {
        confidence: 0.9994998,
        end: 36.32,
        start: 36.08,
        word: "sands",
      },
      {
        confidence: 0.9998472,
        end: 36.48,
        start: 36.32,
        word: "of",
      },
      {
        confidence: 0.998832,
        end: 36.8,
        start: 36.48,
        word: "rome",
      },
    ],
    images:[
      "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745392639576.png?alt=media&token=de71186d-17fb-4aca-af32-c22aff6535f7",
      "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745392635153.png?alt=media&token=a24db59a-414e-478e-8b7e-b1c8a0249762",
      "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745392641900.png?alt=media&token=d74c1be4-9cb8-4172-9f82-b84037b1b10f",
      "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745392647513.png?alt=media&token=1b421a4a-f442-4468-95fe-99d5b6c5a4c1",
      "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745392644002.png?alt=media&token=613c9f61-57a7-4aae-a9cb-a01afa8ad74f",
    ],
    captionStyle: {
      color: "#facc15",
      fontSize: "2.25rem",
      fontWeight: 700
    
    }
  }
  

  try {
    console.log("🚀 Starting video generation...");
    
    // 1. Start the render job
    const startResponse = await axios.post(API_URL, testData);
    const { jobId, checkUrl } = startResponse.data;
    
    console.log(`📦 Job ID: ${jobId}`);
    console.log("⏳ Checking status every 5 seconds...");

    // 2. Check status periodically
    let retries = 0;
    const maxRetries = 30; // 30 * 5s = 2.5 minutes timeout
    
    const checkStatus = async () => {
      try {
        const statusResponse = await axios.get(`http://localhost:3000${checkUrl}`);
        const { status, url, error } = statusResponse.data;

        if (status === 'completed') {
          console.log("✅ Render completed successfully!");
          console.log("🌐 Cloudinary URL:", url);
          return true;
        }

        if (status === 'failed') {
          console.error("❌ Render failed:", error);
          return true;
        }

        if (retries++ < maxRetries) {
          setTimeout(checkStatus, 5000);
        } else {
          console.error("⌛ Timeout waiting for render completion");
          return true;
        }
      } catch (error) {
        console.error("🔴 Status check failed:", error.message);
        return true;
      }
    };

    await checkStatus();

  } catch (error) {
    console.error("💥 Initial request failed:");
    if (axios.isAxiosError(error)) {
      console.error("HTTP Error:", error.response?.status);
      console.error("Response:", error.response?.data);
    } else {
      console.error(error.message);
    }
  
  }

}
// Run the test
testVideoGeneration();
