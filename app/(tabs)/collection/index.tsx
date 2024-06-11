import { Pressable, StyleSheet, View } from "react-native";
import { Card } from "@rneui/base";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack } from "expo-router";

const mock = [
    {
        title: "Мультфильмы",
        image: require("@/assets/images/alexis-93-bridge-unsplash.jpg"),
        year: 1950,
        creator: ["Василий Николаев"],
        url: "/collection/cartoons",
    }, {
        title: "Кофе",
        image: require("@/assets/images/timothy-barlin-coffee-unsplash.jpg"),
        year: 2013,
        creator: ["Алекси Фурин"],
        url: "/collection/coffees",
    }
];

export default function TabThreeScreen() {

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#5e776b", dark: "#5e776b" }}
            >
                
                <ThemedView style={[ styles.header ]}>
                    <ThemedText type="h1" style={{ alignSelf: "center", color: "#fff" }}>Коллекции</ThemedText>
                </ThemedView>

                {
                    mock.map((m, i) => {

                        return (
                            <Link key={ i } href={ m.url } asChild>
                                <Pressable>
                                    <Card containerStyle={ styles.card }>
                                        <Card.Image
                                            style={{ width: "100%", resizeMode: "cover" }}
                                            source={ m.image }
                                        />

                                        <View style={{ paddingStart: 10, paddingEnd: 10 }}>

                                            <Card.Title style={{ alignSelf: "flex-start", paddingTop: 10, fontSize: 25 }}>
                                                { m.title }
                                            </Card.Title>

                                            <Card.Divider style={{ marginTop: -10 }} />

                                            <View style={ styles.cardTextContainer }>
                                                <ThemedText type="h1" style={[ styles.cardText ]}>
                                                    { m.year }
                                                </ThemedText>
                                                <ThemedText style={[ styles.cardText, { fontSize: 20 } ]}>
                                                    { m.creator[0] }
                                                </ThemedText>
                                            </View>

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
    cardTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
        paddingBottom: 5
    },
    cardText: {
        // paddingTop: 30,
    },
});
