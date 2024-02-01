
import { Button, Text, View } from "react-native";
import Card from "../components/Card";

export default function HomeScreen({ navigation }) {
    const data = [1, 2, 3, 4]
    
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        /> */}
        {data.map (el => <Card key={el} data={el}/>) }
      </View>
    );
  }