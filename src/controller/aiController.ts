import axios from "axios"
import { Request, Response } from "express"

import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.GEMINI_API_KEY

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { text, maxToken } = req.body

    const aiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        contents: [
          {
            parts: [{ text }]
          }
        ],
        generationConfig: {
          maxOutputTokens: maxToken || 150
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY
        }
      }
    )

    console.log(aiResponse)

    // const generatedContent =
    //   aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No data"

    // Update your controller temporarily to debug:
    const generatedContent = aiResponse.data?.candidates?.[0];
    console.log("Full candidate object:", JSON.stringify(generatedContent, null, 2));


    res.status(200).json({ message: "Generated", data: generatedContent })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Fail", error: err })
  }
}

// Can use API or SDK
// we use API call with axios
// token -> word
// "AIzaSyCDwbe5y-ecZKQ3HtFt6I347orPkgYUHCQ"