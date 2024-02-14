import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export default StyleSheet.create({
    container:{
        backgroundColor:"black",
        flex:1,
    },
    inner_container:{
        marginBottom:40,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-evenly"
    },
    back_container:{
        margin:5,
        marginBottom:5,
        flexDirection:"row",
        width:20,
    },
    back_text:{
        color:"white",
        marginLeft:5
    },
    search_back_container:{
        flexDirection:"row",
        alignItems:"center",
        borderBottomWidth:0.5,
        borderColor:colors.darkgray,
        padding:5
    }
})