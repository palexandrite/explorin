import { useEffect, useState } from "react";

import { Image, StyleSheet, Platform, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import * as Location from "expo-location";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const initMapHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

            <title>Map</title>

            <style>
                html, body {
                    height: 100%;
                    margin: 0;
                }
                .leaflet-container {
                    height: 100vh;
                    width: 100vw;
                    max-width: 100%;
                    max-height: 100%;
                }
            </style>
        </head>
        <body>
            
            <div id="map" class="leaflet-container"></div>

            <script>

                const map = L.map('map').setView([51.505, -0.09], 13);
            
                const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            
            </script>
        </body>
        </html>
    `;

    // useEffect(() => {
        // (async () => {
        //     let { status } = await Location.requestForegroundPermissionsAsync();

        //     if (status !== "granted") {
        //         setErrorMsg("Permission to access location was denied");
        //         return;
        //     }

        //     let location = await Location.getCurrentPositionAsync({});
        //     console.log("this is my location", location);
        //     // setLocation(location);
        // })();
    // }, [location]);

    // let text = 'Waiting..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    //     text = JSON.stringify(location);
    // }

    /**
     * this is my location {"coords": {"accuracy": 100, "altitude": 5, "altitudeAccuracy": 100, "heading": 0, "latitude": 37.4219983, "longitude": -122.084, "speed": 0}, "mocked": false, "timestamp": 1717853134488}
     */
    // let mapUrl = "https://2gis.ru/krasnodar?m=";
    // let processed = mapUrl.concat(text.latitude);
    // text = processed;

    return (
        // <View style={{ paddingStart: 50 }}><Text>{ text }</Text></View>
        <WebView
            source={{ html: initMapHtml }}
        />
        // <ParallaxScrollView
        //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        // >
        //   <ThemedView style={styles.titleContainer}>
        //     <ThemedText type="title">Welcome!</ThemedText>
        //     <HelloWave />
        //   </ThemedView>

        //   <ThemedView style={styles.stepContainer}>
        //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        //     <ThemedText>
        //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
        //       Press{" "}
        //       <ThemedText type="defaultSemiBold">
        //         {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
        //       </ThemedText>{" "}
        //       to open developer tools.
        //     </ThemedText>
        //   </ThemedView>
        //   <ThemedView style={styles.stepContainer}>
        //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        //     <ThemedText>
        //       Tap the Explore tab to learn more about what"s included in this starter app.
        //     </ThemedText>
        //   </ThemedView>
        //   <ThemedView style={styles.stepContainer}>
        //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        //     <ThemedText>
        //       When you"re ready, run{" "}
        //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{" "}
        //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
        //       <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
        //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        //     </ThemedText>
        //   </ThemedView>
        
        // </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        // flexDirection: "row",
        // alignItems: "center",
        // gap: 8,
    },
    stepContainer: {
        // gap: 8,
        // marginBottom: 8,
    },
    reactLogo: {
        // height: 178,
        // width: 290,
        // bottom: 0,
        // left: 0,
        // position: "absolute",
    },
});
