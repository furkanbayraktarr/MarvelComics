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
    search:{
        flexDirection:"row",
        padding:10,
        borderRadius:10,
        margin:20,
        marginBottom:10,
        backgroundColor:"black",
        borderWidth:1,
        borderColor:colors.darkgray
    },
    search_text:{
        marginLeft:10,
        color:colors.darkgray
    }
})