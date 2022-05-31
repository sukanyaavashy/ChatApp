import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import {HeaderBackButton} from '@react-navigation/elements';



const Stack = createNativeStackNavigator();



export default function App(navigation) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerLeft: (props) => (
      <HeaderBackButton
      {...props}
        style={styles.custom}
        onPress={() => navigation.goBack()

        }
      />
    ),}} name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});