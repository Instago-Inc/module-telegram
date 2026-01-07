// Telegram Bot API helper
// API:
// - configure({ botToken?, chatId?, debug? })
// - sendText({ text, chatId?, parse_mode?, disable_web_page_preview? })
// - sendPhoto({ url, caption?, chatId?, parse_mode? })

(function(){
  const httpx = require('http@1.0.0');
  const log = require('log@1.0.0').create('telegram');
  const state = { botToken: null, chatId: null, debug: false };

  function configure(opts){
    if (!opts || typeof opts !== 'object') return;
    if (opts.botToken) state.botToken = String(opts.botToken);
    if (opts.chatId) state.chatId = String(opts.chatId);
    if (opts.debug === true || opts.debug === '1' || opts.debug === 'true') state.debug = true;
  }

  function pickToken(tok){ return tok || state.botToken || sys.env.get('telegram.botToken') || null; }
  function pickChatId(id){ return id || state.chatId || sys.env.get('telegram.chatId') || null; }

  function baseUrl(tok){ return 'https://api.telegram.org/bot' + tok; }

  async function sendText({ text, chatId, parse_mode, disable_web_page_preview, botToken } = {}){
    const tok = pickToken(botToken); if (!tok) return { ok:false, error:'telegram.sendText: missing botToken' };
    const chat = pickChatId(chatId); if (!chat) return { ok:false, error:'telegram.sendText: missing chatId' };
    const bodyObj = { chat_id: chat, text: String(text||'') };
    if (parse_mode) bodyObj.parse_mode = String(parse_mode);
    if (disable_web_page_preview != null) bodyObj.disable_web_page_preview = !!disable_web_page_preview;
    try {
      const r = await httpx.json({ url: baseUrl(tok) + '/sendMessage', method:'POST', headers:{ 'Content-Type':'application/json' }, bodyObj, debug: !!state.debug });
      return { ok:true, data: (r && (r.json||r.raw)) || null, status: r && r.status };
    } catch (e){
      log.error('sendText:error', (e && (e.message||e)) || 'unknown');
      return { ok:false, error: (e && (e.message||String(e))) || 'unknown' };
    }
  }

  async function sendPhoto({ url, caption, chatId, parse_mode, botToken } = {}){
    const tok = pickToken(botToken); if (!tok) return { ok:false, error:'telegram.sendPhoto: missing botToken' };
    const chat = pickChatId(chatId); if (!chat) return { ok:false, error:'telegram.sendPhoto: missing chatId' };
    const bodyObj = { chat_id: chat, photo: String(url||'') };
    if (caption) bodyObj.caption = String(caption);
    if (parse_mode) bodyObj.parse_mode = String(parse_mode);
    try {
      const r = await httpx.json({ url: baseUrl(tok) + '/sendPhoto', method:'POST', headers:{ 'Content-Type':'application/json' }, bodyObj, debug: !!state.debug });
      return { ok:true, data: (r && (r.json||r.raw)) || null, status: r && r.status };
    } catch (e){
      log.error('sendPhoto:error', (e && (e.message||e)) || 'unknown');
      return { ok:false, error: (e && (e.message||String(e))) || 'unknown' };
    }
  }

  module.exports = { configure, sendText, sendPhoto };
})();
