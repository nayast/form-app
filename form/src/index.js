import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';



// Очистка URL после загрузки Telegram Web App
const cleanUrl = () => {
  let currentUrl = window.location.href;
  console.log("URL: ", currentUrl);
  if (currentUrl.includes('&tgWebAppVersion')) {
    const tgParamsStartIndex = currentUrl.indexOf('&tgWebAppVersion');
    currentUrl = currentUrl.substring(0, tgParamsStartIndex);
  }
  if (currentUrl.includes('#tgWebAppVersion')) {
    const tgParamsStartIndex = currentUrl.indexOf('#tgWebAppVersion');
    currentUrl = currentUrl.substring(0, tgParamsStartIndex);
  }
  
  console.log('Очищенный URL:', currentUrl);
  window.history.replaceState(null, '', currentUrl);
};

// Проверка готовности Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
  console.log("Telegram WebApp загружен.");
  cleanUrl(); // Очищаем URL
} else {
  console.log("Telegram WebApp еще не загружен. Ждем загрузки...");
  
  // Ждем загрузки Telegram WebApp
  window.onload = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Telegram WebApp загружен после onload.");
      cleanUrl(); // Очищаем URL
    } else {
      console.error("Telegram WebApp не доступен.");
    }
  };
}

// Рендеринг приложения
const root = ReactDOM.createRoot(document.getElementById('root'));

if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.expand();
  window.Telegram.WebApp.enableClosingConfirmation();
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
