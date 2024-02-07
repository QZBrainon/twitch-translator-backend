# Twitch Translator Backend

## About

This project consists on a twitch chat bot that uses OpenAI ChatGPT in order to listen to prefixed messages in chat and reply with a translated version of the message, according to the specified prefix.

The bot works in any account, but we recommend you to create your own bot account, separate from your own. 

The good thing is that you won't need any special account, just register like a normal user and authenticate as that user. We'll see how to do that ahead.

## Requirements

- Node version 18 or higher
- OpenAI API Key
- Twitch Auth Token

## How to run

- Clone this repo to your machine with ```git clone git@github.com:QZBrainon/twitch-translator-backend.git```
- CD into ```twitch-translator-backend```
- Run the command ```npm install```
- Rename the file ```.env.local``` to only ```.env```

Then, inside the .env file, you'll find 4 variables you'll need to set before running the app. They are:

- TWITCH_CHAT_AUTH_TOKEN
  This is where



