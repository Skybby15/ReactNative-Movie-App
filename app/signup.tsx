import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type SignupFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  repeat_password: string;
};

const Signup = () => {
  const { signup } = useAuth()!;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      repeat_password: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.repeat_password) {
      alert("Passwords do not match");
      return;
    }
    try {
      await signup(data); // calls AuthContext.signup
    } catch (error) {
      const message = (error as Error).message;
      Toast.show({
        type: "error",
        text1: "Signup failed!",
        text2: message,
      });
    }
  };

  return (
    <View className="flex-1 bg-black">
      <Image source={images.bg} className="absolute w-full z-0 top-0" />
      <SafeAreaView className="items-center h-full">
        <Image source={icons.logo} className="w-12 h-10 mb-5" />
        <Text className="text-white text-4xl font-bold mt-10 mb-6">
          Sign Up
        </Text>
        <Text className="text-gray-600 text-sm mb-9">
          Enter your credentials to register now
        </Text>

        <View className="w-full items-center">
          {/* First + Last Name */}
          <View className="flex-row gap-14 mt-10 mb-7">
            <View className="flex-col">
              <Text className="text-white text-sm ml-3">First Name:</Text>
              <Controller
                control={control}
                name="first_name"
                rules={{ required: "First name is required" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="w-40 border border-white rounded-lg text-white px-2"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.first_name && (
                <Text className="text-red-500 text-xs ml-3">
                  {errors.first_name.message}
                </Text>
              )}
            </View>

            <View className="flex-col">
              <Text className="text-white text-sm ml-3">Last Name:</Text>
              <Controller
                control={control}
                name="last_name"
                rules={{ required: "Last name is required" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="w-40 border border-white rounded-lg text-white px-2"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.last_name && (
                <Text className="text-red-500 text-xs ml-3">
                  {errors.last_name.message}
                </Text>
              )}
            </View>
          </View>

          {/* Email + Passwords */}
          <View className="gap-5 items-center mb-10">
            <View>
              <Text className="text-white text-sm ml-3">Email:</Text>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="w-[23.8rem] border border-white rounded-lg text-white px-2"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500 text-xs ml-3">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-white text-sm ml-3">Password:</Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="w-[23.8rem] border border-white rounded-lg text-white px-2"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500 text-xs ml-3">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-white text-sm ml-3">
                Repeat password:
              </Text>
              <Controller
                control={control}
                name="repeat_password"
                rules={{ required: "Please repeat password" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="w-[23.8rem] border border-white rounded-lg text-white px-2"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              {errors.repeat_password && (
                <Text className="text-red-500 text-xs ml-3">
                  {errors.repeat_password.message}
                </Text>
              )}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-white w-28 h-11 rounded-2xl items-center justify-center"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-black text-lg">Signup</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute bottom-safe-or-14 right-14 border border-white w-28 h-11 rounded-2xl items-center justify-center"
        >
          <Text className="text-white text-lg">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Signup;
