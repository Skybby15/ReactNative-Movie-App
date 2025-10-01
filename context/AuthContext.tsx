import LoadingScreen from "@/components/LoadingScreen";
import { account } from "@/services/appwrite";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppwriteException, ID, Models } from "react-native-appwrite";

// define the type
export type AuthContextType = {
  session: Models.Session | null;
  user: Models.User<Models.Preferences> | null;
  login: (params: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  signup: (params: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

// create the context
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({children}:AuthProviderProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Models.Session | null>(null);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    useEffect(()=>{
        checkAuth();
    },[])

    const checkAuth = async () => {
        setLoading(true);
        try {
            const responseSession = await account.getSession({sessionId:"current"});
            setSession(responseSession);

            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            setSession(null)
        } finally {
            setLoading(false);
        }
    };

    const login = async ({email, password}: { email: string; password: string }) => {
        setLoading(true)
        try {
            const responseSession = await account.createEmailPasswordSession({email, password});
            setSession(responseSession);

            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            if (!(error instanceof AppwriteException))
            {
                const weirdError = error as Error;
                console.error(weirdError.message)
            }
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            account.deleteSession({sessionId:"current"})
            setSession(null);
            setUser(null);
        } catch (error) {
            if (!(error instanceof AppwriteException))
            {
                const weirdError = error as Error;
                console.error(weirdError.message)
            }
            throw error
        } finally{
            setLoading(false);
        }
    }

    const signup = async ({first_name, last_name, email, password} : 
        { first_name: string; last_name: string; email: string; password: string;}) => {
        setLoading(true)
        try {
            const name = `${first_name.trim()} ${last_name}`.trim();

            const responseUser = await account.create({userId:ID.unique(), email, password, name});
            const responseSession = await account.createEmailPasswordSession({email, password});
            setSession(responseSession);
            setUser(responseUser);

        } catch (error) {
            if (!(error instanceof AppwriteException))
            {
                const weirdError = error as Error;
                console.error(weirdError.message)
            }
            throw error
        } finally {
            setLoading(false)
        }
    }

    const contextData = {session, user, login, logout, signup}
    return (
    <AuthContext.Provider value={contextData}>
        {loading ?(
            <LoadingScreen/>
        ) : (
            children
        )}
    </AuthContext.Provider>)
}

const useAuth = () => {
    return useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth };
