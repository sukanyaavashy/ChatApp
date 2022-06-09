import React, {useState,useEffect} from "react";
import {View, Text, StyleSheet, Image, TouchableHighlight, Alert} from 'react-native'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Avatar,Button } from "react-native-paper";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


const SettingsScreen = ({navigation}) => {



  const user =  auth().currentUser
  const email = user.email;
  const index = (email.indexOf("@"))
  const [Pic, SetPic] = useState('')

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('ProfilePic')
      if(value !== null) {
        // value previously stored
        SetPic(value)
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const uploadImage = ()=>{
    let options = {
      mediaType : 'photo',
      quality:1,
      includeBase64:true,
      storageOptions: {
        skipBackup: true
      }
    };
    launchImageLibrary(options, response=>{
      if(response.didCancel){
        Alert.alert('Cancelled image selection')
      }else if(response.errorCode=='permission'){
        Alert.alert('permissions not satisfied')
      }else if(response.errorCode=='other'){
        Alert.alert(response.errorMessage)
      }else if(response.assets[0].fileSize > 2097152){
        Alert.alert('Maximum size exceeded', 'Please choose image under 3 MB',[{text:'ok'}],);

      }else{
        // SetPic(response.assets[0].base64)
        try {
          AsyncStorage.setItem('ProfilePic', response.assets[0].base64)
          console.log(AsyncStorage.getItem('ProfilePic'))
        } catch (e) {
          // saving error
          console.log('rejected:'+e)
        }


      }
    })
  }

  const selectCamera = ()=>{
    let options = {
      mediaType : 'photo',
      quality:1,
      includeBase64:true,
      storageOptions: {
        skipBackup: true
      }
    };
    launchCamera(options, response=>{
      if(response.didCancel){
        Alert.alert('Cancelled Image Selection')
      }else if(response.errorCode=='Permission'){
        Alert.alert('Permissions Not Satisfied')
      }else if(response.errorCode=='Other'){
        Alert.alert(response.errorMessage)
      }else if(response.assets[0].fileSize > 2097152){
        Alert.alert('Maximum Size Exceeded', 'Please Choose Image Under 3 MB',[{text:'ok'}],);

      }else{
        // SetPic(response.assets[0].base64)
        try {
          AsyncStorage.setItem('ProfilePic', response.assets[0].base64)
          console.log(AsyncStorage.getItem('ProfilePic'))
        } catch (e) {
          // saving error
          console.log('Rejected:'+e)
        }

      }
      console.log(response.assets[0].base64)
    })
  }


  const removeImage = ()=>{
    SetPic('')
    Alert.alert('Image removed')
  }


  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        // navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  return(
    <View style={{flex:1,justifyContent:'space-between'}}>
      <View style={styles.centerContent}>
        <TouchableHighlight
          onPress={()=>alert('Select An Image')}
          underlayColor='rgba(0,0,0,0)'
        >
          <Avatar.Image
            size={250}
            source = {{uri:'data:image/png;base64,'+Pic}}



          />

        </TouchableHighlight>
        <Text style={{paddingTop:20}}>{email}</Text>
        <Text>{email.slice(0,index)}</Text>
        <View style={[styles.centerContent,{marginTop:25}]}>
        <Button mode='contained' onPress={()=>uploadImage()}>
          Upload Image
        </Button>
        <Button style={{marginTop:15}} mode='contained' onPress={() => selectCamera("photo")}>
          open camera
        </Button>

        <Button style={{marginTop:15}} mode='contained' onPress={()=>removeImage()}>
          Remove Image
        </Button>

      </View>
      </View>

      <View style={styles.button}>
        <Button onPress={handleSignOut} >Sign Out</Button>
      </View>
    </View>

  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  centerContent:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
    backgroundColor:'Pink',
  },
  button:{
    backgroundColor:'Blue',
    color:'white'
  }

})


