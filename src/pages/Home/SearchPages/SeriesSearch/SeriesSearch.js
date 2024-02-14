import { SafeAreaView,TouchableOpacity,ScrollView,View } from "react-native"
import Input from "../../../../components/Input"
import ItemCard from "../../../../components/Card/ItemCard"
import styles from "./SeriesSearch.style"
import colors from "../../../../styles/colors"
import { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

function SeriesSearch({route,navigation}){

    const itemList = route.params.itemList
    const [searchedList, setSearchedList] = useState([])

    useEffect(()=>{console.log("items:",itemList)},[])

    const handleSearch=(text)=>{
        if(text){
        const filteredList = itemList.filter((item)=>{
          const currentTitle = item.title?.toLowerCase()
          const searchedText = text.toLowerCase()
          return(
            currentTitle.indexOf(searchedText)>-1
          )})
          setSearchedList(filteredList) }
        if(!text){
            return setSearchedList([])
        }
    }

    function handleSelectSeries (item) {
        return(
        navigation.navigate("SeriesDetailPage", {item})
        )
    }

    function goBack(){
        navigation.goBack()
    }

    return(
        <SafeAreaView style={styles.container} >
            <View style={styles.search_back_container} >
            <TouchableOpacity style={styles.back_container} onPress={goBack}>
          <Icon name="arrow-left" size={20} color={"white"} />
          </TouchableOpacity>
          <Input placeholder="Search for series" theme="alternative" autoFocus 
          onType={handleSearch} placeholderTextColor={colors.darkgray} multiline />
          </View>
          <View style={styles.container}>
          <ScrollView >
          <View style={styles.inner_container} >
        {searchedList.map(item => <ItemCard comicsandSeriesPage theme="fourthly"
        item={item} key={item.id} handleSelect={handleSelectSeries} />)}
        </View>
        </ScrollView>
        </View>
        </SafeAreaView>
    )

}

export default SeriesSearch