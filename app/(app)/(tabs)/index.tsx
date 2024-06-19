import { WebView } from "react-native-webview";

export default function HomeScreen() {

    return (
        <>
            {/* <Stack.Screen options={{ headerShown: false }} /> */}

            <WebView
                // source={{ html: initHtml }}
                source={require("@/assets/leaflet-map.html")}
            />

        </>
    );

}
