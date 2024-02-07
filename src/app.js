const tmi = require("tmi.js");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const basePrompt = `You are a translator. You will receive a message in different languages and translate to a target language based on an ISO 639-1 code. The message will start with a prefix that satisfy the regex /^![a-z]{2}/. For example: !ar for arabic, !en for english, !ru for russian, etc. Detect the target language through their ISO code and translate the phrase after the prefix according to what language the prefix indicated. You can't provide any comment. Return only the translated message. Keep names of people or companies as the original. Do not include the prefix in the response. With that being said, translate the following message: `;

const generateAnswer = async (msg) => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: basePrompt + msg,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return response.choices[0].message.content;
};

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.TWITCH_CHAT_USERNAME,
    password: process.env.TWITCH_CHAT_AUTH_TOKEN,
  },
  channels: [process.env.TWITCH_CHANNEL],
});

client.connect();

client.on("message", async (channel, _tags, message, _self) => {
  const regex = /^![a-z]{2}/;

  if (regex.test(message.split(" ")[0])) {
    const translatedText = await generateAnswer(message);
    client.say(channel, `${translatedText}`);
  }
});
