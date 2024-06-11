import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";

export default () => {
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "Редактирование профиля" }} />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#f2ece3", dark: "#886b57" }}
            >
                <ThemedView style={{ flexDirection: "row", justifyContent: "flex-end", paddingBottom: 30 }}>
                    <ThemedText>Сохранить</ThemedText>
                </ThemedView>

                <ThemedView>
                    <ThemedText>RT</ThemedText>
                    <ThemedText></ThemedText>
                </ThemedView>

            </ParallaxScrollView>
        </>
    );
};