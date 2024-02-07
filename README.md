# Twitch Translator Backend

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

1 TWITCH_CHAT_AUTH_TOKEN
 - This is where you'll need to authenticate your new bot account. Head to [TMI AUTH](https://twitchapps.com/tmi/) and login with your bot account following the normal Twitch login flow.

2 TWITCH_CHAT_USERNAME
 - Your bot account username

3 TWITCH_CHANNEL
 - This is the channel you want your bot to connect to

4 OPENAI_API_KEY
 - Your OpenAI API Key. You can get it from [OpenAI](https://platform.openai.com/account/api-keys)

After setting everything up, run the command ```npm start``` and check the console for the: "JOINED" message. Now just head to your favorite streamer chat and test it out!

## How to translate messages

The bot utilizes commands in the format of !en, !es, etc. Where the message must start with "!" followed by the language ISO 639-1 code. Then just use a space and type your message. You should see the bot send the translated message right after yours.

## Contributions

This is a work in progress. If you want to contribute feel free to fork the repo and open a PR!


