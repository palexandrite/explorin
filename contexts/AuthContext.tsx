import { PropsWithChildren, createContext, useContext } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import { User } from "firebase/auth";


type context = {
    // signIn: () => void;
    // signOut: () => void;
    currentUser?: User | undefined;
    // isLoading: boolean;
};

const AuthContext = createContext<context>({
    // signIn: () => null,
    // signOut: () => null,
    currentUser: undefined,
    // isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error("useSession must be wrapped in a <SessionProvider />");
        }
    }
  
    return value;
}

export function SessionProvider(props: PropsWithChildren) {
    const { user } = useAuthentication();
    // const isLoading = true;
  
    return (
        <AuthContext.Provider
            value={{
                // signIn: () => {
                //     // Perform sign-in logic here
                //     // setSession("xxx");
                // },
                // signOut: () => {
                //     // setSession(null);
                // },
                currentUser: user,
                // isLoading: isLoading,
            }}
        >

            { props.children }

        </AuthContext.Provider>
    );
}