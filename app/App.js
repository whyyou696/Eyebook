import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import OpenLoader from "./screens/OpenLoader";
import DetailsProfile from "./screens/DetailsProfile";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from "react-native";
import DetailsPost from "./screens/DetailsPost";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(){
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'DetailsProfile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: ({ focused, color }) => {
        let label;

        if (route.name === 'HomeTab') {
          label = 'Homes';
        } else if (route.name === 'DetailsProfile') {
          label = 'Profile';
        }

        return <Text style={{ color: color }}>{label}</Text>;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#007bff',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} />
    <Tab.Screen name="DetailsProfile" component={DetailsProfile} />
  </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>  
        <Stack.Screen name="OpenLoader" component={OpenLoader} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="DetailsProfile" component={DetailsProfile} />
        <Stack.Screen name="DetailsPost" component={DetailsPost} />
      </Stack.Navigator>
      </NavigationContainer>
  );
}
