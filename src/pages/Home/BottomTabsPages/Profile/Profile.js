import React,{useState,useEffect} from "react"
import { SafeAreaView, Alert,Text, View , ScrollView,TouchableWithoutFeedback,
TouchableOpacity, Image} from "react-native"
import database from "@react-native-firebase/database"
import styles from "./Profile.style"
import auth from "@react-native-firebase/auth"
import Swipeout from "react-native-swipeout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ProfileModal from "../../../../components/ProfileModal"
import ItemCard from "../../../../components/Card/ItemCard"
import parseContentData from "../../../../utils/parseContentData"

function Profile({navigation}){
    
  const userName = auth().currentUser.email.split('@')[0]
  
  const [visibleState, setVisibleState] = useState(false)
  const [favoritesComics, setFavoritesComics] = useState([])
  const [favoritesCharacters, setFavoritesCharacters] = useState([])
  const [favoritesSeries, setFavoritesSeries] = useState([])
  const [photo, setPhoto] = useState(null)
  const [pageView, setPageView] = useState("favoritesComics")
    
    const fetchData = async () => {

        try {
            
          database().ref(`users/${userName}`).on(
            "value", snapshot=>{
            const contentData = snapshot.val()
            
              const favoritesComics = contentData?.favorites?.favoritesComics || {}
              const favoritesCharacters = contentData?.favorites?.favoritesCharacters || {}
              const favoritesSeries = contentData?.favorites?.favoritesSeries || {}
              const photo = contentData?.photo || {}
              const parseFavoritesComicData = parseContentData(favoritesComics || {})
              const parseFavoritesCharacterData = parseContentData(favoritesCharacters || {})
              const parseFavoritesSeriesData = parseContentData(favoritesSeries || {})
              setFavoritesComics(parseFavoritesComicData)
              setFavoritesCharacters(parseFavoritesCharacterData)
              setFavoritesSeries(parseFavoritesSeriesData)
              setPhoto(photo)
            
            }
          )
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }

    useEffect(()=>{fetchData()},[])
          
          function selectComics(){
            setPageView("favoritesComics")
          }
          function selectCharacters(){
            setPageView("favoritesCharacters")
          }

          function selectSeries(){
            setPageView("favoritesSeries")
          }

          
        const handleDeleteComic = (item) => {
          return(
            database().ref(`users/${userName}/favorites/favoritesComics/${item.item_id}`).remove()
          )
        }
        const handleDeleteCharacter = (item) => {
          return(
            database().ref(`users/${userName}/favorites/favoritesCharacters/${item.item_id}`).remove()
          )
        }
        const handleDeleteSeries = (item) => {
          return(
            database().ref(`users/${userName}/favorites/favoritesSeries/${item.item_id}`).remove()
          )
        }
  
        function handleInputToggle(){
          return(
            setVisibleState(!visibleState)
            )
        }

        const deleteProfilePhoto =()=>{

          Alert.alert(
            "Remove existing photo?",
            "",
            [
              {
                text:"Cancel", 
                style:"cancel"
              },
            {
              text:"Remove", 
              onPress: ()=> database().ref(`users/${userName}/photo`).remove()
            }
            ]
          )
        }

        const logout =()=>{

          Alert.alert(
            "Are you sure to sign out?",
            "",
            [
              {
                text:"Cancel", 
                style:"cancel"
              },
            {
              text:"Sign Out", 
              onPress: ()=> auth().signOut()
            }
            ]
          )
        }

        function handleSelectComic(item){
          return(
            navigation.navigate("ComicDetailPage",{item})
        )}
        function handleSelectCharacter(item){
          return(
            navigation.navigate("CharacterDetailPage",{item})
        )}
        function handleSelectSeries(item){
          return(
            navigation.navigate("SeriesDetailPage",{item})
        )}

        return(
            
          <SafeAreaView style={styles.container}>
            
          <ScrollView >
            <View style={styles.scroll_view} >
            {pageView === "favoritesComics" && (
              <View>
              <View style={styles.upper_container} >
                <View style={styles.profile_container} >
                <TouchableOpacity onPress={handleInputToggle} >
                {photo?.photo ? (
                <Image style={styles.profile_photo} source={{uri:photo?.photo}} />) :
                (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
                 }
                 </TouchableOpacity>
                <Text style={styles.name}>{userName}</Text>
                </View>
                <View style={styles.logout} >
                <Icon name="logout" size={30} color="white" onPress={logout} />
                </View>
              </View>
            <View>
              <View style={styles.upper_tab_container} >
                <TouchableWithoutFeedback onPress={selectComics}  >
                  <View style={styles.selected_touch}>
              <Text style={styles.selected_text} >Favorite Comics</Text>
              </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={selectCharacters}   >
              <Text style={styles.unselected_text} >Favorite Characters</Text>
              </TouchableWithoutFeedback>
              
              <TouchableWithoutFeedback onPress={selectSeries} >
              <Text style={styles.unselected_text} >Favorites Series</Text>
              </TouchableWithoutFeedback>
              </View>
            </View>
            {favoritesComics.map(item => <Swipeout
            key={item.id}
      right={[
        {
          text: "Sil",
          backgroundColor: "red",
          onPress: () => handleDeleteComic(item)
        },
      ]}
      autoClose={true} style={styles.swipeout} >
      <ItemCard comics inProfile key={item.id} item={item} theme="fifth" handleSelect={handleSelectComic}/>
      </Swipeout>)}
            </View>)}
        
           {pageView === "favoritesCharacters" && (
            <View>
            <View style={styles.upper_container} >
            <View style={styles.profile_container} >
            <TouchableOpacity onPress={handleInputToggle} >
                {photo?.photo ? (
                <Image style={styles.profile_photo} source={{uri:photo?.photo}} />) :
                (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
                 }
                 </TouchableOpacity>
                <Text style={styles.name}>{userName}</Text>
                </View>
                <View style={styles.logout} >
                <Icon name="logout" size={30} color="white" onPress={logout} />
                </View>
              </View>
            <View>
              <View style={styles.upper_tab_container} >
              <TouchableWithoutFeedback onPress={selectComics}   >
              <Text style={styles.unselected_text} >Favorite Comics</Text>
              </TouchableWithoutFeedback>

             <TouchableWithoutFeedback onPress={selectCharacters}  >
              <View style={styles.selected_touch}>
              <Text style={styles.selected_text} >Favorite Characters</Text>
              </View>
              </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback onPress={selectSeries}   >
              <Text style={styles.unselected_text} >Favorites Series</Text>
              </TouchableWithoutFeedback>
              
              </View>
            </View>
            {favoritesCharacters.map(item => <Swipeout
            key={item.id} 
      right={[
        {
          text: "Sil",
          backgroundColor: "red",
          onPress: () => handleDeleteCharacter(item)
        },
      ]}
      autoClose={true} style={styles.swipeout} >
      <ItemCard characters inProfile key={item.id} item={item} theme="fifth" handleSelect={handleSelectCharacter}/>
      </Swipeout>)}
            </View>) }

            {pageView === "favoritesSeries" && (
            <View>
            <View style={styles.upper_container} >
            <View style={styles.profile_container} >
            <TouchableOpacity onPress={handleInputToggle} >
                {photo?.photo ? (
                <Image style={styles.profile_photo} source={{uri:photo?.photo}} />) :
                (<Image style={styles.profile_photo} source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} />)
                 }
                 </TouchableOpacity>
                <Text style={styles.name}>{userName}</Text>
                </View>
                <View style={styles.logout} >
                <Icon name="logout" size={30} color="white" onPress={logout} />
                </View>
              </View>
            <View>
              <View style={styles.upper_tab_container} >
              <TouchableWithoutFeedback onPress={selectComics}   >
              <Text style={styles.unselected_text} >Favorite Comics</Text>
              </TouchableWithoutFeedback>
              
              <TouchableWithoutFeedback onPress={selectCharacters}   >
              <Text style={styles.unselected_text} >Favorite Characters</Text>
              </TouchableWithoutFeedback>
              
              <TouchableWithoutFeedback onPress={selectSeries}  >
              <View style={styles.selected_touch}>
              <Text style={styles.selected_text} >Favorites Series</Text>
              </View>
              </TouchableWithoutFeedback>
              </View>
            </View>
            {favoritesSeries.map(item => <Swipeout
            key={item.id} 
      right={[
        {
          text: "Sil",
          backgroundColor: "red",
          onPress: () => handleDeleteSeries(item)
        },
      ]}
      autoClose={true} style={styles.swipeout} >
      <ItemCard inProfile series key={item.id} item={item} theme="fifth" handleSelect={handleSelectSeries}/>
      </Swipeout>)}
            </View>) }
              </View>
           </ScrollView>
           <ProfileModal
           visible={visibleState}
           onClose={handleInputToggle}
           deleteProfilePhoto={deleteProfilePhoto}
           />
           
      </SafeAreaView>)

    }

export default Profile