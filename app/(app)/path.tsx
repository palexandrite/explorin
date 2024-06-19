import WebView from "react-native-webview";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

import * as Location from "expo-location";

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
                            // source={{ html: initMapHtml }}
                            source={require("@/assets/leaflet-path.html")}
                            // injectedJavaScriptObject={{ targetPosition: targetPosition }}
                            injectedJavaScript={myscript}
                        />
                    )
                )
            }
        </>
    );
};