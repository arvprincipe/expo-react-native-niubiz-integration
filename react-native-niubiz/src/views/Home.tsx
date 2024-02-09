import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../types";

export default function Home() {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParams, 'Home'>>();

  const handleGoToPayment = () => {
    navigate('Payment')
  }

  return (
    <View style={sty.container}>
      <Text>Home PAGE</Text>
      <Button
        title="Ir a Pagar"
        onPress={handleGoToPayment}
      />
    </View>
  )
}

const sty = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
})