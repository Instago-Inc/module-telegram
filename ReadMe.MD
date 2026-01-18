# module/telegram - V8 module

Send Telegram messages from your workflows with a small, focused helper. It is designed for straightforward text and photo notifications without extra ceremony.

Use it when you want to push updates to a chat quickly and keep your workflow steps concise. See https://instago.ai for more on the runtime environment.

## Technical reference

Exports
- `configure({ botToken?, chatId?, debug? })`
- `sendText({ text, chatId?, parse_mode?, disable_web_page_preview?, botToken? })`
- `sendPhoto({ url, caption?, chatId?, parse_mode?, botToken? })`

Usage
- `sendText` sends a text message to the target chat.
- `sendPhoto` sends a photo by URL, with an optional caption.
- Each call can provide `botToken` and `chatId` directly, or use values set via `configure`.

Configuration
- Optional env keys:
  - `telegram.botToken`
  - `telegram.chatId`
- Optional configure options:
  - `botToken`
  - `chatId`
  - `debug` (true | '1' | 'true')

Examples
```js
const tg = require('telegram@latest');

tg.configure({ botToken: env.telegram.botToken, chatId: env.telegram.chatId });
await tg.sendText({ text: 'Hello Telegram!' });
```

```js
const tg = require('telegram@latest');

await tg.sendPhoto({
  url: 'https://example.com/pic.jpg',
  caption: 'Daily update',
  botToken: env.telegram.botToken,
  chatId: env.telegram.chatId
});
```
