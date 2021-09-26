import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./main/home";
import About from "./main/about";

const Stack = createNativeStackNavigator();
const theme = {
   ...DefaultTheme,
   dark: false,
   colors: {
      ...DefaultTheme.colors,
      background: "white",
      // text:"#ffffff",

   },
   // fonts: Fonts;
};
function App() {
   return (
         <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Home">
               <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
               <Stack.Screen name="About" component={About} />
            </Stack.Navigator>
         </NavigationContainer>
   );
}

export default App;