import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export default StyleSheet.create({
    container:{
        justifyContent:"space-between",
        flex:1,
        backgroundColor:"black"
    },
    header:{
        color:"white",
        fontSize:60,
        fontWeight:"bold",
        alignItems:"center"

    },
    inner_container:{
        marginVertical:5,
        marginBottom:100
        
    },
    logo_container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    image:{
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height/2
    },
    login_text_1:{
        color:colors.darkgray,
        fontSize:15
    },
    login_text_2:{
        color:"red",
        fontSize:15,
        fontWeight:"bold"
    },
    login_container:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:5
    }
})