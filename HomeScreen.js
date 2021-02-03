import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import {StackActions} from '@react-navigation/native';

const {width: WIDTH} = Dimensions.get("window")

export default class HomeScreen extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        username: "",
        password: "" 
       }
  }

  onLoginPress(navigation){
    const form = new FormData();
    form.append('username', this.state.username);
    form.append('password', this.state.password);
    console.log(form);
    axios(
    {
      method: 'post',
      url: 'http://192.168.1.4:8083/loginControl',
      data: form,
      headers: {'Content-Type': 'multipart/form-data'}        
    }
    ).then(function (response) {
      if(response.data.manager.roles[0].role_id == 1){
        console.log("Admin"); /* Buradan abc'ye geçiş yapılacak.*/
        navigation.dispatch(
            StackActions.replace('AdminHome',{
                userData: response.data,
            })
        ); 
      }
      else{
        console.log("User"); /* Mesaj gönderimine bak. Yanlış çünkü. */
        navigation.dispatch(
            StackActions.replace('UserHome',{
                userData: response.data,
            })
        ); 
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Log In</Text>
        <View style={styles.inputContainer}>
         <TextInput        
          style={styles.input}
          placeholder={'Username'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          onChangeText={username => this.setState({username: username})}
          underlineColorAndroid='transparent'/>
        </View>
        <View style={styles.inputContainer}>
        <TextInput        
          style={styles.input}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          onChangeText={password => this.setState({password: password})}
          underlineColorAndroid='transparent'/>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={() => this.onLoginPress(this.props.navigation)}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
      </View>      
    )
  }
}

const styles = StyleSheet.create ({
  container: {
     flex: 1,
     backgroundColor: '#a18b5f',
     justifyContent: "center",
     alignItems: 'center',
  },
  text: {
     fontSize: 40,
     color: 'white'
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25
  },
  inputContainer: {
    marginTop: 10
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: '#008cff'
  },
  btnText: {
    textAlign: "center"
  }
})