import { Image, Pressable, StyleSheet, View } from "react-native";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Icon } from "@/components/Icon";
import { Button } from "@rneui/themed";

import { Quests } from "@/mocks/Quests";

type Item = {
    id: number,
    title: string,
    cover: any,
    address: string,
    items: number[],
    brief: string
};

export default () => {
    const { itemId } = useLocalSearchParams();

    let quest = Quests.find((item: Item): boolean => item.id == itemId);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#5e776b", dark: "#5e776b" }}
                headerImage={<Image style={{ width: "100%", height: "100%" }} source={quest?.cover} />}
            >

                <ThemedText type="h1" style={{ paddingStart: 30 }}>
                    {quest?.title}
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={[styles.text]}>
                    {quest?.address}
                </ThemedText>

                <View style={{ flexDirection: "row" }}>

                    <ThemedText style={styles.text}>
                        50 мин
                    </ThemedText>

                    <ThemedText style={styles.text}>
                        4 км
                    </ThemedText>

                    <ThemedText style={styles.text}>
                        500
                    </ThemedText>

                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title={"Начать"}
                        containerStyle={{
                            flexGrow: 1, paddingTop: 3
                        }}
                        buttonStyle={{ backgroundColor: "#886b57", borderRadius: 20 }}
                        titleStyle={{ fontWeight: "bold", fontSize: 25 }}
                        onPress={() => router.navigate({
                            pathname: "/quest/map",
                            params: { questId: quest?.id }
                        })}
                    />

                    <Link href={{ pathname: "/quest/map" }} asChild>
                        <Pressable>
                            <Icon name="arrows-turn-to-dots" color="#886b57" style={styles.icon} />
                        </Pressable>
                    </Link>
                </View>

                <ThemedText type="h1" style={styles.body}>Описание</ThemedText>

                <ThemedText style={styles.body}>
                    {quest?.brief}
                </ThemedText>

            </ParallaxScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        gap: 20,
        paddingStart: 30,
        paddingEnd: 30,
        marginTop: 30,
    },
    icon: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#886b57",
        padding: 15,
    },
    text: {
        paddingStart: 30,
        paddingEnd: 10
    },
    body: {
        paddingStart: 30,
        paddingEnd: 30,
        marginTop: 30,
    },
});