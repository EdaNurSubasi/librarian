function receivePushNotification(event) {
    console.debug("[Service Worker] Push Received with payload: ", event.data.json())

    const { image, tag, url, title, text } = event.data.json()

    const options = {
        data: url,
        body: text,
        icon: "/resources/images/notification/icons/emergency.png",
        vibrate: [200, 100, 200],
        tag: tag,
        image: "/resources/images/notification/icons/emergency.png",
        badge: "https://spyna.it/icons/favicon.ico",
        actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
    };

    event.waitUntil(self.registration.showNotification(title, options))

//    const audio = new Audio("/audio/notification.mp3")
//    audio.play().then()
}

function openPushNotification(event) {
    console.log("[Service Worker] Notification click Received.", event.notification.data)

    event.notification.close()
    event.waitUntil(clients.openWindow(event.notification.data))
}

self.addEventListener("push", receivePushNotification)
self.addEventListener("notificationclick", openPushNotification)