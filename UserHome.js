import React, { useState } from 'react';
import {RefreshControl,Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, Modal, Button, ScrollView, TouchableHighlight} from 'react-native';
import axios from 'axios';
import {ListItem, Body, Content, Container} from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';
import {globalStyles} from './globalStyles';
import CardView from 'react-native-cardview';
import CheckBox from '@react-native-community/checkbox';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const AppStateValidationSchema = yup.object({
    isAccepted: yup.boolean(),
    description: yup.string().when('isAccepted', {
        is: true,
        then: yup.string().min(0),
        otherwise: yup.string().required('You must write your reason for rejecting!').min(5, 'You must write your reason for rejecting!(at least 5 characters)'),
    })
});


export default class UserHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            countIds: 0,
            countMembers: 0,
            closestApp: [], 
            isIndividualVisible: false,
            isFamilyVisible: false,
            isSelectVisible: false,
            isSelectCameVisible: false,
            isQRIndividualVisible: false,
            isQRFamilyVisible: false,
            isAccepted: true,
            textValue: "",
            textEditable: false,
            refreshing: false,
            memberIds: [],
            camememberIds: [],
        }; 

        this.isChecked = this.isChecked.bind(this);
    } 
    componentDidMount(){
        var self = this;
        const requestOne = axios.get('http://192.168.1.4:8083/api/abc');
        const requestTwo = axios.get('http://192.168.1.4:8083/api/getClosest');
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => { 
            const responseOne = responses[0];
            console.log(responseOne.data);
            const responseTwo = responses[1];
            self.setState({
                countIds: responseOne.data[0],
                countMembers: responseOne.data[1],
                closestApp: responseTwo.data
            });
            }
            )).catch(function (errors){
                console.log(errors);
            });
    }
    onPressAccept(formikProps){
        formikProps.setFieldValue('isAccepted', !this.state.isAccepted);
        this.setState({isAccepted: !this.state.isAccepted});
        formikProps.setFieldValue('description', "");
        this.setState({textEditable: false});
        console.log(this.state.isAccepted);  
        console.log(this.state.description);  
        console.log(formikProps.isAccepted);     
    }
    onPressReject(formikProps){
        formikProps.setFieldValue('isAccepted', !this.state.isAccepted);
        this.setState({isAccepted: !this.state.isAccepted}); 
        formikProps.setFieldValue('description', this.state.textValue);
        this.setState({textEditable: true});
        this.setState({memberIds: []});
    }
    onChangeTextCustom(formikProps, text){       
        this.setState({textValue: text}); 
        formikProps.setFieldValue('description', text);        
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
    onSuccess(e){
        const form = new FormData();
        form.append('joiningstate', true);
        form.append('description', "");
        form.append('attendance', true);
        console.log(form);
        axios(
            {
              method: 'post',
              url: e.data,
              data: form, 
              headers: {'Content-Type': 'multipart/form-data'}     
            }).then(function (response){
                console.log(response.message);
                Alert.alert("Success","Welcome to appointment!");
            }).catch(function (error){
                console.log(error);
            });
    }
    onModalOpen(state){
        if(state == "Family"){
            this.setState({isFamilyVisible: true});
        }
        else if(state == "Individual"){
            this.setState({isIndividualVisible: true});
        }
    }
    onModalClose(state){
        console.log(this.props.route.params.userData.manager.members);
        if(state == "Family"){
            this.setState({isFamilyVisible: false});
        }
        else if(state == "Individual"){
            this.setState({isIndividualVisible: false});
        }
    }
    onQRModalOpen(state){
        if(state == "Family"){
            this.setState({isSelectCameVisible: true});
        }
        else if(state == "Individual"){
            this.setState({isQRIndividualVisible: true});
        }
    }
    isChecked(member){
        const isThere = this.state.memberIds.includes(member.memberID);
        return isThere;
    }
    toggleChecked(member){
        if(this.isChecked(member)){
            var index = this.state.memberIds.indexOf(member.memberID);
            this.setState({
                memberIds: [...this.state.memberIds.slice(0, index),
                ...this.state.memberIds.slice(index+1)]
            });
        }
        else{
            this.setState({
                memberIds: [...this.state.memberIds, member.memberID]
            });
        }
    }
    isCheckedControl(member){
        const isThere = this.state.camememberIds.includes(member.memberID);
        return isThere;
    }
    toggleCheckedControl(member){
        if(this.isCheckedControl(member)){
            var index = this.state.camememberIds.indexOf(member.memberID);
            this.setState({
                camememberIds: [...this.state.camememberIds.slice(0, index),
                ...this.state.camememberIds.slice(index+1)]
            });
        }
        else{
            this.setState({
                camememberIds: [...this.state.camememberIds, member.memberID]
            });
        }
    }
    onSuccessFamily(e){
        var self = this;
        const form = new FormData();
        form.append('joiningstate', true);
        form.append('description', "");
        form.append('attendance', true);
        form.append('cameids', JSON.stringify(this.state.camememberIds));
        console.log(form);        
        axios(
            {
              method: 'post',
              url: e.data,
              data: form, 
              headers: {'Content-Type': 'multipart/form-data'}     
            }).then(function (response){
                console.log(response.message);
                Alert.alert("Success","Welcome to appointment!");
                self.setState({isQRFamilyVisible: false, isSelectCameVisible: false});
            }).catch(function (error){
                console.log(error);
            });
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
            <TouchableOpacity style={globalStyles.btnUpdate} onPress={() => this.onModalOpen(this.state.closestApp.appType)}>
                <Text style={globalStyles.btnUpdateText}>Update Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.btnUpdate} onPress={() => this.onQRModalOpen(this.state.closestApp.appType)}>
                <Text style={globalStyles.btnUpdateText}>QR Attendance</Text>
            </TouchableOpacity>
            </CardView>  

            <Modal visible={this.state.isIndividualVisible} animationType="slide">
                <View style={globalStyles.container}>
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
                </CardView> 
                    <Formik
                        initialValues={{isAccepted: true , description: ""}}
                        onSubmit={(values) => {
                            var self = this;
                            const form = new FormData();
                            form.append('joiningstate', values.isAccepted);
                            form.append('description', values.description);
                            form.append('attendance', false);
                            axios(
                                {
                                  method: 'post',
                                  url: 'http://192.168.1.4:8083/api/appStateSubmit',
                                  data: form, 
                                  headers: {'Content-Type': 'multipart/form-data'}     
                                }).then(function (response){
                                    console.log(response.data);
                                    self.setState({isIndividualVisible: false});
                                }).catch(function (error){
                                    console.log(error);
                                });
                        }}
                        validationSchema={AppStateValidationSchema}
                    >
                    {(formikProps) =>
                    <View style={{alignItems: "center"}}>
                    <CardView style={globalStyles.formCard} cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    cornerOverlap={false}>
                    <Text style={globalStyles.formTitle}>Give Your Answer</Text>
                    <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly"}}>
                    <CheckBox value={this.state.isAccepted} onValueChange={() => this.onPressAccept(formikProps)} />
                    <Text>Accept</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly"}}>
                    <CheckBox value={!this.state.isAccepted} onValueChange={() => this.onPressReject(formikProps)}/>
                    <Text>Reject</Text>
                    </View>
                    </View>
                    <TextInput
                        style={{backgroundColor: 'white'}}
                        multiline
                        numberOfLines={3}
                        onChangeText={(text) => this.onChangeTextCustom(formikProps, text)}
                        editable={this.state.textEditable}
                        value={(this.state.isAccepted) ? "" : this.state.textValue}
                        placeholder={"Write your reason(if you're rejecting!)"}
                        placeholderTextColor="grey"
                    />
                    <Text style={{color: 'red'}}>{formikProps.errors.description}</Text>
                    <Button title="submit" onPress={formikProps.handleSubmit}></Button>
                    <TouchableOpacity style={globalStyles.btnLogin} onPress={() => this.onModalClose(this.state.closestApp.appType)}>
                        <Text style={globalStyles.btnText}>Cancel</Text> 
                    </TouchableOpacity>  
                    </CardView>                  
                    </View>
                    }
                    </Formik>                 
                </View>
            </Modal>
            <Modal visible={this.state.isQRIndividualVisible} animationType="slide">
            <QRCodeScanner
            onRead={(e) => this.onSuccess(e, this.props.route.params.userData.manager.managerID, this.state.isAccepted, this.state.textValue)}
            flashMode={RNCamera.Constants.FlashMode.off}
            bottomContent={
            <TouchableOpacity style={globalStyles.btnLogin} onPress={() => this.setState({isQRIndividualVisible: false})}>
            <Text style={globalStyles.btnText}>Cancel</Text>
            </TouchableOpacity>
            }
            />
            </Modal>
            <Modal visible={this.state.isFamilyVisible} animationType="slide">
                <View style={globalStyles.container}>
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
                </CardView> 
                    <Formik
                        initialValues={{isAccepted: true , description: ""}}
                        onSubmit={(values) => {
                            var self = this;
                            const form = new FormData();
                            form.append('joiningstate', values.isAccepted);
                            form.append('description', values.description);
                            form.append('attendance', false);
                            console.log(self.state.memberIds);
                            form.append('ids', JSON.stringify(self.state.memberIds));
                            console.log(form);                           
                            axios(
                                {
                                  method: 'post',
                                  url: 'http://192.168.1.4:8083/api/appStateMember',
                                  data: form, 
                                  headers: {'Content-Type': 'multipart/form-data'}     
                                }).then(function (response){
                                    console.log(response.message);
                                    console.log(form._parts[3]);
                                    self.setState({isFamilyVisible: false});
                                }).catch(function (error){                                    
                                    console.log(error);
                                });
                        }}
                        validationSchema={AppStateValidationSchema}
                    >
                    {(formikProps) =>
                    <View style={{alignItems: "center"}}>
                    <CardView style={globalStyles.formCard} cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    cornerOverlap={false}>
                    <Text style={globalStyles.formTitle}>Give Your Answer</Text>
                    <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly"}}>
                    <CheckBox value={this.state.isAccepted} onValueChange={() => this.onPressAccept(formikProps)} />
                    <Text>Accept</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly"}}>
                    <CheckBox value={!this.state.isAccepted} onValueChange={() => this.onPressReject(formikProps)}/>
                    <Text>Reject</Text>
                    </View>
                    </View>
                    <TextInput
                        style={{backgroundColor: 'white'}}
                        multiline
                        numberOfLines={3}
                        onChangeText={(text) => this.onChangeTextCustom(formikProps, text)}
                        editable={this.state.textEditable}
                        value={(this.state.isAccepted) ? "" : this.state.textValue}
                        placeholder={"Write your reason(if you're rejecting!)"}
                        placeholderTextColor="grey"
                    />
                    <Text style={{color: 'red'}}>{formikProps.errors.description}</Text>
                    <TouchableOpacity style={globalStyles.btnUpdate} onPress={() => this.setState({isSelectVisible: true})}>
                    <Text style={globalStyles.btnUpdateText}>Select Members</Text>
                    </TouchableOpacity>
                    <Button title="submit" onPress={formikProps.handleSubmit}></Button>
                    <TouchableOpacity style={globalStyles.btnLogin} onPress={() => this.onModalClose(this.state.closestApp.appType)}>
                        <Text style={globalStyles.btnText}>Cancel</Text> 
                    </TouchableOpacity>  
                    </CardView>                  
                    </View>
                    }
                    </Formik>                 
                </View>
            </Modal>
            <Modal visible={this.state.isSelectVisible} animationType="slide">
                <View style={globalStyles.listContainer}>
                    {this.props.route.params.userData.manager.members.map((data) => {
                    return (
                    <TouchableHighlight underlayColor='#a18b5f' onPress={() => this.toggleChecked(data)}>
                    <CardView
                    style={{
                      backgroundColor: this.isChecked(data) ? "green" : "white",
                      margin: 10,
                      padding: 10,
                    }}
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    cornerOverlap={false}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Name/Surname</Text>
                    <Text>{data.name} {data.surname}</Text>
                    </View>  
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Email</Text>
                    <Text>{data.email}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Telephone</Text>
                    <Text>{data.telephone}</Text>
                    </View> 
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Address</Text>
                    <Text>{data.address}</Text>
                    </View>  
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Degree</Text>
                    <Text>{data.degree}</Text>
                    </View>            
                    </CardView>
                    </TouchableHighlight>
                    )
                    })}
                <TouchableOpacity style={globalStyles.btnLogin} onPress={() => this.setState({isSelectVisible: false})}>
                <Text style={globalStyles.btnText}>Confirm</Text> 
                </TouchableOpacity> 
                </View>
            </Modal>
            <Modal visible={this.state.isQRFamilyVisible} animationType="slide">
            <QRCodeScanner
            onRead={(e) => this.onSuccessFamily(e)}
            flashMode={RNCamera.Constants.FlashMode.off}
            bottomContent={
            <TouchableOpacity style={globalStyles.btnLogin} onPress={() => this.setState({isQRFamilyVisible: false})}>
            <Text style={globalStyles.btnText}>Cancel</Text>
            </TouchableOpacity>
            }
            />
            </Modal>
            <Modal visible={this.state.isSelectCameVisible} animationType="slide">
                <View style={globalStyles.listContainer}>
                    {this.props.route.params.userData.manager.members.map((data) => {
                    return (
                    <TouchableHighlight underlayColor='#a18b5f' onPress={() => this.toggleCheckedControl(data)}>
                    <CardView
                    style={{
                      backgroundColor: this.isCheckedControl(data) ? "green" : "white",
                      margin: 10,
                      padding: 10,
                    }}
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    cornerOverlap={false}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Name/Surname</Text>
                    <Text>{data.name} {data.surname}</Text>
                    </View>  
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Email</Text>
                    <Text>{data.email}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Telephone</Text>
                    <Text>{data.telephone}</Text>
                    </View> 
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Address</Text>
                    <Text>{data.address}</Text>
                    </View>  
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, alignContent: 'center',}}>Degree</Text>
                    <Text>{data.degree}</Text>
                    </View>            
                    </CardView>
                    </TouchableHighlight>
                    )
                    })}
                <TouchableOpacity style={globalStyles.btnLogin} onPress={() => this.setState({isQRFamilyVisible: true})}>
                <Text style={globalStyles.btnText}>Confirm</Text> 
                </TouchableOpacity> 
                </View>
            </Modal>
            </ScrollView>
            </View>         
        );
    }
}