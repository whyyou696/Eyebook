import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./components/MainStack";
import { ApolloProvider } from "@apollo/client";import apolloClient from "./config/apolloClient";
import AuthProvider from "./context/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <MainStack/>
        </AuthProvider>
    </ApolloProvider>
  );
}
