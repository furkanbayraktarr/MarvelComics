import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
    },
    image:{
        height:Dimensions.get("window").height/2.5,
        resizeMode:"contain"
    },
    category_header:{
        fontSize:20,
        color:"white",
        marginLeft:20,
        fontWeight:"bold",
        alignSelf:"center",
    },
    category_header_seperator:{
        borderBottomWidth:1,
        borderColor:"white",
        marginTop:10,
        width:Dimensions.get("window").width-40,
        alignSelf:"center"
    },
    back_container:{
        margin:10,
        marginBottom:20,
        flexDirection:"row",
    },
    page_header:{
        color:"white",
        marginLeft:30,
        fontWeight:"bold",
        fontSize:15
    },
    upper_container:{
        margintop:10
    },
    character_name:{
        fontSize:18,
        fontWeight:"bold",
        color:"white",
        padding:10,
        marginLeft:10,
        marginRight:10,
        textAlign:"center"
    },
    description:{
        fontSize:15,
        color:colors.darkgray,
        padding:10,
        marginLeft:10,
        marginRight:10,
        textAlign:"center",
        marginTop:5
    },
    scroll_container:{
        marginBottom:20
    },
    texts_container:{
        marginBottom:20
    }
})