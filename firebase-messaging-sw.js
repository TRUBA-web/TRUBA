importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDJdfwM0tOJEOUsdN-VDtW7oWatJOi5obo",
  authDomain: "truba-9fc31.firebaseapp.com",
  projectId: "truba-9fc31",
  storageBucket: "truba-9fc31.firebasestorage.app",
  messagingSenderId: "723117237157",
  appId: "1:723117237157:web:a36f926b71a00a0be17e4c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || "TRUBA", {
    body: n.body || "Новое сообщение",
    icon: n.icon || "./icon.png",
    badge: n.badge || "./icon.png",
    data: payload.data || {}
  });
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  const target = event.notification.data && event.notification.data.url
    ? event.notification.data.url : "./";
  event.waitUntil(clients.matchAll({type:"window", includeUncontrolled:true}).then(function(list) {
    for (const client of list) {
      if ("focus" in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(target);
  }));
});
