import React,{useState} from 'react';
import { Alert} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import auth from '@react-native-firebase/auth';




const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HOME" component={HomeScreen}/>
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


// const SettingsStack = createNativeStackNavigator();

// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{headerShown:false}} />
//     </SettingsStack.Navigator>
//   );
// }

const HomeStack = createNativeStackNavigator();


 function MainStack() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        {/* <HomeStack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} /> */}
        <HomeStack.Screen name="Home" component={HomeStackScreen}  options={{headerShown:false}}/>
        <HomeStack.Screen name="Chat" component={ChatScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}




export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  const createUser = (email, password) => {
    if (email.length==0){
      Alert.alert("Enter Email")
    }else if(password.length==0){
      Alert.alert("Enter Password")
    }
    else{
      auth().createUserWithEmailAndPassword(email, password).then(
        function(result){
          return(console.log(result.user.email))
        }
      ).catch(
        function(e){
          if (e.code==="auth/invalid-email"){
            return(Alert.alert("Enter valid email"))
          }else if (e.code==="auth/weak-password"){
            return(Alert.alert("Password is short"))
          }else if (e.code==="auth/email-already-in-use"){
            return(Alert.alert("email-already-in-use"))
          }else{
            return(console.log(e.message))
          }
        }
      );
    }


  };

  const signIn = (email, password) => {
    if (email.length==0){
      Alert.alert("Enter Email")
    }else if(password.length==0){
      Alert.alert("Enter Password")
    }
    else{
      auth().signInWithEmailAndPassword(email, password).then(
        function(result){
          return(console.log(result.user.email))
        }
      ).catch(
        function(e){
          if (e.code==="auth/user-not-found"){
            return(Alert.alert("In correct Email"))
          }else if(e.code==="auth/wrong-password"){
            return(Alert.alert("Password is invalid"))
          }else if(e.code==="auth/invalid-email"){
            return(Alert.alert("Enter valid Email"))

          }
          else{
            return(console.log(e.message),Alert.alert(e.mesage))
          }

        });
    }
  };

  if (authenticated) {
    return <MainStack />;
  }

  return <LoginScreen signIn={signIn} createUser={createUser} />;
}