import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AdminHome from './AdminHome';
import UserHome from './UserHome';
import AllAppointments from './AllAppointments';
import AllFamilyMembers from './AllFamilyMembers';
import AddAppointment from './AddAppointment';
import AddFamilyMember from './AddFamilyMember';
import UpdateAppointment from './updateAppointment';
import UpdateMember from './updateMember';
import AppDetails from './AppDetails';

const Stack = createStackNavigator();
const Stackm = createStackNavigator();
const Stackfamily = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = (props) => {
  return (
    <Drawer.Navigator initialRouteName="AdminHome" screenOptions={{headerShown: false}}>
      <Drawer.Screen name="AdminHome" component={AdminHome} options={{title: "Home"}} initialParams={{userData: props.route.params.userData}}/>
      <Drawer.Screen name="AdminAppointment" component={AppointmentStack} options={{title: "Appointments"}}/>
      <Drawer.Screen name="AdminFamilyMember" component={FamilyStack} options={{title: "Family Members"}}/>
    </Drawer.Navigator>
  );
}

const MyDrawer2 = (props) => {
  return (
    <Drawer.Navigator initialRouteName="UserHome" >
      <Drawer.Screen name="UserHome" component={UserHome} options={{title: "Home"}} initialParams={{userData: props.route.params.userData}}/>  
      <Drawer.Screen name="UserAppointment" component={AllAppointments} options={{title: "Appointments"}}/>
      <Drawer.Screen name="UserFamilyMember" component={FamilyStack} options={{title: "Family Members"}} />
    </Drawer.Navigator>
  );
}

const AppointmentStack = (props) => {
  return (
    <Stackm.Navigator initialRouteName="Appointment" screenOptions={{headerShown: false}}>
      <Stackm.Screen name="Appointment" component={AllAppointments}/>
      <Stackm.Screen name="AddAppointment" component={AddAppointment}/>
      <Stackm.Screen name="UpdateAppointment" component={UpdateAppointment}/>
      <Stackm.Screen name="AppDetails" component={AppDetails}/>
    </Stackm.Navigator>
  );
}

const FamilyStack = (props) => {
  return (
    <Stackfamily.Navigator initialRouteName="AllFamilyMembers" screenOptions={{headerShown: false}}>
      <Stackfamily.Screen name="AllFamilyMembers" component={AllFamilyMembers}/>
      <Stackfamily.Screen name="AddFamilyMember" component={AddFamilyMember}/>
      <Stackfamily.Screen name="UpdateFamilyMember" component={UpdateMember}/>
    </Stackfamily.Navigator>
  );
}

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="AdminHome" component={MyDrawer}/>
      <Stack.Screen name="UserHome" component={MyDrawer2}/>    
    </Stack.Navigator>
    </NavigationContainer>
    );
  }    
}