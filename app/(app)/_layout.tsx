import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthentication } from "@/hooks/useAuthentication";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { user } = useAuthentication();

    const colorScheme = useColorScheme();
    const [ fontsLoaded ] = useFonts({
        SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if ( fontsLoaded ) {
            if ( !user ) {
                router.push("/(auth)");
            } else {
                SplashScreen.hideAsync();
            }
        }
    }, [ fontsLoaded, user ]);

    if ( !fontsLoaded ) {
        return null;
    }

    // if ( !rootNavigationState?.key ) return null;

    // const compose = ( providers ) => (
    //     providers.reduce(( Previous, Current ) => ({ children }) => (
    //         <Previous>
    //             <Current>{ children }</Current>
    //         </Previous>
    //     ))
    // );

    // const Provider = compose([
    //     ThemeProvider,
    //     SafeAreaProvider
    // ]);

    // if ( !user ) {
    //     return (
    //         <Stack>
    //             <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    //         </Stack>
    //     );
    // }

    return (
        <SafeAreaProvider>
            <ThemeProvider value={ colorScheme === "dark" ? DarkTheme : DefaultTheme }>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    {/* <Stack.Screen name="(pages)" options={{ headerShown: false }} /> */}
                    <Stack.Screen name="+not-found" />
                </Stack>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
