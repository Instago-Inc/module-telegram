# @instago/telegram

Telegram Bot API helper (send text/photo).

- Version: 1.0.0
- Entry: index.js
- Exports: `{ configure, sendText, sendPhoto }`
- Dependencies: `http@1.0.0`, `log@1.0.0`, `env@1.0.0`
- Env: `telegram.botToken`, `telegram.chatId`

## API
- `configure({ botToken?, chatId?, debug? })`
- `sendText({ text, chatId?, parse_mode?, disable_web_page_preview?, botToken? })`
- `sendPhoto({ url, caption?, chatId?, parse_mode?, botToken? })`

## Example
```js
const tg = require('telegram@1.0.0');
tg.configure({ botToken: env.telegram.botToken, chatId: env.telegram.chatId });
await tg.sendText({ text: 'Hello Telegram!' });
```

## Notes
- Uses `sys.http.fetch` via `http@1.0.0`; logs via `log@1.0.0`.
