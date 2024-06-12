import { Slot } from "expo-router";
import { SessionProvider } from "@/contexts/AuthContext";

export default () => {
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    );
};