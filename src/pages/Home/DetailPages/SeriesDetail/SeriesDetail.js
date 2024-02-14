import { Image, SafeAreaView, View,ScrollView,Text, FlatList, TouchableOpacity } from "react-native"
import styles from "./SeriesDetail.style"
import {CharactersForSeriesData, ComicsForSeriesData} from "../../../../marvelAPI"
import { useEffect, useState } from "react"
import ItemCard from "../../../../components/Card/ItemCard"
import Button from "../../../../components/Button"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../../../../components/Loading"
import parseContentData from "../../../../utils/parseContentData"
import { showMessage } from "react-native-flash-message"
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"

function SeriesDetail({navigation,route}){

const {item} =  route.params
const userName = auth().currentUser.email.split('@')[0]

const [comics, setComics] = useState([])
const [characters, setCharacters] = useState([])
const [favoritesSeries, setFavoritesSeries] = useState([])
const [loadingForCharacters, setLoadingForCharacters]= useState(true)
const [loadingForComic, setLoadingForComics]= useState(true)

function fetchFavoritesData(){
  
    try {
      database().ref(`users/${userName}/favorites/favoritesSeries`).on(
      "value", snapshot=>{
      const contentData = snapshot.val()
        const parseFavoritesSeriesData = parseContentData(contentData || {})
        setFavoritesSeries(parseFavoritesSeriesData)
      }
    )
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
}
async function fetchItemsData(){

    const comicResults = await ComicsForSeriesData(item.id)
    const characterResults = await CharactersForSeriesData(item.id)
    setComics(comicResults)
    setCharacters(characterResults)
    setLoadingForCharacters(false)
    setLoadingForComics(false)
}  

useEffect(()=>{fetchFavoritesData(),fetchItemsData()}, [])

function goBack(){
    navigation.goBack()
}

function handleComicSelect(item){
  navigation.navigate("ComicDetailPage", {item})
}

function handleCharacterSelect(item){
  navigation.navigate("CharacterDetailPage", {item})
}

function addFavorites(){
  const selectedItem = favoritesSeries?.find((series)=>series.id === item.id)
  if(selectedItem){
    showMessage({
      message: 'This series is already in your favorites!',
      type: 'danger',
    }) 
    return
  }
  else{
  database().ref(`users/${userName}/favorites/favoritesSeries`).push(
    {
      title:item.title,
      image:`${item.thumbnail.path}.${item.thumbnail.extension}`,
      id:item.id,
      description:item.description
    }
  )
  }
}

const renderComics=({item})=> <ItemCard handleSelect={handleComicSelect} theme="thirdly" comics item={item} key={item.id} />
const renderCharacters=({item})=> <ItemCard handleSelect={handleCharacterSelect} theme="secondary" characters item={item} key={item.id} />

    return(
        <SafeAreaView style={styles.container} > 
        <View style={styles.back_container} >
          <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-left" size={20} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.page_header} >Series</Text>
        </View>   
          <ScrollView >
            <View style={styles.scroll_container} >
            <View style={styles.upper_container} >
            {item?.thumbnail ? <Image style={styles.image } 
           source={{uri:`${item.thumbnail.path}.${item.thumbnail.extension}`}} /> :
           <Image style={styles.image } 
           source={{uri:item.image}} />}

           <View style={styles.texts_container} >
           <Text style={styles.comic_title} >{item.title}</Text>
           
           {item?.description && item?.description !== "#N/A" && item?.description !== null && 
           <Text style={styles.description} >{item.description}</Text>}

           <Button text="Add to Favorites" onPress={addFavorites} />
           </View>

           {loadingForComic ? <Loading/> 
           :
           comics[0] &&
            <View>
           <Text style={styles.category_header}>Comics</Text>
           <View style={styles.category_header_seperator} ></View>
            <FlatList
            data={comics}
            renderItem={renderComics}
            showsHorizontalScrollIndicator={false}
            horizontal
            />
            </View>}

            {loadingForCharacters ? <Loading/> 
           :
           characters[0] && 
            <View>
           <Text style={styles.category_header}>Characters</Text>
           <View style={styles.category_header_seperator} ></View>
            <FlatList
            data={characters}
            renderItem={renderCharacters}
            showsHorizontalScrollIndicator={false}
            horizontal
            />
            </View>}
           </View>
           
            </View>
          </ScrollView>
        </SafeAreaView>
    )
}

export default SeriesDetail