import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import Login from "../screens/Login";
import OpenLoader from "../screens/OpenLoader";
import DetailsProfile from "../screens/DetailsProfile";
import DetailsPost from "../screens/DetailsPost";
import RegisterForm from "../screens/RegisterForm";
import CreatePost from "../screens/CreatePost";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OpenLoader"
        component={OpenLoader}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterForm"
        component={RegisterForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DetailsProfile" component={DetailsProfile} />
      <Stack.Screen name="DetailsPost" component={DetailsPost} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
}
