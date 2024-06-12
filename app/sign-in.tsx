import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@rneui/base";
import { Input } from "@rneui/themed";
import { Stack, router } from "expo-router";
import { getAuth, signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default () => {
    const auth = getAuth();
    
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputError, setInputError] = useState("");

    const signIn = async () => {
        if ( inputEmail === "" || inputPassword === "" ) {
            setInputError("Email и Пароль обязательны для заполнения");
            return;
        }

        try {
            await signInWithEmailAndPassword( auth, inputEmail, inputPassword );
            router.replace("/");
        } catch ( error ) {
            console.error(error);
            setInputError("Что-то пошло не так...");
        }
    };

    const onPressButton = () => signIn();

    const onChangeText = (target, value) => {
        switch ( target ) {
            case "email":
                setInputEmail(value);
                break;
            case "password":
                setInputPassword(value);
                break;
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ThemedView style={ styles.container }>

                <ThemedText style={ styles.text }>Вход</ThemedText>

                <Input
                    placeholder="Email"
                    onChangeText={ (text) => onChangeText("email", text) }
                />

                <Input
                    placeholder="Пароль"
                    onChangeText={ (text) => onChangeText("password", text) }
                />

                <Button
                    title={"Войти"}
                    onPress={ onPressButton }
                />

                <Button
                    title={"Или зарегистрироваться"}
                    type="clear"
                    onPress={ () => router.navigate("/sign-up") }
                />

            </ThemedView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
    },
    text: {
        fontSize: 30
    },
});