import myToastConfig from "@/configurations/ToastConfig";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Toast from 'react-native-toast-message';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export default function RootLayout() {
  return (
    <>
    <AuthProvider>
      <StatusBar hidden={true}/>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
    <Toast
      topOffset={60}
      position="top"
      config={myToastConfig}
    />
    </>
  )
}
