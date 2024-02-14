import { View } from "react-native"
import TopTabs from "../../TopTabs"
import styles from "./Home.style"

function Home(){
    return(
        <View style={styles.container } >
        <TopTabs/>
        </View>
    )
}

export default Home