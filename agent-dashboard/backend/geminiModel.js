const Groq = require("groq-sdk");
const dotenv=require('dotenv');
dotenv.config()
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function runGroq(prompt) {
  try {
    // console.log(prompt);
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `\n${prompt}`,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Groq AI Error:", err);
    return "AI summarization failed.";
  }
}
 module.exports= runGroq;
