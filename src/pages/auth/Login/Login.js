import React, { useState } from "react"
import { SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import styles from './Login.style'
import { Formik} from 'formik'
import auth from '@react-native-firebase/auth'
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser"
import colors from "../../../styles/colors"


function Login ({navigation}) {

const [loading, setLoading] = useState(false)
const [isSecure, setIsSecure] = useState(true)

function onSelect(){
    navigation.navigate("SignPage")
}

const initialFormValues={
    usermail:"",
    password:""
}

async function handleFormSubmit (formValues) {
  
  try {
    setLoading(true)
    if(!formValues.usermail || !formValues.password ){
    showMessage(
      {
        message: "Fill in the blank fields",
        type:"danger"
    }
    )
    setLoading(false)
    return
  }
  await auth().signInWithEmailAndPassword(
    formValues.usermail,
     formValues.password
  )
    setLoading(false)

    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code) ,
        type:"danger"
      })
      setLoading(false)
        
    }
}

const handleSelectKey=()=>{
  return(
    setIsSecure(!isSecure)
  )
}

    return(
        <SafeAreaView style={styles.container} >
          <View style={styles.logo_container} >
          <Image style={styles.image} source={require('../../../assets/marvel-logo.png')} />
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
      />
      <Input 
        placeholder="Password"
        placeholderTextColor={colors.darkgray}
        value={values.password}
        onType={handleChange("password")}
        icon
        iconName="eye"
        isSecure={isSecure}
        onSelect={handleSelectKey}
      />
      <Button text="Log In" onPress={handleSubmit} loading={loading}/>
      <View style={styles.createAccount_container} >
        <Text style={styles.createAccount_text_1} >Don't have an account?</Text>
        <TouchableOpacity onPress={onSelect} >
        <Text style={styles.createAccount_text_2} > Create Account</Text>
        </TouchableOpacity>
      </View>
      </View>
    </>
  )}
</Formik>
            
        </SafeAreaView>
    )
}
export default Login