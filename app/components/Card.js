import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

export default function card({ data }) {
    const { navigation } = useNavigation    

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Card {data}</Text>
        <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      </View>
    );
  }  
