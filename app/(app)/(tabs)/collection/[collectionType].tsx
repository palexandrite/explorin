import { useEffect, useState } from "react";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/base";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack, useLocalSearchParams } from "expo-router";

import { Collections } from "@/mocks/Collections";

type Item = {
    id: number,
    type: string,
    title: string,
    image: string,
    brief: string,
    position: number[],
};

export default function TabThreeScreen() {
    const { collectionType } = useLocalSearchParams();

    let items: Item[] | null = null;

    const landMarks = () => Collections.filter((item) => item.type === "landmark");
    const importances = () => Collections.filter((item) => item.type === "importance");

    switch (collectionType) {
        case "landmarks":
            items = landMarks();
            break;
        case "importances":
            items = importances();
            break;
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#5e776b", dark: "#5e776b" }}
            >

                <ThemedView style={[styles.header]}>
                    <ThemedText type="h1" style={{ alignSelf: "center", color: "#fff" }}>
                        {collectionType == "landmarks" ? "Памятники" : "Значимые места"}
                    </ThemedText>
                </ThemedView>

                {
                    items?.map((m: Item, i) => {
                        return (
                            <Link
                                key={i}
                                href={{
                                    pathname: "/collection/item",
                                    params: { image: m.image, name: m.title, position: m.position, brief: m.brief }
                                }}
                                asChild
                            >
                                <Pressable>
                                    <Card containerStyle={styles.cardContainer}>
                                        <Card.Image
                                            style={{ width: "100%", resizeMode: "cover" }}
                                            source={m.image}
                                        />

                                        <View style={{ paddingStart: 10, paddingEnd: 10 }}>

                                            <Card.Title style={{ alignSelf: "flex-start", paddingTop: 10, fontSize: 25 }}>
                                                {m.title}
                                            </Card.Title>

                                            <Card.Divider style={{ marginTop: -10 }} />

                                            {/* <View style={ styles.cardTextContainer }>
                                                <ThemedText type="h1" style={[ styles.cardText ]}>
                                                    { m.year }
                                                </ThemedText>
                                                <ThemedText style={[ styles.cardText, { fontSize: 20 } ]}>
                                                    { m.creator }
                                                </ThemedText>
                                            </View> */}

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
    cardContainer: {
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
