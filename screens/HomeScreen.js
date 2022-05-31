import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ,FlatList,Button,Image,TouchableHighlight} from 'react-native'
import auth from '@react-native-firebase/auth';



const data = [
  { id: '1', name: 'user-1',url:"https://thumbs.dreamstime.com/b/user-profile-icon-creative-trendy-colorful-round-button-illustration-isolated-156511788.jpg" },
  { id: '2', name: 'user-2',url:"https://thumbs.dreamstime.com/b/user-profile-icon-creative-trendy-colorful-round-button-illustration-isolated-156511788.jpg" },
  { id: '3', name: 'user-3',url:"https://thumbs.dreamstime.com/b/user-profile-icon-creative-trendy-colorful-round-button-illustration-isolated-156511788.jpg" }
];



const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (

      <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => navigation.replace('Chat')}>
            <View style={styles.listItem}>
              <Image style={styles.logo} source={{uri:item.url}}/>
              <Text style={styles.listItemText}>{item.name}</Text>
            </View>

          </TouchableHighlight>

        )}
      />
      <View style={styles.buttonContainer}>
     <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      </View>
    </View>




  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
   button: {
    backgroundColor: '#0782F9',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  logo: {
    width: 66,
    height: 58,
    margin:10,

  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    flex:1,
    flexDirection:'row',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',

    width: '100%',
justifyContent: 'center',
alignItems: 'center'


  },
  listItemText: {
    fontSize: 18
  },
  text: {
    fontSize: 25,
  },

})