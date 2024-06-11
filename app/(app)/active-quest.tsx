import React, {useRef, useState} from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Animated, Image, ScrollView, StyleSheet, TextInput, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@rneui/base";
import { Icon } from "@/components/Icon";
import { ThemedView } from "@/components/ThemedView";
import Timer from "@/components/Timer";

const mockQuizeText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quam autem rerum reprehenderit, praesentium maxime repellat tempore voluptas quis?";

// function useInterval(callback: () => void, delay: number) {
//     const savedCallback = useRef<() => void>();
  
//     // Remember the latest callback.
//     useEffect(() => {
//         savedCallback.current = callback;
//     }, [callback]);
  
//     // Set up the interval.
//     useEffect(() => {
//         function tick() {
//             savedCallback.current();
//         }

//         if ( delay !== null ) {
//             let id = setInterval( tick, delay );
//             return () => clearInterval( id );
//         }

//     }, [ delay ]);
// }

export default () => {
    const insets = useSafeAreaInsets();
    const { image } = useLocalSearchParams();

    const [inputText, onChangeInputText] = useState("");
    const [isTimeout, setIsTimeout] = useState(false);
    const [step, setStep] = useState(1);

    const progressRef = useRef(new Animated.Value(0)).current;
    const [progress, setProgress] = useState(0);
    
    // const animation = useRef(new Animated.Value(0)).current;
    // const [progress, setProgress] = useState(0);
    // useInterval(() => {
    //     if (progress < 100) {
    //         setProgress( progress + 5 );
    //     }
    // }, 1000);

    // useEffect(() => {

    //     Animated.timing(progressRef, {
    //         toValue: progress,
    //         duration: 100,
    //         useNativeDriver: false,
    //     }).start();

    // },[progress]);

    // const animatedWidth = progressRef.interpolate({
    //     inputRange: [0, 100],
    //     outputRange: ["0%", "100%"],
    //     extrapolate: "clamp"
    // })

    const progressWidth: string = (() => {
        return step * 25 + "%";
    })();

    const onPressButton = () => {
        if ( step < 4 ) {
            setStep( step + 1 );
        }
    };

    const timer = () => {
        let time = new Date(Date.parse(new Date()) + 60 * 1000);
        return <Timer date={ time } onlySeconds={ true } setTimeIsOver={ setIsTimeout } />;
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView 
                automaticallyAdjustKeyboardInsets={ true } 
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
                        ]}/>
                        <View style={{ position: "absolute", alignSelf: "center",  }}>
                            <ThemedText style={{ alignSelf: "center" }}>
                                { step }/4
                            </ThemedText> 
                        </View>
                    </View>

                    {/* <Text>
                        {`${progress}%`}
                    </Text> */}

                    <Button type="clear" onPress={ () => router.back() }>
                        <Icon name="xmark" color="#0d1821" style={{ fontSize: 50 }} />
                    </Button>

                </View>

                <Image source={ image } style={ styles.image } />

                <ThemedView style={ styles.body }>

                    <ThemedText style={ styles.bodyText }>{ mockQuizeText.repeat(2) }</ThemedText>

                    <ThemedText type="h1" style={{ alignSelf: "center", marginVertical: 10 }}>
                        Ваш ответ
                    </ThemedText>

                    <TextInput
                        style={ styles.input }
                        onChangeText={ onChangeInputText }
                        value={ inputText }
                    />

                    <Button
                        title={"Ответить"}
                        onPress={ onPressButton }
                        containerStyle={{ marginHorizontal: 30, marginVertical: 20 }}
                        buttonStyle={{ borderRadius: 15, paddingVertical: 15, backgroundColor: "#886b57" }}
                        titleStyle={{ fontSize: 30 }}
                        disabled={ step == 4 }
                    />

                    <ThemedText style={{ paddingHorizontal: 30, alignSelf: "center" }}>
                        { !isTimeout ? "Подсказка будет доступна через": "" }
                    </ThemedText>

                    <ThemedText style={{ paddingHorizontal: 30, alignSelf: "center" }}>
                        { !isTimeout ? timer() : "Краснодар" }
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