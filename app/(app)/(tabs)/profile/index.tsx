import { Button, Image, StyleSheet, Text, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Icon } from "@/components/Icon";
import CircularProgress from "react-native-circular-progress-indicator";
import { Link, Stack, router } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabFourScreen() {

    const auth = getAuth();
    const user = auth.currentUser;

    const colorScheme = useColorScheme();
    const [successQuest, setSuccessQuest] = useState(false);
    const [doneQuestAmount, setDoneQuestAmount] = useState(0);
    const [doneQuestionAmount, setDoneQuestionAmount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const [doneQuests, setDoneQuests] = useState();
    const [doneQuestions, setDoneQuestions] = useState();

    useEffect(() => {

        (async () => {
            try {
                let finishedQuestKeys = [];
                let startedQuestKeys = [];

                for (let i = 1; i <= 2; i++) {
                    const key = `${user?.email}-started-quest-${i}`;
                    const successKey = `${user?.email}-finished-quest-${i}`;
                    finishedQuestKeys.push(successKey);
                    startedQuestKeys.push(key);
                }




                const finishedQuests = await AsyncStorage.multiGet(finishedQuestKeys);
                const notNullFinishedQuests = finishedQuests.filter((item) => item[1] !== null);
                if (notNullFinishedQuests.length) {
                    setDoneQuests(notNullFinishedQuests);


                    setDoneQuestAmount(notNullFinishedQuests.length);
                }



                const answers = await AsyncStorage.multiGet(startedQuestKeys);
                const notNullAnswers = answers.filter((item) => item[1] !== null);
                if (notNullAnswers.length) {
                    let answerAmount = 0;
                    notNullAnswers.forEach((item) => {
                        let [, value] = item;
                        answerAmount += +value;
                    });
                    setDoneQuestions(notNullAnswers);
                    setDoneQuestionAmount(answerAmount);
                }

                const success = await AsyncStorage.getItem("Success");
                if (success !== null) {
                    setSuccessQuest(true);
                    await AsyncStorage.removeItem("Success");
                }

                setIsLoaded(true);

            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    if (isLoaded) {
        console.log("DATA");
        console.log(doneQuests);
        console.log(doneQuestions);
    }

    const resetData = async () => {
        try {
            await AsyncStorage.clear();
            await signOut(auth);
            router.navigate("/");
        } catch (error) { console.error(error) }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#f2ece3", dark: "#886b57" }}
            >

                <View style={{ paddingHorizontal: 30 }}>
                    <ThemedView style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 30, paddingTop: 20 }}>

                        <Button title="Обнулить данные" onPress={resetData} />

                        <Link href="/profile/edit">
                            <Icon name="gear" color={Colors[colorScheme ?? "light"].tint} />
                        </Link>
                    </ThemedView>

                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <ThemedText style={{ color: "#5e776b" }}>
                            {successQuest ? "Квест успешно пройден" : ""}
                        </ThemedText>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                        <View style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "#5063c7",
                            borderRadius: 50,
                            marginBottom: 30,
                            justifyContent: "center",
                            alignContent: "center"
                        }}>
                            <Text style={{ color: "#fff", alignSelf: "center", fontSize: 30 }}>EK</Text>
                        </View>

                        <ThemedView style={styles.paragraph}>
                            <ThemedText type="h1">{user?.displayName}</ThemedText>
                        </ThemedView>

                        <ThemedView style={styles.paragraph}>
                            <ThemedText type="h1">Уровень</ThemedText>
                        </ThemedView>

                        <CircularProgress
                            value={doneQuestionAmount}
                            maxValue={6}
                            activeStrokeWidth={5}
                            activeStrokeColor={Colors[colorScheme ?? "light"].progress}
                            inActiveStrokeOpacity={0.2}
                            progressValueStyle={{ color: Colors[colorScheme ?? "light"].text }}
                        />

                    </View>

                    {/* <ThemedText type="h1">Статистика</ThemedText>

                    <View style={{ flexDirection: "row", gap: 10, backgroundColor: "#fff", padding: 10 }}>
                        <View style={{ gap: 10 }}>
                            <View style={{ borderWidth: 2, borderRadius: 5, padding: 10 }}>
                                <ThemedText style={{ fontWeight: 500, alignSelf: "center" }}>3</ThemedText>
                                <ThemedText style={{ alignSelf: "center" }}>Пройдено квестов</ThemedText>
                            </View>
                            <View style={{ borderWidth: 2, borderRadius: 5, padding: 10 }}>
                                <ThemedText style={{ fontWeight: 500, alignSelf: "center" }}>1300</ThemedText>
                                <ThemedText style={{ alignSelf: "center" }}>Всего опыта</ThemedText>
                            </View>
                        </View>

                        <View style={{ gap: 10 }}>
                            <View style={{ borderWidth: 2, borderRadius: 5, padding: 10 }}>
                                <ThemedText style={{ fontWeight: 500, alignSelf: "center" }}>52</ThemedText>
                                <ThemedText style={{ alignSelf: "center" }}>Посещено мест</ThemedText>
                            </View>
                            <View style={{ borderWidth: 2, borderRadius: 5, padding: 10 }}>
                                <ThemedText style={{ fontWeight: 500, alignSelf: "center" }}>57</ThemedText>
                                <ThemedText style={{ alignSelf: "center" }}>% изученности города</ThemedText>
                            </View>
                        </View>
                    </View> */}

                    <ThemedText type="h1">Достижения</ThemedText>

                    <View style={{ gap: 10, backgroundColor: "#fff", padding: 10 }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            borderWidth: 2,
                            borderRadius: 5,
                            padding: 10
                        }}>
                            <Image source={require("@/assets/images/bowl.png")} />

                            <View style={{ flexGrow: 1 }}>
                                <ThemedText style={{ marginBottom: 5 }}>Пройти 2 квеста</ThemedText>

                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    position: "relative",
                                    zIndex: 1,
                                    borderWidth: 1,
                                    borderRadius: 50,
                                    backgroundColor: "#a2a4af"
                                }}>
                                    <ThemedText style={{ alignSelf: "center", zIndex: 3 }}>
                                        {doneQuestAmount}/2
                                    </ThemedText>

                                    <View style={[
                                        styles.questProgress,
                                        doneQuestAmount > 0 ? doneQuestAmount == 1 ? { width: "50%" } : { width: "100%" } : {}
                                    ]}></View>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            </ParallaxScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        // flex: 1,
        // paddingTop: 60,
        // paddingStart: 25,
        // paddingEnd: 25,
        // gap: 16,
        // overflow: 'hidden',
        flexDirection: "row",
        gap: 8,
    },
    paragraph: {
        marginBottom: 20
    },
    questProgress: {
        position: "absolute",
        zIndex: 2,
        left: 0,
        height: "100%",
        borderRadius: 50,
        backgroundColor: "#e8c087"
    }
});