import dotenv from "dotenv";
dotenv.config();

if (process.env.OPENAI_API_KEY) {
  console.log("✅ Key found");
} else {
  console.log("❌ Key missing");
}
