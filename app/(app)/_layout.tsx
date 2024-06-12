import { Text } from "react-native";
import { useFonts } from "expo-font";

import { useSession } from "@/contexts/AuthContext";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Redirect, Stack } from "expo-router";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
    const { currentUser, isLoading } = useSession();
    const colorScheme = useColorScheme();
    const [ fontsLoaded ] = useFonts({
        SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if ( fontsLoaded ) {
            SplashScreen.hideAsync();
        }
    }, [ fontsLoaded ]);

    if ( !fontsLoaded ) {
        return null;
    }

    if ( !currentUser ) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in" />;
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider value={ colorScheme === "dark" ? DarkTheme : DefaultTheme }>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}