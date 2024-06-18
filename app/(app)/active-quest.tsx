import React, { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Animated, Image, ScrollView, StyleSheet, TextInput, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@rneui/base";
import { Icon } from "@/components/Icon";
import { ThemedView } from "@/components/ThemedView";
import Timer from "@/components/Timer";

import { Quests } from "@/mocks/Quests";
import { getAuth } from "firebase/auth";

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

    const insets = useSafeAreaInsets();
    const { questId } = useLocalSearchParams();

    const [inputText, setInputText] = useState("");
    const [isTimeout, setIsTimeout] = useState(false);
    const [step, setStep] = useState(1);
    const [isStepSet, setIsStepSet] = useState(false);
    const [isIncorrectAnswer, setIsIncorrectAnswer] = useState(false);

    useEffect(() => {
        (async () => {
            if (!isStepSet) {
                try {
                    const key = `${user?.email}-started-quest-${questId}`;
                    const currentStep = await AsyncStorage.getItem(key);
                    if (currentStep !== null) {
                        setStep(Number(currentStep) + 1);
                    }

                    setIsStepSet(true);

                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }, []);

    const progressWidth: string = (() => {
        return step * 33.3 + "%";
    })();

    const timer = () => {
        let time = new Date(Date.parse(new Date()) + 60 * 1000);
        return <Timer date={time} onlySeconds={true} setTimeIsOver={setIsTimeout} />;
    };

    const currentQuest = Quests.find((quest: Item): boolean => quest.id == questId);
    const currentQuestion = step == 1 ? currentQuest?.quiz[0].question : currentQuest?.quiz[step - 1]?.question;
    const currentAnswer = step == 1 ? currentQuest?.quiz[0].answer : currentQuest?.quiz[step - 1]?.answer;

    const handleInputChange = (value: string) => {
        setInputText(value);
        if (isIncorrectAnswer) {
            setIsIncorrectAnswer(false);
        }
    };

    const onPressButton = () => {
        const isItCorrect = currentAnswer == inputText;
        if (isItCorrect) {
            (async () => {
                try {
                    const key = `${user?.email}-started-quest-${questId}`;
                    const successKey = `${user?.email}-finished-quest-${questId}`;
                    await AsyncStorage.setItem(key, String(step));
                    if (step < 3) {
                        router.navigate({
                            pathname: "/quest/map",
                            params: { questId: questId }
                        });
                    } else {
                        await AsyncStorage.setItem(successKey, String(questId));
                        await AsyncStorage.setItem("Success", "1");
                        router.navigate("/profile");
                    }
                } catch (error) {
                    console.error(error);
                }
            })();
        } else {
            setIsIncorrectAnswer(true);
        }
    };


    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                style={{ height: "100%", backgroundColor: "#f2ece3" }}
            >
                <View style={[
                    styles.header,
                    {
                        paddingTop: insets.top + 10,
                    }
                ]}>

                    <View style={[
                        styles.progress,
                        {
                            paddingStart: insets.left,
                            paddingEnd: insets.right,
                        }
                    ]}>
                        <Animated.View style={[
                            styles.progressIndicator,
                            {
                                width: progressWidth
                            }
                        ]} />
                        <View style={{ position: "absolute", alignSelf: "center", }}>
                            <ThemedText style={{ alignSelf: "center" }}>
                                {step}/3
                            </ThemedText>
                        </View>
                    </View>

                    {/* <Text>
                        {`${progress}%`}
                    </Text> */}

                    <Button type="clear" onPress={() => router.back()}>
                        <Icon name="xmark" color="#0d1821" style={{ fontSize: 50 }} />
                    </Button>

                </View>

                <Image source={currentQuest?.cover} style={styles.image} />

                <ThemedView style={styles.body}>

                    <ThemedText style={styles.bodyText}>
                        {
                            currentQuestion
                        }
                    </ThemedText>

                    <ThemedText type="h1" style={{ alignSelf: "center", marginVertical: 10 }}>
                        Ваш ответ
                    </ThemedText>

                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChange}
                        value={inputText}
                    />

                    <Button
                        title={"Ответить"}
                        onPress={onPressButton}
                        containerStyle={{ marginHorizontal: 30, marginVertical: 20 }}
                        buttonStyle={{ borderRadius: 15, paddingVertical: 15, backgroundColor: "#886b57" }}
                        titleStyle={{ fontSize: 30 }}
                    />

                    <ThemedText style={{ paddingHorizontal: 30, alignSelf: "center" }}>
                        {!isTimeout ? "Подсказка будет доступна через" : ""}
                    </ThemedText>

                    <ThemedText style={{ paddingHorizontal: 30, alignSelf: "center" }}>
                        {!isTimeout ? timer() : currentAnswer}
                    </ThemedText>

                    <ThemedText style={{ alignSelf: "center", color: "red" }}>
                        {
                            isIncorrectAnswer ? "Ответ неверный." : ""
                        }
                    </ThemedText>

                </ThemedView>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2ece3",
    },
    progress: {
        flexDirection: "row",
        justifyContent: "center",
        height: 20,
        maxWidth: "60%",
        width: "100%",
        backgroundColor: "white",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 50,
        paddingBottom: 30,
    },
    progressIndicator: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 50,
        backgroundColor: "#e8c087",
    },
    image: {
        width: "100%",
        height: 300,
    },
    body: {
        height: "100%",
    },
    bodyText: {
        fontSize: 20,
        marginHorizontal: 30,
        marginVertical: 10,
    },
    input: {
        height: 40,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#fff"
    },
});