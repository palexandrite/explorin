import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Input } from "@rneui/themed";
import { Stack, router } from "expo-router";
import { getAuth, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";

export default () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setInputName(user?.displayName);
        setInputEmail(user?.email);
    }, []);

    const onChangeText = (target, value) => {
        switch (target) {
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
        setError("");
        setSuccess("");
    };

    const handleSave = async () => {
        try {
            await updateProfile(user, {
                displayName: inputName,
            });
            await updateEmail(user, inputEmail);
            await updatePassword(user, inputPassword);
            setError("");
            setSuccess("Сохранено успешно");
        } catch (error) {
            setError("При сохранении произошла ошибка");
            console.error(error)
        }
    };

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            router.navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "Редактирование профиля" }} />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#f2ece3", dark: "#886b57" }}
            >
                <ThemedView style={styles.saveButtonContainer}>
                    <ThemedText style={styles.saveButton} onPress={handleSave}>Сохранить</ThemedText>
                </ThemedView>

                <ThemedView style={styles.container}>

                    <Text style={styles.error}>{error}</Text>
                    <Text style={styles.success}>{success}</Text>

                    <ScrollView style={styles.form}>

                        <Text style={styles.label}>Никнэйм</Text>

                        <Input
                            placeholder="Имя"
                            value={inputName}
                            onChangeText={(text) => onChangeText("name", text)}
                        />

                        <Text style={styles.label}>Email</Text>

                        <Input
                            placeholder="Email"
                            value={inputEmail}
                            onChangeText={(text) => onChangeText("email", text)}
                        />


                        <Text style={styles.label}>Пароль</Text>

                        <Input
                            placeholder="Пароль"
                            onChangeText={(text) => onChangeText("password", text)}
                        />

                        <Button
                            title={"Выйти"}
                            buttonStyle={{ backgroundColor: "#886b57", borderRadius: 20 }}
                            onPress={handleLogOut}
                        />

                    </ScrollView>
                </ThemedView>

            </ParallaxScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    saveButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingBottom: 10,
        paddingHorizontal: 30,
    },
    saveButton: {

    },
    container: {
        paddingHorizontal: 30,
    },
    form: {},
    label: {},
    input: {},
    button: {},
    error: {
        color: "#ff4d00",
        fontSize: 20,
    },
    success: {
        fontSize: 20,
        color: "#5e776b",
    },
});