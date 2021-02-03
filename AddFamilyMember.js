import React, { useState } from 'react';
import {Text, ScrollView ,View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, Button} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {StackActions} from '@react-navigation/native';
import {parse, isDate} from 'date-fns';
import axios from 'axios';
import {globalStyles} from './globalStyles';
import CardView from 'react-native-cardview';

const {width: WIDTH} = Dimensions.get("window")
const memberValSchema = yup.object({
    name: yup.string().required('You must write a name'),
    surname: yup.string().required('You must write a surname'),
    email: yup.string().email('Email format please!').notRequired(),
    telephoneno: yup.string().required('You must write a telephone number to reach him/her.').max(13),
    address: yup.string().required('You must write an address to reach him/her.').min(5),
    birthday: yup.date().transform(parseDateString).required('You must write his/her birthday').max(new Date(),'Did you born in future?, Really?'),
    degree: yup.number().required('You must write the degree of relationship').min(1,'Degree can be above 1!'),
});

function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
  
    return parsedDate;
}

export default function AddFamilyMember({ navigation }){
    const[date, setDate] = useState(moment().format('YYYY-MM-DD'));

    const onChange = (formikProps,date) => {
        setDate(date);
        formikProps.setFieldValue('birthday',date);
    }

    return(
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Formik
            initialValues={{name:"", surname:"", email:"", telephoneno:"", address:"", birthday:moment().format('YYYY-MM-DD'), degree:1}}
            onSubmit={(values) => {
            const form = new FormData();
            form.append('name', values.name);
            form.append('surname', values.surname);
            form.append('email', values.email);
            form.append('telephone', values.telephoneno);
            form.append('address', values.address);
            form.append('birthday', values.birthday);
            form.append('degree', values.degree);
                axios(
                    {
                      method: 'post',
                      url: 'http://192.168.1.4:8083/api/createmember',
                      data: form, 
                      headers: {'Content-Type': 'multipart/form-data'}     
                    }).then(function (response){
                        console.log(response.data.message);
                        navigation.dispatch(
                            StackActions.pop(1)
                        );
                    }).catch(function (error){
                        console.log(error);
                    });
            }}
            validationSchema={memberValSchema}
            >
            {(formikProps) => 
            <ScrollView contentContainerStyle={{alignItems: "center", paddingVertical: 20}}>
                <CardView style={globalStyles.formCard} cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  cornerOverlap={false}>                         
            <Text style={globalStyles.formTitle}>Add New Family Member</Text>
                <TextInput
                    style={globalStyles.textInputStyle}
                   onChangeText={formikProps.handleChange('name')}
                   placeholder="Name"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.name}</Text> 
                <TextInput
                   style={globalStyles.textInputStyle}
                   onChangeText={formikProps.handleChange('surname')}
                   placeholder="Surname"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.surname}</Text> 
                <TextInput
                   style={globalStyles.textInputStyle}
                   onChangeText={formikProps.handleChange('email')}
                   keyboardType='email-address'
                   placeholder="E-mail"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.email}</Text> 
                <TextInput
                   style={globalStyles.textInputStyle}
                   onChangeText={formikProps.handleChange('telephoneno')}
                   keyboardType='phone-pad'
                   placeholder="Telephone Number"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.telephoneno}</Text> 
                <TextInput
                   style={globalStyles.textInputStyle}
                   onChangeText={formikProps.handleChange('address')}
                   placeholder="Address"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.address}</Text> 
                <Text style={globalStyles.dateTitle}>Date Of Birth</Text> 
                <DatePicker
                style={globalStyles.datePickerStyle}
                placeholder="Select Birthday"
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
                <Text style={{color: 'red'}}>{formikProps.errors.birthday}</Text> 
                <TextInput
                   style={globalStyles.textInputStyle}
                   onChangeText={formikProps.handleChange('degree')}
                   keyboardType='numeric'
                   placeholder="Degree"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.degree}</Text> 
                <Button title="submit" onPress={formikProps.handleSubmit}></Button>
                </CardView>
            </ScrollView>
            }
            </Formik>
        </ScrollView>
    );
}