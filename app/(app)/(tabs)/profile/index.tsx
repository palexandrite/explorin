import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Icon } from "@/components/Icon";
import CircularProgress from "react-native-circular-progress-indicator";
import { Link, Stack } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getAuth } from "firebase/auth";

export default function TabFourScreen() {
    const colorScheme = useColorScheme();
    const user = getAuth().currentUser;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            
            <ParallaxScrollView
                headerBackgroundColor={{ light: "#f2ece3", dark: "#886b57" }}
            >

                <View style={{ paddingHorizontal: 30 }}>
                    <ThemedView style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 30 }}>
                        <Link href="/profile/edit">
                            <Icon name="gear" color={ Colors[colorScheme ?? "light"].tint } />
                        </Link>
                    </ThemedView>

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
                            <Text style={{ color: "#fff", alignSelf: "center", fontSize: 30 }}>RT</Text>
                        </View>

                        <ThemedView style={ styles.paragraph }>
                            <ThemedText type="h1">{ user?.displayName } </ThemedText>
                        </ThemedView>

                        <ThemedView style={ styles.paragraph }>
                            <ThemedText type="h1">Уровень</ThemedText>
                        </ThemedView>

                        <CircularProgress
                            value={ 5 }
                            activeStrokeWidth={ 5 }
                            activeStrokeColor={ Colors[colorScheme ?? "light"].progress }
                            inActiveStrokeOpacity={ 0.2 }
                            progressValueStyle={{ color: Colors[colorScheme ?? "light"].text }}
                        />

                    </View>

                    <ThemedText type="h1">Статистика</ThemedText>

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
                    </View>

                    <ThemedText type="title">Друзья</ThemedText>

                    <View style={{ gap: 10, backgroundColor: "#fff", padding: 10 }}>
                        <View style={{
                            flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 2, borderRadius: 5, padding: 10 }}
                        >
                            <View style={{  
                                width: 50,
                                height: 50,
                                backgroundColor: "#5063c7",
                                borderRadius: 50,
                                justifyContent: "center",
                                alignContent: "center"
                            }}>
                                <Text style={{ color: "#fff", alignSelf: "center", fontSize: 15 }}>RT</Text>
                            </View>

                            <ThemedText style={{ alignSelf: "center" }}>Посещено мест</ThemedText>
                        </View>

                        <View style={{
                            flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 2, borderRadius: 5, padding: 10 }}
                        >
                            <View style={{ 
                                width: 50,
                                height: 50,
                                backgroundColor: "#5063c7",
                                borderRadius: 50,
                                justifyContent: "center",
                                alignContent: "center"
                            }}>
                                <Text style={{ color: "#fff", alignSelf: "center", fontSize: 15 }}>RT</Text>
                            </View>

                            <ThemedText style={{ alignSelf: "center" }}>Посещено мест</ThemedText>
                        </View>
                        
                        <View style={{ 
                            alignSelf: "flex-end", 
                            borderWidth: 2, 
                            borderColor: "#886b57",
                            borderRadius: 10, 
                            paddingHorizontal: 20,
                            paddingVertical: 10 
                        }}>
                            <ThemedText style={{ fontSize: 24 }} lightColor="#886b57" darkColor="#886b57">Все</ThemedText>
                        </View>
                    </View>

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
                            <Image source={ require("@/assets/images/bowl.png") } />

                            <View style={{ flexGrow: 1 }}>
                                <ThemedText style={{ marginBottom: 5 }}>Пройти 4 квеста</ThemedText>

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
                                        2/4
                                    </ThemedText>

                                    <View style={{ 
                                        position: "absolute",
                                        zIndex: 2,
                                        left: 0,
                                        width: "50%",
                                        height: "100%",
                                        borderRadius: 50,
                                        backgroundColor: "#e8c087"
                                    }}></View>

                                </View>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row", 
                            alignItems: "center", 
                            gap: 10, 
                            borderWidth: 2, 
                            borderRadius: 5, 
                            padding: 10 
                        }}>
                            <Image source={ require("@/assets/images/bowl.png") } />

                            <View style={{ flexGrow: 1 }}>
                                <ThemedText style={{ marginBottom: 5 }}>Выполнить 6 испытаний</ThemedText>

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
                                        2/4
                                    </ThemedText>

                                    <View style={{ 
                                        position: "absolute",
                                        zIndex: 2,
                                        left: 0,
                                        width: "50%",
                                        height: "100%",
                                        borderRadius: 50,
                                        backgroundColor: "#e8c087"
                                    }}></View>

                                </View>
                            </View>
                        </View>

                        <View style={{ 
                            alignSelf: "flex-end", 
                            borderWidth: 2, 
                            borderColor: "#886b57",
                            borderRadius: 10, 
                            paddingHorizontal: 20,
                            paddingVertical: 10 
                        }}>
                            <ThemedText style={{ fontSize: 24 }} lightColor="#886b57" darkColor="#886b57">Все</ThemedText>
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
});