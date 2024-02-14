import { useEffect, useState } from "react"
import {ComicsData} from "../../../../marvelAPI"
import { SafeAreaView, ScrollView, TouchableOpacity, Text, View } from "react-native"
import Loading from "../../../../components/Loading"
import styles from "./Comics.style"
import ItemCard from "../../../../components/Card/ItemCard"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors"

function Comics({navigation}){

const [comics, setComics] = useState([])
const [loading,setLoading] = useState(true)

const fetchData = async () => {
    const result = await ComicsData()
    setComics(result)
    setLoading(false)
}

useEffect(()=>{fetchData()},[])


const onSelectSearch=()=>{
    navigation.navigate("ComicSearchPage", {itemList:comics})
}


function handleSelectComic (item) {
    return(
    navigation.navigate("ComicDetailPage", {item})
    )
}

return(
    loading ? <Loading/> 
    :
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.search} onPress={onSelectSearch}>
        <Icon name="magnify" size={20} color={colors.darkgray} />
        <Text style={styles.search_text} >Search for comics</Text>
      </TouchableOpacity>
    <View style={styles.container} >
    <ScrollView >
    <View style={styles.inner_container}>
       {comics?.map(item=> <ItemCard comicsandSeriesPage theme="fourthly" item={item} key={item.id}
        handleSelect={handleSelectComic} />  )}
    </View>
    </ScrollView>
    </View>
    </SafeAreaView>
)

}

export default Comics