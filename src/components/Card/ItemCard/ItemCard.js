import React from "react"
import styles from "./ItemCard.style"
import { Image,Text, TouchableOpacity, View } from "react-native"

const ItemCard = ({item,characters,creators,comics,series,comicsandSeriesPage,inProfile, theme="primary", handleSelect}) => {

function onSelect(){
  handleSelect(item)
}

    return (
      
      <TouchableOpacity onPress={(characters || comics || series || comicsandSeriesPage ) && onSelect} >
        <View style={styles[theme].container}>
          {!inProfile && <Image
            style={styles[theme].image}
            source={{uri: `${item.thumbnail?.path}.${item.thumbnail?.extension}`}}
          />}
          {inProfile && <Image
            style={styles[theme].image}
            source={{uri:item.image }}
          />}
          {characters && <Text style={styles[theme].title}>{item.name}</Text>}
          {creators && <Text style={styles[theme].title}>{item.fullName}</Text>}
          {(comics || series || comicsandSeriesPage ) && <Text style={styles[theme].title}>{item.title}</Text>}
          
        </View>
        
       </TouchableOpacity>
    )
}

export default ItemCard