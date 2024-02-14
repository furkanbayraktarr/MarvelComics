import { useEffect, useState } from "react"
import {CharactersData} from "../../../../marvelAPI"
import { SafeAreaView, ScrollView ,View,TouchableOpacity,Text} from "react-native"
import Loading from "../../../../components/Loading"
import ItemCard from "../../../../components/Card/ItemCard"
import styles from "./Characters.style"
import colors from "../../../../styles/colors"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Characters({navigation}){

const [characters, setCharacters] = useState([])
const [loading,setLoading] = useState(true)

const fetchData = async () => {
    const result = await CharactersData()
    setCharacters(result)
    setLoading(false)
}

useEffect(()=>{fetchData()},[])

function handleCharacterSelect(item){
    navigation.navigate("CharacterDetailPage", {item})
}

const onSelectSearch=()=>{
    navigation.navigate("CharacterSearchPage", {itemList:characters})
}

return(
    loading ? <Loading/> 
    :
    <SafeAreaView style={styles.container} >
        <TouchableOpacity style={styles.search} onPress={onSelectSearch}>
        <Icon name="magnify" size={20} color={colors.darkgray} />
        <Text style={styles.search_text} >Search for characters</Text>
      </TouchableOpacity>
    <View style={styles.container}>
    <ScrollView>
    <View style={styles.inner_container} >
       {characters?.map(item=> <ItemCard handleSelect={handleCharacterSelect} 
       characters item={item} key={item.id} />)}
    </View>
    </ScrollView>
    </View>
    </SafeAreaView>
)

}

export default Characters