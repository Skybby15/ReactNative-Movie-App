import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { Link, Redirect } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login, session } = useAuth()!;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
  try {
    await login(data);
  } catch (err) {
    const message = (err as Error).message;
    Toast.show({
      type: "error",
      text1: "Login failed!",
      text2: message,
    });
  }
};

  if (session) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <Image source={images.bg} className="absolute w-full z-0 top-0" />
      <Image source={icons.logo} className="w-12 h-10 mb-5" />

      <View className="w-3/4 h-[40%] border border-white rounded-3xl items-center">
        <View className="mt-5 mb-10 items-center">
          <Text className="font-bold text-2xl mt-3 text-white">
            Movie Finder
          </Text>
          <Text className="text-gray-500">LOGIN</Text>
        </View>

        {/* Email */}
        <Text className="text-white self-start ml-12 mb-1">Email:</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-4/5 border border-white rounded-lg text-white p-3"
              value={value}
              onChangeText={(text) => {
                // Remove all spaces
                const newText = text.replace(/\s/g, "");
                onChange(newText);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 text-xs self-start ml-12">
            {errors.email.message}
          </Text>
        )}

        <View className="m-3" />

        {/* Password */}
        <Text className="text-white self-start ml-12 mb-1">Password:</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-4/5 border border-white rounded-lg text-white p-3"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500 text-xs self-start ml-12">
            {errors.password.message}
          </Text>
        )}

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-white w-28 h-11 rounded-2xl items-center justify-center mt-7"
        >
          <Text className="text-black text-lg">Login</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text className="text-white mt-2">
        Don&apos;t have an account yet?{" "}
        <Link href={"/signup"}>
          <Text className="text-blue-700">Sign up now!</Text>
        </Link>
      </Text>
    </View>
  );
};

export default Login;
