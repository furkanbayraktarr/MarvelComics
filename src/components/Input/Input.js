import React, { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from './Input.style'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


function Input({placeholder,multiline,onType,isSecure,autoFocus,
  placeholderTextColor,theme="primary",iconName,icon, onSelect}){

    return(
        <SafeAreaView style={styles[theme].outer_container}>
            <TextInput
            style={styles[theme].container}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={isSecure}
            onChangeText={onType}
            autoFocus={autoFocus}
            multiline={multiline}
            />
            {icon && <View style={styles[theme].icon_container} >
              <TouchableOpacity onPressIn={onSelect}  onPressOut={onSelect} >
              <Icon name={iconName} size={20} color="gray" />
              </TouchableOpacity>
            </View>}
            </SafeAreaView>
    )
}

export default Input