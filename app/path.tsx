import WebView from "react-native-webview";
import { Stack } from "expo-router";

export default () => {

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

    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "Маршрут" }} />

            <WebView
                source={{ html: initMapHtml }}
            />
        </>
    );
};