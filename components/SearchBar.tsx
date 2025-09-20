import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({placeholder, onPress, value, onChangeText} : Props) => {
    return(
        <View
            className="flex-row items-center bg-black rounded-full px-5 py-4"
        >
            <Image
                source={icons.search}
                resizeMode="contain"
                tintColor="#ab8bff"
                className="size-5"
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2 text-white"
            />
        </View>
    )
}

export default SearchBar
