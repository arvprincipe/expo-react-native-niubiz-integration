import { StyleSheet, Text, View } from "react-native";

export default function Confirmation() {
  return (
    <View style={sty.container}>
      <Text>CONFIRMATION PAGE</Text>
    </View>
  )
}

const sty = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
})