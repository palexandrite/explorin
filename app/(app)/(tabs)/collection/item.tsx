import { Image, Pressable, StyleSheet, View } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Icon } from "@/components/Icon";

const mockBodyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quam autem rerum reprehenderit, praesentium maxime repellat tempore voluptas quis?";

export default () => {
    const { image, name, brief, position } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#5e776b", dark: "#5e776b" }}
                headerImage={<Image style={{ width: "100%", height: "100%" }} source={image} />}
            >

                <View style={styles.header}>
                    <ThemedText type="h1" style={{ flexGrow: 1 }}>{name}</ThemedText>

                    <Link href={{ pathname: "/path", params: { position: position, targetName: name } }} asChild>
                        <Pressable>
                            <Icon name="arrows-turn-to-dots" color="#886b57" style={styles.icon} />
                        </Pressable>
                    </Link>
                </View>

                <ThemedText type="h1" style={styles.body}>Историческая справка</ThemedText>

                <ThemedText style={styles.body}>
                    {brief}
                </ThemedText>

            </ParallaxScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
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
    body: {
        paddingStart: 30,
        paddingEnd: 30,
        marginTop: 30,
    },
});