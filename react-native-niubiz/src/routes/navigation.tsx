import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Views
import Home from '../views/Home'
import Payment from '../views/Payment';
import Confirmation from '../views/Confirmation';

const stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Home' component={Home} />
        <stack.Screen name='Payment' component={Payment} />
        <stack.Screen name='Confirmation' component={Confirmation} />
      </stack.Navigator>
    </NavigationContainer>
  )
}