import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/components/SplashScreen';
import CharacterInfoScreen from './src/screens/CharacterInfoScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="CharacterInfoScreen"
          component={CharacterInfoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
