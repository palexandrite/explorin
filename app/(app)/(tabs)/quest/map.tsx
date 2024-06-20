import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

import * as Location from "expo-location";
import { Stack, router, useLocalSearchParams } from "expo-router";
import WebView from "react-native-webview";

import { Collections } from "@/mocks/Collections";
import { Quests } from "@/mocks/Quests";
import { Button } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";

import FogOfWar from "@/components/FogOfWar";

type Item = {
    id: number,
    title: string,
    cover: any,
    address: string,
    items: number[],
    mainText: string
};

export default () => {

    const auth = getAuth();
    const user = auth.currentUser;

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorRequestLocationMsg, setErrorRequestLocationMsg] = useState<string | null>(null);
    const { finished, questId } = useLocalSearchParams();
    const [buttonText, setButtonText] = useState("Старт");
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        (async () => {

            try {
                let { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== "granted") {
                    setErrorRequestLocationMsg("Permission to access location was denied");
                    return;
                }

                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
                setLocation(location);

                const key = `${user?.email}-started-quest-${questId}`;
                const isStarted = await AsyncStorage.getItem(key);
                if (isStarted !== null) {
                    setButtonText("Продолжить");
                }

                const finishedKey = `${user?.email}-finished-quest-${questId}`;
                const isExistAsFinished = await AsyncStorage.getItem(finishedKey);
                if (isExistAsFinished || finished) {
                    setIsFinished(true);
                }
            } catch (error) {
                console.error(error);
            }

        })();
    }, []);

    const currentQuest = Quests.find((quest: Item): boolean => quest.id == questId);

    const currentItems = Collections.map((item) => {
        let isExistsInItems = currentQuest?.items.some((id) => id == item.id);
        if (isExistsInItems) {
            return item;
        }
    });

    let myLatitude = 0;
    let myLongitude = 0;
    let jsStrings: string[] = [];

    if (location) {
        myLatitude = location.coords.latitude;
        myLongitude = location.coords.longitude;
    }

    if (currentItems.length) {
        currentItems.forEach((item) => {
            if (item != undefined) {
                let latitude = item?.position[0];
                let longitude = item?.position[1];
                jsStrings.push(`L.marker([${latitude}, ${longitude}]).addTo(map).openPopup();`);
            }
        });
    }

    /**
     * 
     * Активация "Тумана войны"
     * 
     * const updateFogPosition = () => {
            let markerLatLng = marker.getLatLng();
            let markerPoint = map.latLngToLayerPoint(markerLatLng);
            let fog = document.getElementById("fog");
            // fog.style.clipPath = 'circle(100px at ' + markerPoint.x + 'px ' + markerPoint.y + 'px)';
            fog.style.top = markerPoint.y + 'px';
            fog.style.left = markerPoint.x + 'px';
        };

        map.on("move", updateFogPosition);
        map.on("zoom", updateFogPosition);

        updateFogPosition();
     */
    const myscript = `
        const position = [${myLatitude}, ${myLongitude}];

        const map = L.map('map').setView(position, 11);

        const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const marker = L.marker(position).addTo(map).bindPopup('Вы здесь').openPopup();
        ${jsStrings?.join(" ")}

        // туман должен быть тут
        
        true; // note: this is required, or you'll sometimes get silent failures
    `;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            {
                errorRequestLocationMsg ? (<Text>{errorRequestLocationMsg}</Text>) : (
                    !location ? (<Text style={styles.message}>Местоположение определяется...</Text>) : (
                        <>
                            <WebView
                                originWhitelist={['*']}
                                // source={{ html: initMapHtml }}
                                source={require("@/assets/leaflet-quest.html")}
                                // injectedJavaScriptObject={{ targetPosition: targetPosition }}
                                injectedJavaScript={myscript}
                            />

                            {/* <FogOfWar /> */}

                            {
                                isFinished || finished ? "" : (
                                    <Button
                                        title={
                                            buttonText
                                        }
                                        containerStyle={{
                                            position: "absolute",
                                            zIndex: 505,
                                            bottom: 30,
                                            left: 0,
                                            right: 0,
                                            paddingHorizontal: 20,
                                        }}
                                        buttonStyle={{ backgroundColor: "#886b57", borderRadius: 20, width: "100%" }}
                                        titleStyle={{ fontWeight: "bold", fontSize: 25 }}
                                        onPress={() => router.navigate({
                                            pathname: "../../active-quest",
                                            params: { questId: questId, cover: currentQuest?.cover }
                                        })}
                                    />
                                )
                            }
                        </>
                    )
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    message: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});