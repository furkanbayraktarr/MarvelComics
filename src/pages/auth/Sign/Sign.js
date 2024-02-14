import React, {useState,useEffect} from "react";
import { SafeAreaView, View,Text, Image, TouchableOpacity } from "react-native";
import styles from './Sign.style'
import Input from "../../../components/Input";
import {Formik} from 'formik'
import Button from "../../../components/Button";
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";
import auth from '@react-native-firebase/auth'
import database from "@react-native-firebase/database"
import colors from "../../../styles/colors";


function Sign ({navigation}) {
  
  
  const [userNamesList, setUserNamesList] = useState(null)
  const [isSecurePassword, setIsSecurePassword] = useState(true)
  const [isSecureRepeat, setIsSecureRepeat] = useState(true)
  const [loading, setLoading] = useState(false)

  function fetchUserNames(){
    
      try {
            
        database().ref(`userNames`)
        .once('value', snapshot=> {
        const NAME = snapshot.val() || {}
        setUserNamesList(NAME)})
        


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
  }

  useEffect(()=>{fetchUserNames()},[])

const initialFormValues = {
    usermail:"",
    password:"",
    repassword:"",
}


function onSelect(){
  navigation.navigate("LoginPage")
}
async function handleFormSubmit (formValues) {
  const userName = formValues.usermail.split('@')[0]
  setLoading(true)

  if(!formValues.usermail || !formValues.password 
    || !formValues.repassword){
    showMessage(
      {
        message: "Fill in the blank fields",
        type:"danger"
    }
    )
    setLoading(false)
    return
  }
  if(formValues.password !== formValues.repassword){
    showMessage({
      message:"The passwords you entered do not match",
      type:"danger"
    })
    setLoading(false)
    return
  }
  if(userNamesList[userName] ){
    showMessage({
      message:"The username is defined for another user.",
      type:"danger"
    })
    setLoading(false)
    return
  }
    try {
       await auth().createUserWithEmailAndPassword(
            formValues.usermail,
            formValues.password,
        )
      
       database().ref(`userNames/${userName}`).push(userName)
       setLoading(false) 
       showMessage({
          message:"Your registration has been created successfully." ,
          type:"success"
        })
        setLoading(false)

        } catch (error) {
      
      showMessage({
        message:authErrorMessageParser(error.code) ,
        type:"danger"
      })
        console.log(error.code)
        setLoading(false)
    }
}

const handleSelectPasswordKey=()=>{
  return(
    setIsSecurePassword(!isSecurePassword)
  )
}

const handleSelectRepeatKey=()=>{
  return(
    setIsSecureRepeat(!isSecureRepeat)
  )
}

    return(
        <SafeAreaView style={styles.container} >
          <View style={styles.logo_container} >
          <Image style={styles.image} source={require("../../../assets/marvel-logo.png")} />
          </View>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
  {({ values, handleChange, handleSubmit }) => (
    <>
    <View style={styles.inner_container} >
      <Input 
        placeholder="Email"
        placeholderTextColor={colors.darkgray}
        value={values.usermail}
        onType={handleChange("usermail")}
        clear
      />
      <Input 
        placeholder="Password"
        placeholderTextColor={colors.darkgray}
        value={values.password}
        onType={handleChange("password")}
        icon
        iconName="eye"
        isSecure={isSecurePassword}
        onSelect={handleSelectPasswordKey}
      />
      <Input 
        placeholder="Repeat password"
        placeholderTextColor={colors.darkgray}
        value={values.repassword}
        onType={handleChange("repassword")}
        icon
        iconName="eye"
        isSecure={isSecureRepeat}
        onSelect={handleSelectRepeatKey}
      />
      <Button text="Create Account" loading={loading} onPress={handleSubmit} />
      <View style={styles.login_container} >
        <Text style={styles.login_text_1} >Already have an account?</Text>
        <TouchableOpacity onPress={onSelect} >
        <Text style={styles.login_text_2} > Log in</Text>
        </TouchableOpacity>
      </View>
      </View>
    </>
  )}
</Formik>
            
        </SafeAreaView>
)
}

export default Sign