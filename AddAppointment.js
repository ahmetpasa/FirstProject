import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, Button} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {StackActions} from '@react-navigation/native';
import {parse, isDate} from 'date-fns';
import axios from 'axios';
import {globalStyles} from './globalStyles';
import CardView from 'react-native-cardview';
import CheckBox from '@react-native-community/checkbox';


const {width: WIDTH} = Dimensions.get("window")
const appointmentValSchema = yup.object({
    dateof_app: yup.date().transform(parseDateString).required('Date is required!').min(new Date(),'Date cannot be past!'),
    time: yup.string().required('Time is required!').matches(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])+$/,"Time format must be HH:mm!"),
    description_app: yup.string().required('Description is required!').min(3,'Description must be above 3 characters!'),
    isFamily: yup.boolean().required('You must enter the type of appointment!'),
});

function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
  
    return parsedDate;
}

export default function AddAppointment({ navigation }) {
    const[date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const[isFamily, setIsFamily] = useState(false);

    const onChange = (formikProps,date) => {
        setDate(date);
        formikProps.setFieldValue('dateof_app',date);
    }

    const onPressFamily = (formikProps) => {
        setIsFamily(!isFamily);  
        formikProps.setFieldValue('isFamily', !isFamily);        
    }

    const onPressIndividual = (formikProps) => {
        setIsFamily(!isFamily);  
        formikProps.setFieldValue('isFamily', !isFamily);        
    }

    return(
        <View style={globalStyles.formContainer}>            
            <Formik
            initialValues={{dateof_app: moment().format('YYYY-MM-DD') , time: "", description_app: "", isFamily: false}}
            onSubmit={(values) => {
            const form = new FormData();
            form.append('dateof_app', values.dateof_app);
            form.append('time', values.time);
            form.append('description_app', values.description_app);
            if(isFamily == true){
                form.append('appType', "Family");
            }
            else{
                form.append('appType', "Individual");
            }
            console.log(values);
                axios(
                    {
                      method: 'post',
                      url: 'http://192.168.1.4:8083/api/createappointment',
                      data: form, 
                      headers: {'Content-Type': 'multipart/form-data'}     
                    }).then(function (response){
                        console.log(response.data);
                        navigation.dispatch(
                            StackActions.pop(1)
                        );
                    }).catch(function (error){
                        console.log(error);
                    });
            }}
            validationSchema={appointmentValSchema}
            >
                {(formikProps) => 
            <View style={{alignItems: "center"}}>
            <CardView style={globalStyles.formCard} cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  cornerOverlap={false}>                         
            <Text style={globalStyles.formTitle}>Add New Appointment</Text>
            <Text style={globalStyles.dateTitle}>Date Of App</Text>      
        <DatePicker
            style={globalStyles.datePickerStyle}
            placeholder="Select Appointment Date"
            placeholderTextColor="white"
            date={date}
            format="YYYY-MM-DD"
            mode="date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateInput: {
                    borderColor: 'white',
                },
                dateText: {
                    color: 'white',
                },
            }}
            onDateChange={(date) => onChange(formikProps, date)}                    
        />
        <Text style={{color: 'red'}}>{formikProps.errors.dateof_app}</Text> 
        <TextInput
            style={globalStyles.textInputStyle}
            onChangeText={formikProps.handleChange('time')}
            placeholder='Time of Appointment'
            placeholderTextColor="white"
        />
        <Text style={{color: 'red'}}>{formikProps.errors.time}</Text> 
        <TextInput
            style={globalStyles.textInputStyle}
            onChangeText={formikProps.handleChange('description_app')}
            placeholder='Description of Appointment'
            placeholderTextColor="white"
        />
        <Text style={{color: 'red'}}>{formikProps.errors.description_app}</Text>
        <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly"}}>
                <CheckBox value={isFamily} onValueChange={() => onPressFamily(formikProps)} />
                <Text style={{color: 'white'}}>Family</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly"}}>
                <CheckBox value={!isFamily} onValueChange={() => onPressIndividual(formikProps)} />
                <Text style={{color: 'white'}}>Individual</Text>
                </View>
        </View>
        <Text style={{color: 'red'}}>{formikProps.errors.isFamily}</Text>               
        <Button title="submit" onPress={formikProps.handleSubmit}></Button>
        </CardView>           
        </View>        
        }                    
        </Formik>
        </View>
        );    
}