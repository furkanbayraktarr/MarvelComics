import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import Login from "./pages/auth/Login";
import Sign from "./pages/auth/Sign";
import colors from "./styles/colors";
import auth from "@react-native-firebase/auth"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ComicDetail from "./pages/Home/DetailPages/ComicDetail";
import CharacterDetail from "./pages/Home/DetailPages/CharacterDetail";
import SeriesDetail from "./pages/Home/DetailPages/SeriesDetail";
import Home from "./pages/Home/BottomTabsPages/Home";
import Profile from "./pages/Home/BottomTabsPages/Profile"
import ComicSearch from "./pages/Home/SearchPages/ComicSearch";
import SeriesSearch from "./pages/Home/SearchPages/SeriesSearch";
import CharacterSearch from "./pages/Home/SearchPages/CharacterSearch";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Router =()=>{

const [userSession, setUserSession] = useState()

useEffect(() => {auth().onAuthStateChanged((user) => 
    {setUserSession(!!user)} )} , [])


const AuthStack =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="SignPage" component={Sign} options={{headerShown:false}}/>
            
        </Stack.Navigator>
    )
}

const HomeStack=()=>{
    return(
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="ComicDetailPage" component={ComicDetail} 
            options={{headerShown:false}}/>
        <Stack.Screen name="CharacterDetailPage" component={CharacterDetail} 
            options={{headerShown:false}}/>
        <Stack.Screen name="SeriesDetailPage" component={SeriesDetail} 
            options={{headerShown:false}}/>
        <Stack.Screen name="ComicSearchPage" component={ComicSearch} 
            options={{headerShown:false}}/>
        <Stack.Screen name="CharacterSearchPage" component={CharacterSearch} 
            options={{headerShown:false}}/>
        <Stack.Screen name="SeriesSearchPage" component={SeriesSearch} 
            options={{headerShown:false}}/>
    </Stack.Navigator>
    )
}

const ProfileStack=()=>{
    return(
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="ComicDetailPage" component={ComicDetail} 
            options={{headerShown:false}}/>
        <Stack.Screen name="CharacterDetailPage" component={CharacterDetail} 
            options={{headerShown:false}}/>
        <Stack.Screen name="SeriesDetailPage" component={SeriesDetail} 
            options={{headerShown:false}}/>
    </Stack.Navigator>
    )
}

const TabStack =()=>{
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor:"black",
        },
        tabBarShowLabel: false
          }}>
            <Tab.Screen name="HomePage" component={HomeStack} options=
            {{headerShown:false,
                tabBarIcon: ({focused ,size }) => {
                    const iconColor = focused ? 'red' : colors.darkgray
                    return <Icon name={'home'}
                     size={size} color={iconColor} />}
                     }} />
            <Tab.Screen name="ProfilePage" component={ProfileStack} options=
            {{headerShown:false,
                tabBarIcon: ({focused ,size }) => {
                    const iconColor = focused ? 'red' : colors.darkgray
                    return <Icon name={'account'}
                     size={size} color={iconColor} />}
                     }} />          
            
        </Tab.Navigator>
    )
}

    return(
        <NavigationContainer>
            <Stack.Navigator>
        {!userSession ? (<Stack.Screen name="AuthStack" component={AuthStack}
             options={{headerShown:false}}/>):
        (<Stack.Screen name="TabStack" component={TabStack} 
            options={{headerShown:false}}/> )}
            
            </Stack.Navigator>
            <FlashMessage position="top" />
        </NavigationContainer>
    )
}
export default Router