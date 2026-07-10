self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data?.json() ?? {};
  } catch (err) {
    const text = event.data?.text() ?? "";

    data = { title: "Notification", body: text };
  }

  event.waitUntil(
    self.registration
      .showNotification(data.title ?? "Notification", {
        body: data.body ?? "Notification Message",
        icon: "/icons/Icon-192.png",
        vibrate: [200, 100, 200],
      })
      .then(() => console.log("Notification shown successfully"))
      .catch((err) => console.error("showNotification failed:", err)),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
