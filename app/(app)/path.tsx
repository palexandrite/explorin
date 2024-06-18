import WebView from "react-native-webview";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

import * as Location from "expo-location";

import { initMapHtml } from "@/mocks/Map";

export default () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorRequestLocationMsg, setErrorRequestLocationMsg] = useState<string | null>(null);
    const { targetName, position } = useLocalSearchParams();
    const targetPosition = position?.split(",");

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setErrorRequestLocationMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            setLocation(location);

        })();
    }, []);

    // const initMapHtml = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    //         <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
    //         <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />

    //         <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    //         <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
    //         <script src="https://unpkg.com/lrm-graphhopper@1.3.0/src/L.Routing.GraphHopper.js"></script>

    //         <title>Map</title>

    //         <style>
    //             html, body {
    //                 height: 100%;
    //                 margin: 0;
    //             }
    //             .leaflet-container {
    //                 height: 100vh;
    //                 width: 100vw;
    //                 max-width: 100%;
    //                 max-height: 100%;
    //             }
    //         </style>
    //     </head>
    //     <body>

    //         <div id="map" class="leaflet-container"></div>

    //     </body>
    //     </html>
    // `;

    let myLatitude = 0;
    let myLongitude = 0;

    if (location) {
        myLatitude = location.coords.latitude;
        myLongitude = location.coords.longitude;
    }

    const myscript = `
        const position = [${myLatitude}, ${myLongitude}];

        const map = L.map('map').setView(position, 15);

        const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker(position).addTo(map).bindPopup('Вы здесь').openPopup();
        L.Routing.control({
            waypoints: [
                L.latLng(position),
                L.latLng([${targetPosition[0]}, ${targetPosition[1]}])
            ],
        }).addTo(map);

        true; // note: this is required, or you'll sometimes get silent failures
    `;

    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: ("Маршрут до " + targetName) }} />

            {
                errorRequestLocationMsg ? (<Text>{errorRequestLocationMsg}</Text>) : (
                    !location ? (<Text>Местоположение определяется...</Text>) : (
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: initMapHtml }}
                            // injectedJavaScriptObject={{ targetPosition: targetPosition }}
                            injectedJavaScript={myscript}
                        />
                    )
                )
            }
        </>
    );
};