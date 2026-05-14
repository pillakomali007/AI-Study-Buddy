const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    console.log("User:", userMessage);

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {

        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: userMessage
          }
        ]

      },

      {

        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json"

        }

      }

    );

    const aiReply =
      response.data.choices[0].message.content;

    res.json({
      reply: aiReply
    });

  } catch (error) {

    console.log(
      error.response?.data || error
    );

    res.json({
      reply: "AI Error"
    });

  }

});

app.listen(3000, () => {

  console.log(
    "Server running on port 3000"
  );

});