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

export default function AddFamilyMember({ route , navigation }){
    const[date, setDate] = useState(route.params.updateData.birthday);

    const onChange = (formikProps,date) => {
        setDate(date);
        formikProps.setFieldValue('birthday',date);
    }

    return(
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Formik
            initialValues={{name:route.params.updateData.name, surname:route.params.updateData.surname, email:route.params.updateData.email, telephoneno:route.params.updateData.telephone, address:route.params.updateData.address, birthday:route.params.updateData.birthday, degree:route.params.updateData.degree}}
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
                      method: 'put',
                      url: 'http://192.168.1.4:8083/api/updatemember/'+ route.params.updateData.memberID,
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
            <Text style={globalStyles.formTitle}>Update Family Member</Text>
            <Text style={globalStyles.dateTitle}>Name</Text> 
                <TextInput
                   style={globalStyles.textInputStyle}
                   value={formikProps.values.name}
                   onChangeText={formikProps.handleChange('name')}
                   placeholder="Name"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.name}</Text> 
                <Text style={globalStyles.dateTitle}>Surname</Text> 
                <TextInput
                   style={globalStyles.textInputStyle}
                   value={formikProps.values.surname}
                   onChangeText={formikProps.handleChange('surname')}
                   placeholder="Surname"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.surname}</Text>
                <Text style={globalStyles.dateTitle}>Email</Text>  
                <TextInput
                   style={globalStyles.textInputStyle}
                   value={formikProps.values.email}
                   onChangeText={formikProps.handleChange('email')}
                   keyboardType='email-address'
                   placeholder="E-mail"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.email}</Text> 
                <Text style={globalStyles.dateTitle}>Telephone</Text>
                <TextInput
                   style={globalStyles.textInputStyle}
                   value={formikProps.values.telephoneno}
                   onChangeText={formikProps.handleChange('telephoneno')}
                   keyboardType='phone-pad'
                   placeholder="Telephone Number"
                   placeholderTextColor="white"
                />
                <Text style={{color: 'red'}}>{formikProps.errors.telephoneno}</Text> 
                <Text style={globalStyles.dateTitle}>Address</Text>
                <TextInput
                   style={globalStyles.textInputStyle}
                   value={formikProps.values.address}
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
                <Text style={globalStyles.dateTitle}>Degree</Text>
                <TextInput
                   style={globalStyles.textInputStyle}
                   value={formikProps.values.degree}
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