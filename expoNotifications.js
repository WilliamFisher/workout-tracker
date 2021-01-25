import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.setNotificationCategoryAsync("timer", [
  {
    identifier: "nextSet",
    buttonTitle: "Start Next Set",
    options: { opensAppToForeground: false },
  },
]);

export async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Timer is over! Next Set!",
    body: "Your set timer has expired! It is time to start the next set!",
    _category: "@wfish03/workout-tracker-timer",
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotificationsAsync() {
  if (!Constants.isDevice) {
    return;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  let token = (await Notifications.getExpoPushTokenAsync()).data;

  /*     if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    } */

  return token;
}

export function sendNotificationAfterSeconds(seconds) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's Up!",
      body: "Start the next set!",
      categoryIdentifier: "timer",
    },
    trigger: {
      seconds: seconds,
    },
  });
}
