import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNiubiz } from "../hooks/useNiubiz";
import { RootStackParams } from "../types";

export default function Payment() {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParams, 'Payment'>>()
  const [buttonHTML, setButtonHTML] = useState<any>("<p></p>")
  const { getToken, getSession, getButton } = useNiubiz()

  const currentOrder = {
    amount: '1000.00',
    purchaseNumber: "1001",
  }

  const handleNavigationStateChange = (navState: any) => {
    console.log('navState: ', navState)
    const { url } = navState;
    if (url.startsWith('myapp://')) {
      const path = url.split('://')[1];
      navigate('Confirmation')
    }
  }

  useEffect(() => {
    getToken()
      .then(async ({ token }: any) => {
        // Get session
        let session = await getSession({
          ...currentOrder,
          "token": token,
          "clientIp": "24.252.107.29"
        })
        // Get button HTML
        const button = await getButton({ session, token, ...currentOrder })
        setButtonHTML(button)
      }).catch((error) => {
        console.log('error TOKEN: ', error);
      })

  }, [])

  return (
    <View style={sty.container}>
      <Text>Payment Page</Text>
      <WebView
        style={sty.containerView}
        originWhitelist={['*']}
        source={{ html: buttonHTML }}
        onNavigationStateChange={handleNavigationStateChange}
        scalesPageToFit={true}
      />
    </View>
  )
}

const sty = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  containerView: {
    flex: 1,
    width: 400, height: 300
  }
})