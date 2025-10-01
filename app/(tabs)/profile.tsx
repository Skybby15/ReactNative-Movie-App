import { icons } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
    const { logout } = useAuth()!;

    const handleLogout = async () => {
        logout();
    }

    return(
        <View
            className="bg-black flex-1 px-10"
        >
            <View
                className="flex justify-center items-center flex-1 flex-col gap-5"
            >
                <Image source={icons.person}
                    className="size-10"
                    tintColor="#fff"
                />
                <Text
                    className="text-gray-500"
                >
                    Profile
                </Text>
                <TouchableOpacity
                    onPress={handleLogout}
                    className="bg-[#0f0D23] w-28 h-11 rounded-2xl items-center justify-center mt-7"
                >
                    <Text className="text-white text-lg">Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile
