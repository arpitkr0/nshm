//AIzaSyBtcUZ_Tt4cBUHbY_VynAg-oZ1WjtT5QPY
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBtcUZ_Tt4cBUHbY_VynAg-oZ1WjtT5QPY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const apiResult = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
  //console.log(result.response.text());
};
//const prompt = "Write a story about a magic backpack.";
