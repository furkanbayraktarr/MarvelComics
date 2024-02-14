import { SafeAreaView,TouchableOpacity,ScrollView,View } from "react-native"
import Input from "../../../../components/Input"
import ItemCard from "../../../../components/Card/ItemCard"
import styles from "./ComicSearch.style"
import colors from "../../../../styles/colors"
import { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

function ComicSearch({route,navigation}){

    const itemList = route.params.itemList
    const [searchedList, setSearchedList] = useState([])

    useEffect(()=>{console.log("items:",itemList)},[])

    const handleSearch=(text)=>{
        if(text){
        const filteredList = itemList.filter((item)=>{
          const currentTitle = item.name?.toLowerCase() || item.title?.toLowerCase()
          const searchedText = text.toLowerCase()
          return(
            currentTitle.indexOf(searchedText)>-1
          )})
          setSearchedList(filteredList) }
        if(!text){
            return setSearchedList([])
        }
    }

    function handleSelectComic (item) {
        return(
        navigation.navigate("ComicDetailPage", {item})
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
          <Input placeholder="Search for comics" theme="alternative" autoFocus onType={handleSearch}
          placeholderTextColor={colors.darkgray} multiline />
          </View>
          
          <View style={styles.container}>
          <ScrollView style={styles.scroll} >
          <View style={styles.inner_container}>
        {searchedList.map(item => <ItemCard comicsandSeriesPage theme="fourthly" item={item} key={item.id}
        handleSelect={handleSelectComic} />)}
        </View>
        </ScrollView>
        </View>
        </SafeAreaView>
    )

}

export default ComicSearch