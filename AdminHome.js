import React, { useState } from 'react';
import {RefreshControl,Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, Modal, Button, ScrollView} from 'react-native';
import axios from 'axios';
import {CheckBox, ListItem, Body, Content, Container} from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';
import {globalStyles} from './globalStyles';
import CardView from 'react-native-cardview';

export default class AdminHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            countIds: 0,
            countMembers: 0,
            countTotalMembers: 0,
            closestApp: [],
            refreshing: false,
        }; 
    }

    componentDidMount(){
        var self = this;
        const requestOne = axios.get('http://192.168.1.4:8083/api/abc');
        const requestTwo = axios.get('http://192.168.1.4:8083/api/getClosest');
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => { 
            const responseOne = responses[0];
            const responseTwo = responses[1];
            self.setState({
                countIds: responseOne.data[0],
                countMembers: responseOne.data[1],
                countTotalMembers: responseOne.data[2],
                closestApp: responseTwo.data
            });
            }
            )).catch(function (errors){
                console.log(errors);
            });
        
    }
    onRefreshCustom(){
        this.setState({'refreshing': true})
        var self = this;
        const requestOne = axios.get('http://192.168.1.4:8083/api/abc');
        const requestTwo = axios.get('http://192.168.1.4:8083/api/getClosest');
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => { 
            const responseOne = responses[0];
            const responseTwo = responses[1];
            self.setState({
                countIds: responseOne.data[0],
                countMembers: responseOne.data[1],
                countTotalMembers: responseOne.data[2],
                closestApp: responseTwo.data
            });
            }
            )).catch(function (errors){
                console.log(errors);
            });
        this.setState({'refreshing': false})
    }
    render(){
        return(   
            <View style={globalStyles.container}>       
            <ScrollView contentContainerStyle={globalStyles.container}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefreshCustom()}/>}>
            <CardView
            style={globalStyles.card}
            cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  cornerOverlap={false}>
            <Text style={globalStyles.cardWelcome}>Welcome, {this.props.route.params.userData.manager.name} {this.props.route.params.userData.manager.surname}</Text>
            </CardView>
            <CardView style={globalStyles.card} cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  cornerOverlap={false}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>Total Appointments</Text>
            <Text style={globalStyles.cardTextNumber}>{this.state.countIds}</Text>
            </View>
            </CardView>
            <CardView style={globalStyles.card} cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  cornerOverlap={false}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>Your Family Members</Text>
            <Text style={globalStyles.cardTextNumber}>{this.state.countMembers}</Text>
            </View>
            </CardView>
            <CardView style={globalStyles.card} cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  cornerOverlap={false}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>All Family Members</Text>
            <Text style={globalStyles.cardTextNumber}>{this.state.countTotalMembers}</Text>
            </View>
            </CardView>
            <CardView style={globalStyles.card} cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  cornerOverlap={false}>
            <View style={globalStyles.cardTitle}>
            <Text style={globalStyles.cardTitleText}>Closest Appointment</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop:10}}>
            <Text style={globalStyles.cardText}>AppID</Text>
            <Text style={globalStyles.cardText}>{this.state.closestApp.appointmentID}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>Date</Text>
            <Text style={globalStyles.cardText}>{this.state.closestApp.dateof_app}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>Time</Text>
            <Text style={globalStyles.cardText}>{this.state.closestApp.time}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>Description</Text>
            <Text style={globalStyles.cardText}>{this.state.closestApp.description_app}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>Type</Text>
            <Text style={globalStyles.cardText}>{this.state.closestApp.appType}</Text>
            </View>
            </CardView>            
            </ScrollView>
            </View>          
        );
    }
}