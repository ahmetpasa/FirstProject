import React, { useState } from 'react';
import {RefreshControl,SafeAreaView,Text, ScrollView ,View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, TouchableHighlight} from 'react-native';
import axios from 'axios';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Button} from 'native-base';
import {globalStyles} from './globalStyles';

export default class AllFamilyMembers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            memberData: [],
            refreshing: false,
        };
    }

    componentDidMount(){
        var self= this;
        axios({
            method: 'get',
            url: 'http://192.168.1.4:8083/api/seefamilymembers'
        }).then(function (response){
            self.setState({memberData: response.data});
        }).catch(function (error){
            console.log(error);
        });
    }

    onRefreshCustom(){
        this.setState({'refreshing': true})
        var self = this
        axios({
            method: 'get',
            url: 'http://192.168.1.4:8083/api/seefamilymembers'            
        }).then(function (response){
            self.setState({memberData: response.data});
        }).catch(function (error){
            console.log(error);
        });
        this.setState({'refreshing': false})
    }

    onDeleteMember(item){
        var self = this;
        axios({
            method: 'get',
            url: 'http://192.168.1.4:8083/api/deletemember/'+ item.memberID,
        }).then(function (response){
            console.log(response.data.message);
            axios({
                method: 'get',
                url: 'http://192.168.1.4:8083/api/seefamilymembers'            
            }).then(function (response){
                self.setState({memberData: response.data});
            }).catch(function (error){
                console.log(error);
            })
        }).catch(function (error){
            console.log(error);
        });        
    }

    render(){
        return(
            <View style={globalStyles.listContainer}>
                <View style={globalStyles.list}>
                <SwipeListView
                data={this.state.memberData}
                renderItem={({item}) => (
                    <TouchableHighlight
                        style={globalStyles.rowList}>
                        <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Member ID</Text>
                        <Text style={globalStyles.rowText}>{item.memberID}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Name</Text>
                        <Text style={globalStyles.rowText}>{item.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Surname</Text>
                        <Text style={globalStyles.rowText}>{item.surname}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>E-mail</Text>
                        <Text style={globalStyles.rowText}>{item.email}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Tel. No</Text>
                        <Text style={globalStyles.rowText}>{item.telephone}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Address</Text>
                        <Text style={globalStyles.rowText}>{item.address}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Birthday</Text>
                        <Text style={globalStyles.rowText}>{item.birthday}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={globalStyles.rowText}>Degree</Text>
                        <Text style={globalStyles.rowText}>{item.degree}</Text>
                        </View>
                        </View>                    
                    </TouchableHighlight>
                )}
                keyExtractor={({item}) => item}
                renderHiddenItem={({item}) => (
                    <View style={globalStyles.rowBack}>
                    <TouchableOpacity
                    style={[globalStyles.backRightBtn, globalStyles.infoBtn]}
                    onPress={() => this.props.navigation.navigate('UpdateFamilyMember', {
                        updateData: item,    
                    })}>
                    <Text style={globalStyles.backTextNeutral}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[globalStyles.backRightBtn, globalStyles.dangerBtn]}
                    onPress={() => this.onDeleteMember(item)}>
                    <Text style={globalStyles.backTextDanger}>Delete</Text>
                    </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-150}
                stopLeftSwipe={-1}
                stopRightSwipe={-150}
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefreshCustom()}/>}
                />
                </View>
            <View style={globalStyles.addSomething}>
            <Button full info                
            style={globalStyles.addButton}
            onPress={() => this.props.navigation.navigate('AddFamilyMember')}>
            <Text style={globalStyles.btnUpdateText}>Add New Family Member</Text>
            </Button> 
            </View>              
            </View>
        );
    }
}