import "dotenv/config";

export default {
    "expo": {
        "name": "ExplorinKrasnodar",
        "slug": "ExplorinKrasnodar",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "myapp",
        "userInterfaceStyle": "automatic",
        "splash": {
            "image": "./assets/images/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "ios": {
            "supportsTablet": true
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "permissions": [
                "android.permission.INTERNET",
                "android.permission.READ_EXTERNAL_STORAGE",
                "android.permission.WRITE_EXTERNAL_STORAGE"
            ]
        },
        "web": {
            "bundler": "metro",
            "output": "static",
            "favicon": "./assets/images/favicon.png"
        },
        "plugins": [
            "expo-router",
            [
                "expo-location",
                {
                    "locationAlwaysAndWhenInUsePermission": "Разрешите $(PRODUCT_NAME) использовать Ваше местоположение."
                }
            ],
            [
                "expo-build-properties",
                {
                    "android": {
                        "compileSdkVersion": 34,
                        "targetSdkVersion": 34,
                        "buildToolsVersion": "34.0.0",
                        "usesCleartextTraffic": true
                    },
                    "ios": {
                        "deploymentTarget": "13.4"
                    }
                }
            ]
        ],
        "experiments": {
            "typedRoutes": true
        },
        "extra": {
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        }
    }
}
