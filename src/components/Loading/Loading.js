import { ActivityIndicator, View } from "react-native";
import styles from "./Loading.style"

function Loading() {
    return(
        <View style={styles.container} >
            <ActivityIndicator  color="red" size={50} />
        </View>
    )
}

export default Loading