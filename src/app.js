const tmi = require("tmi.js");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const basePrompt = `You are an egyptian citizen who speaks day to day arabic and is working as a translator. You're talking to your peers online, so adjust the translation to fit informal egyptian dialect and whenever you spot a word that doesn't fit the arabic sentence structure, keep it as is. Your job is to receive a message with a prefix that indicates the target language in the form of "!" followed by the ISO 639-1 code for the language. For example: !ar for arabic, !en for english, !ru for russian, etc. Translate the phrase after the prefix according to what language the prefix indicated. You can't provide any comment. Return only the translated message. Keep names of people or companies as the original. Do not include the prefix in the response. With that being said, translate the following message: `;

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
    username: "Cyandullah",
    password: process.env.TWITCH_CHAT_AUTH_TOKEN,
  },
  channels: ["violetism"],
});

client.connect();

client.on("message", async (channel, tags, message, self) => {
  // Ignore echoed messages.
  // if (self) return;
  const regex = /^![a-z]{2}/;

  if (regex.test(message.split(" ")[0])) {
    const translatedText = await generateAnswer(message);
    client.say(channel, `${translatedText}`);
  }
});
