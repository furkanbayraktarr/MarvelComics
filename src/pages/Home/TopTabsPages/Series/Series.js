import { useEffect, useState } from "react"
import {SeriesData} from "../../../../marvelAPI"
import { SafeAreaView, ScrollView,View,TouchableOpacity,Text } from "react-native"
import Loading from "../../../../components/Loading"
import styles from "./Series.style"
import ItemCard from "../../../../components/Card/ItemCard"
import colors from "../../../../styles/colors"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Series({navigation}){

const [series, setSeries] = useState([])
const [loading,setLoading] = useState(true)

const fetchData = async () => {
    const result = await SeriesData()
    setSeries(result)
    setLoading(false)
}

useEffect(()=>{fetchData()},[])

const onSelectSearch=()=>{
    navigation.navigate("SeriesSearchPage", {itemList:series})
}

function handleSeriesSelect (item) {
    return(
    navigation.navigate("SeriesDetailPage", {item})
    )
}

return(
    loading ? <Loading/> 
    :  <SafeAreaView style={styles.container} >
        <TouchableOpacity style={styles.search} onPress={onSelectSearch}>
        <Icon name="magnify" size={20} color={colors.darkgray} />
        <Text style={styles.search_text} >Search for series</Text>
      </TouchableOpacity>
        <View style={styles.container} >
    <ScrollView style={styles.scroll} >
        <View style={styles.inner_container} >
       {series?.map(item=> <ItemCard comicsandSeriesPage theme="fourthly" 
       handleSelect={handleSeriesSelect} item={item} key={item.id} />  )}
       </View>
    </ScrollView>
    </View>
    </SafeAreaView>
)

}

export default Series