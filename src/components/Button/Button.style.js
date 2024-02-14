import { Dimensions, StyleSheet } from "react-native"

const base_style = StyleSheet.create({
    container:{
        borderRadius:5,
        margin:10,
        marginLeft:15,
        marginRight:15,
        alignItems:"center",
        backgroundColor:"red",
        alignSelf:"center",
        height:38,
        width:Dimensions.get("window").width-38,
        justifyContent:"center",
        
    },
    title:{
        color:"white",
        fontSize:15,
        alignSelf:"center",
        fontWeight:"bold"
    }
})

export default{ 
    primary: StyleSheet.create({
    container:{
        ...base_style.container,
    },
    title:{
        ...base_style.title,
    }
}),
secondary: StyleSheet.create({
    container:{
        ...base_style.container,
        height:28,
        width:Dimensions.get("window").width-80,
        borderRadius:10
    },
    title:{
        ...base_style.title,
    }
})}

