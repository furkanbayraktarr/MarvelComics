import { Dimensions, StyleSheet } from "react-native";

const deviceSize = Dimensions.get("window")

const base_style = StyleSheet.create({
    container:{
        alignItems: 'center',
        margin:10,
        padding:5,
    },
    image: {
      width: deviceSize.width/2.5,
      height:150,
      borderRadius:10,
    },
    title: {
      fontSize:15,
      fontWeight: 'bold',
      color: 'white',
      width: deviceSize.width/3,
      textAlign:"center",
      marginTop:2
    }
  }
)

export default {
primary: StyleSheet.create({
      ...base_style
}),
secondary:  StyleSheet.create({
      container:{
        ...base_style.container
      },
      image:{
        ...base_style.image,
        width:deviceSize.width/3,
        height:120
      },
      title:{
        ...base_style.title,
        width:deviceSize.width/3.5
      }
}),
thirdly: StyleSheet.create({
      container:{
        ...base_style.container
      },
      image:{
        width: 115,
        height: 135,
        borderRadius: 5,
        resizeMode:"stretch"
      },
      title:{
        fontSize:12,
        fontWeight: 'bold',
        color: 'white',
        width: deviceSize.width/4,
        textAlign:"center",
        marginTop:2
      }
})   ,
fourthly: StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'white',
    marginLeft:15,
    marginRight:15,
  },
  image: {
    width: 105,
    height: 135,
    borderRadius: 5,
    marginRight:10,
    marginTop:15,
    marginBottom:15,
    resizeMode:"stretch"
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    width:250
  }
}),
fifth: StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:15,
  },
  image: {
    width: 90,
    height: 110,
    marginRight:10,
    resizeMode:"stretch"
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    width:250
  }
}) 
}