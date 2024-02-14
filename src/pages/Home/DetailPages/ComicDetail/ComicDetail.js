import { Image, SafeAreaView, View,ScrollView,Text, FlatList, TouchableOpacity } from "react-native"
import styles from "./ComicDetail.style"
import { CharactersForComicData , CreatorsForComicData} from "../../../../marvelAPI"
import { useEffect, useState } from "react"
import ItemCard from "../../../../components/Card/ItemCard"
import Button from "../../../../components/Button"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../../../../components/Loading"
import parseContentData from "../../../../utils/parseContentData"
import { showMessage } from "react-native-flash-message"
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"

function ComisDetail({navigation,route}){

const {item} =  route.params
const userName = auth().currentUser.email.split('@')[0]

const [characters, setCharacters] = useState([])
const [creators, setCreators] = useState([])
const [favoritesComics, setFavoritesComics] = useState(null)
const [loadingForCharacters, setLoadingForCharacters]= useState(true)
const [loadingForCreators, setLoadingForCreators]= useState(true)

function fetchFavoritesData(){
  
    try {
      database().ref(`users/${userName}/favorites/favoritesComics`).on(
      "value", snapshot=>{
      const contentData = snapshot.val()
        const parseFavoritesComicData = parseContentData(contentData || {})
        setFavoritesComics(parseFavoritesComicData)
      }
    )
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
async function fetchItemsData(){
  const charactersResult = await CharactersForComicData(item.id)
  const creatorsResult = await CreatorsForComicData(item.id)
  setCharacters(charactersResult)
  setCreators(creatorsResult)
  setLoadingForCharacters(false)
  setLoadingForCreators(false)
}  

useEffect(()=>{fetchFavoritesData(), fetchItemsData()}, [])

function goBack(){
    navigation.goBack()
}

function handleCharacterSelect(item){
  navigation.navigate("CharacterDetailPage", {item})
}

function addFavorites(){
  const selectedItem = favoritesComics?.find(comic=>comic.id === item.id)
  if(selectedItem){
    showMessage({
      message: 'This comic is already in your favorites!',
      type: 'danger',
    }) 
    return
  }
  else{
  database().ref(`users/${userName}/favorites/favoritesComics`).push(
    {
      title:item.title,
      image:`${item.thumbnail.path}.${item.thumbnail.extension}`,
      id:item.id,
      description:item.description
    }
  )
  }
}

const renderCharacters=({item})=> <ItemCard handleSelect={handleCharacterSelect} theme="secondary" characters item={item} key={item.id} />
const renderCreators=({item})=> <ItemCard theme="secondary" creators item={item} key={item.id} />

    return(
        <SafeAreaView style={styles.container} > 
        <View style={styles.back_container} >
          <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-left" size={20} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.page_header} >Comic</Text>
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
           </View>

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

            {loadingForCreators ? <Loading/> 
            :
            creators[0] && 
            <View>
            <Text style={styles.category_header}>Creators</Text>
            <View style={styles.category_header_seperator} ></View>
            
            <FlatList
            data={creators}
            renderItem={renderCreators}
            showsHorizontalScrollIndicator={false}
            horizontal
            />
            </View>}
            </View>
          </ScrollView>
        </SafeAreaView>
    )
}

export default ComisDetail