import { Pressable, StyleSheet, View } from "react-native";
import { Card } from "@rneui/base";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack } from "expo-router";

const mock = [
    {
        title: "Путешествие до дворца",
        image: require("@/assets/images/quests/XXXL.png"),
        address: "ул. Центральная 50",
        url: "/quest/item",
    }, {
        title: "Поиск сокровищ",
        image: require("@/assets/images/quests/b9RSJfIqpgVvYKr-TUl3idYif0Q2cYEe6AfIElXlfQhWzWAODo_MBTc6GLO9nCva8pnfkfA9WlDx_2nU8iZtdByWxxUxyHUjnZMZOY5LFft34-tElnFBD7kFfz.png"),
        address: "ул. Энгельса 50",
        url: "/quest/item",
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
                    <ThemedText type="h1" style={{ alignSelf: "center", color: "#fff" }}>Квесты</ThemedText>
                </ThemedView>

                {
                    mock.map((m, i) => {

                        return (
                            <Link key={ i } href={{ 
                                pathname: m.url, 
                                params: { name: m.title, image: m.image, address: m.address } 
                            }} asChild>
                                <Pressable>
                                    <Card containerStyle={ styles.card }>
                                        <Card.Image
                                            style={ styles.cardImage }
                                            source={ m.image }
                                        />

                                        <ThemedText type="h1" style={[ styles.cardText ]}>
                                            { m.title }
                                        </ThemedText>

                                        <ThemedText type="defaultSemiBold" style={[ styles.cardText ]}>
                                            { m.address }
                                        </ThemedText>

                                        <View style={{ flexDirection: "row" }}>
                                                
                                            <ThemedText style={ styles.cardText }>
                                                50 мин
                                            </ThemedText>

                                            <ThemedText style={ styles.cardText }>
                                                4 км
                                            </ThemedText>

                                            <ThemedText style={ styles.cardText }>
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
