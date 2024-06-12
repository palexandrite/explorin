import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@rneui/base";
import { Input } from "@rneui/themed";
import { Stack, router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

export default () => {
    const auth = getAuth();
    
    const [inputName, setInputName]         = useState("");
    const [inputEmail, setInputEmail]       = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputError, setInputError]       = useState("");

    const signUp = async () => {
        if ( inputEmail === "" || inputPassword === "" ) {
            setInputError("Email и Пароль обязательны для заполнения");
            return;
        }

        try {
            const credential = await createUserWithEmailAndPassword( auth, inputEmail, inputPassword );
            const user = credential.user;
            await updateProfile(user, { displayName: inputName });
            router.replace("/sign-in");
        } catch ( error ) {
            console.error(error);
            setInputError("Что-то пошло не так... ");
        }
    };

    const onPressButton = () => signUp();

    const onChangeText = (target, value) => {
        switch ( target ) {
            case "name":
                setInputName(value);
                break;
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

                <ThemedText style={ styles.text }>Регистрация</ThemedText>

                {
                    inputError !== "" ? (<Text style={ styles.error }>{ inputError }</Text>) : ""
                }

                <Input
                    placeholder="Имя"
                    onChangeText={ (text) => onChangeText("name", text) }
                />

                <Input
                    placeholder="Email"
                    onChangeText={ (text) => onChangeText("email", text) }
                />

                <Input
                    placeholder="Пароль"
                    onChangeText={ (text) => onChangeText("password", text) }
                />

                <Button
                    title={"Зарегестрироваться"}
                    onPress={ onPressButton }
                />

                <Button
                    title={"Или войти"}
                    type="clear"
                    onPress={ () => router.navigate("/") }
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
    error: {
        fontSize: 20,
        color: "#ff6666",
    },
});