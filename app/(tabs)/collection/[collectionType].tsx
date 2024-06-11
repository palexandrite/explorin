import { useEffect, useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/base";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack, useLocalSearchParams } from "expo-router";

type CardType = {
    id: number,
    title: string,
    image: string,
    year: number,
    creator: string,
    url: string,
    urlParams: { image: string, name: string }
};

type Coffee = {
    id: number,
    title: string,
    image: string,
    description: string,
    ingredients: string[],
};

type Cartoon = {
    id: number,
    title: string,
    image: string,
    year: number,
    creator: string[],
};

export default function TabThreeScreen() {
    const [ data, setData ] = useState<CardType[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const { collectionType } = useLocalSearchParams();

    let fetchUrl: string | null = "https://api.sampleapis.com/coffee/hot";

    switch(collectionType) {
        case "cartoons":
            fetchUrl = "https://api.sampleapis.com/cartoons/cartoons2D";
            break;
        case "coffees":
            fetchUrl = "https://api.sampleapis.com/coffee/hot";
            break;
    }

    const getFetchedData = async () => {
        try {
            const response = await fetch( fetchUrl );
            const json = await response.json();

            let final = [];

            switch (collectionType) {
                case "cartoons":
                    final = json.map((item: Cartoon, index: number) => {
                        return {
                            title: item.title,
                            image: item.image,
                            year: item.year,
                            creator: item.creator[0],
                            url: "/collection/item/",
                            urlParams: { image: item.image, name: item.title }
                        };
                    });
                    break;
                case "coffees":
                    final = json.map((item: Coffee, index: number) => {
                        return {
                            title: item.title,
                            image: item.image,
                            year: 2000,
                            creator: "Superman",
                            url: "/collection/item/",
                            urlParams: { image: item.image, name: item.title }
                        };
                    });
                    break;
            }

            setData( final );
        } catch( error ) {
            console.error( error );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFetchedData();
        return setData([]);
    }, []);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            {
                isLoading ? (
                    <View style={{ justifyContent: "center", height: "100%" }}>
                        <Stack.Screen options={{ headerShown: false }} />
                        <Text style={{ alignSelf: "center" }}>Загружается...</Text>
                    </View>
                ) : (
                    <ParallaxScrollView
                        headerBackgroundColor={{ light: "#5e776b", dark: "#5e776b" }}
                    >
                        
                        <ThemedView style={[ styles.header ]}>
                            <ThemedText type="h1" style={{ alignSelf: "center", color: "#fff" }}>
                                { collectionType == "cartoons" ? "Мультфильмы" : "Кофе" }
                            </ThemedText>
                        </ThemedView>

                        {
                            data.map((m: CardType, i) => {
                                return (
                                    <Link 
                                        key={ i } 
                                        href={{ pathname: m.url, params: m.urlParams }} 
                                        asChild
                                    >
                                        <Pressable>
                                            <Card containerStyle={ styles.cardContainer }>
                                                <Card.Image
                                                    style={{ width: "100%", resizeMode: "cover" }}
                                                    source={{ uri: m.image }}
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
                                                            { m.creator }
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
                )
            }
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
