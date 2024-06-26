import { Pressable, StyleSheet, View } from "react-native";
import { Card } from "@rneui/base";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack } from "expo-router";

import { Quests } from "@/mocks/Quests";

export default function TabThreeScreen() {

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#5e776b", dark: "#5e776b" }}
            >

                <ThemedView style={[styles.header]}>
                    <ThemedText type="h1" style={{ alignSelf: "center", color: "#fff" }}>Квесты</ThemedText>
                </ThemedView>

                {
                    Quests.map((m, i) => {

                        return (
                            <Link key={i} href={{
                                pathname: "/quest/item",
                                params: { itemId: m.id }
                            }} asChild>
                                <Pressable>
                                    <Card containerStyle={styles.card}>
                                        <Card.Image
                                            style={styles.cardImage}
                                            source={m.cover}
                                        />

                                        <ThemedText type="h1" style={[styles.cardText]}>
                                            {m.title}
                                        </ThemedText>

                                        <ThemedText type="defaultSemiBold" style={[styles.cardText]}>
                                            {m.address}
                                        </ThemedText>

                                        <View style={{ flexDirection: "row" }}>

                                            <ThemedText style={styles.cardText}>
                                                50 мин
                                            </ThemedText>

                                            <ThemedText style={styles.cardText}>
                                                4 км
                                            </ThemedText>

                                            <ThemedText style={styles.cardText}>
                                                500
                                            </ThemedText>

                                        </View>
                                    </Card>
                                </Pressable>
                            </Link>
                        );
                    })
                }

            </ParallaxScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#5e776b",
        paddingTop: 30,
        paddingBottom: 30,
    },
    card: {
        alignSelf: "stretch",
        borderRadius: 20,
        paddingTop: 0,
        paddingStart: 0,
        paddingEnd: 0,
        paddingBottom: 10,
    },
    cardImage: {
        width: "100%",
        resizeMode: "cover",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    cardText: {
        paddingStart: 30,
        paddingEnd: 10
    },
});
