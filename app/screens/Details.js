import { Button, Text, View } from "react-native";

export default function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Details')}
        />
         <Button
          title="Go Back"
          onPress={() => navigation.goBack('Home')}
        />
      </View>
    );
  }
  