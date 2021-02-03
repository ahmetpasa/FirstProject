import React, { useState } from 'react';
import {RefreshControl ,SafeAreaView,Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, TouchableHighlight} from 'react-native';
import axios from 'axios';
import {StackActions} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Button} from 'native-base';
import {globalStyles} from './globalStyles';

export default class AllAppointments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            appData: [],
            refreshing: false,
        };
    }

    componentDidMount(){
        var self= this;
        axios({
            method: 'get',
            url: 'http://192.168.1.4:8083/api/seeapps'
        }).then(function (response){
            self.setState({appData: response.data});
        }).catch(function (error){
            console.log(error);
        });
    }

    onRefreshCustom(){
        this.setState({'refreshing': true})
        var self = this
        axios({
            method: 'get',
            url: 'http://192.168.1.4:8083/api/seeapps'            
        }).then(function (response){
            self.setState({appData: response.data});
        }).catch(function (error){
            console.log(error);
        });
        this.setState({'refreshing': false})
    }

    onDeleteApp(item){
        var self = this;
        axios({
            method: 'get',
            url: 'http://192.168.1.4:8083/api/deleteapp/'+ item.appointmentID,
        }).then(function (response){
            console.log(response.data.message);
            axios({
                method: 'get',
                url: 'http://192.168.1.4:8083/api/seeapps'            
            }).then(function (response){
                self.setState({appData: response.data});
            }).catch(function (error){
                console.log(error);
            })
        }).catch(function (error){
            console.log(error);
        });        
    }

    onDetailApp(item, navigation){
        console.log(item.appointmentID);
        axios({
            method: 'get',
            url: 'http://192.168.1.4:8083/api/appdetails/'+ item.appointmentID,
        }).then(function (response){
            navigation.navigate("AppDetails", {
                detailData: response.data,
            });
        }).catch(function (error){
            console.log(error);
        }); 
    }

    render(){
        return(
            <View style={globalStyles.listContainer}>
            <View style={globalStyles.list}>
                <SwipeListView
                data={this.state.appData}
                renderItem={({item}) => (
                    <TouchableHighlight
                        style={globalStyles.rowList}>
                        <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Appointment Date</Text>
                        <Text style={globalStyles.rowText}>{item.dateof_app}</Text>
                        </View> 
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Time</Text>
                        <Text style={globalStyles.rowText}>{item.time}</Text> 
                        </View> 
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                        <Text style={globalStyles.rowText}>Description</Text>  
                        <Text style={globalStyles.rowText}>{item.description_app}</Text>
                        </View> 
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                        <Text style={globalStyles.rowText}>Type</Text>  
                        <Text style={globalStyles.rowText}>{item.appType}</Text>
                        </View>  
                        </View>                  
                    </TouchableHighlight>
                )}
                keyExtractor={({item}) => item}
                renderHiddenItem={({item}) => (
                    <View style={globalStyles.rowBack}>
                    <TouchableOpacity
                    style={[globalStyles.backLeftBtn, globalStyles.successBtn]}
                    onPress={() => this.onDetailApp(item, this.props.navigation)}>
                    <Text style={globalStyles.backTextSuccess}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[globalStyles.backRightBtn, globalStyles.infoBtn]}
                    onPress={() => this.props.navigation.navigate('UpdateAppointment', {
                        updateData: item,
                    })}>
                    <Text style={globalStyles.backTextNeutral}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[globalStyles.backRightBtn, globalStyles.dangerBtn]}
                    onPress={() => this.onDeleteApp(item)}>
                    <Text style={globalStyles.backTextDanger}>Delete</Text>
                    </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-150}
                stopLeftSwipe={75}
                stopRightSwipe={-150}
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefreshCustom()}/>}
                />                             
            </View>
            <View style={globalStyles.addSomething}>
            <Button full info                
            style={globalStyles.addButton}
            onPress={() => this.props.navigation.navigate('AddAppointment')}>
            <Text style={globalStyles.btnUpdateText}>Add Appointment</Text>
            </Button> 
            </View>              
            </View>
        );
    }
}