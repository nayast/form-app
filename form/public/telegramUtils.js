export const initTelegramWebApp = () =>{
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.enableClosingConfirmation();
    return tg;
}