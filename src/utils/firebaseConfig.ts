import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage, Messaging} from "firebase/messaging";
import patchFcmToken from "../apis/fcm/patchFcmToken";

interface NotificationResponse {
    permission: "granted" | "denied" | "default";
}

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FCM_APIKEY,
    authDomain: process.env.REACT_APP_FCM_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FCM_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FCM_SENDER_ID,
    appId: process.env.REACT_APP_FCM_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const messaging: Messaging = getMessaging(app);

// FCM 토큰 받기
async function fetchFCMToken(messaging: Messaging): Promise<string | undefined> {
    try {
        const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_VAPID_KEY,
        });
        if (token) {
            console.log("FCM 등록 토큰:", token);
            return token;
        } else {
            console.log("등록 토큰을 가져올 수 없습니다. 권한이 필요합니다.");
        }
    } catch (error) {
        console.error("FCM 토큰 가져오기 실패:", error);
    }
}

export async function handleAllowNotification(): Promise<NotificationResponse> {
    try {
        const permission: "granted" | "denied" | "default" = await Notification.requestPermission();

        if (permission === "granted") {
            const currentToken: string | null = await getToken(messaging, {
                vapidKey: process.env.REACT_APP_VAPID_KEY
            });

            if (currentToken) {
                console.log("토큰 등록");
                await patchFcmToken(currentToken);
                return {permission};
            } else {
                console.log("토큰 등록이 불가능합니다. 생성하려면 권한을 허용해주세요");
                return {permission};
            }
        } else if (permission === "denied") {
            console.log("web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요");
            return {permission};
        } else {
            return {permission};
        }
    } catch (error) {
        console.error("푸시 토큰 가져오는 중에 에러 발생", error);
        return {permission: "denied"};
    }
}

onMessage(messaging, (payload) => {
    console.log("알림 도착", payload);

    if (payload.notification) {
        const notificationTitle = payload.notification.title || "알림 제목 없음";
        const notificationOptions: NotificationOptions = {
            body: payload.notification.body || "알림 내용 없음",
        };

        if (Notification.permission === "granted") {
            console.log(notificationTitle);
            new Notification(notificationTitle, notificationOptions);
        }
    }
});