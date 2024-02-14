import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Comics from '../TopTabsPages/Comics'
import Characters from '../TopTabsPages/Characters'
import Series from '../TopTabsPages/Series'

const Tab = createMaterialTopTabNavigator()

function TopTabs(){
    return(
    <Tab.Navigator screenOptions={{
        tabBarStyle:{backgroundColor:"red", },
        tabBarLabelStyle:{color:"black",fontSize:12, fontWeight:"bold"},
        tabBarIndicatorStyle:{backgroundColor:"black"}
    }} >
        <Tab.Screen name="Comics" component={Comics}  />
        <Tab.Screen name="Characters" component={Characters}  />
        <Tab.Screen name="Series" component={Series}  />
    </Tab.Navigator>
    )
}

export default TopTabs