import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import Login from "../screens/Login";
import OpenLoader from "../screens/OpenLoader";
import DetailsPost from "../screens/DetailsPost";
import RegisterForm from "../screens/RegisterForm";
import CreatePost from "../screens/CreatePost";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import SearchUser from "../screens/SearchUser";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const authContext = useContext(AuthContext);

  console.log(authContext, "<<<authContext");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authContext.isSignedIn ? (
          <>
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
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="DetailsPost" component={DetailsPost} options={{title: "Back"}} />
            <Stack.Screen name="CreatePost" component={CreatePost} options={{title: "Back"}} />
            <Stack.Screen name="SearchUser" component={SearchUser}  options={{title: "Back"}}/>
            <Stack.Screen name="Profile" component={Profile} options={{title: "Back"}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
