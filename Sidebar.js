import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { Container, Content, List, ListItem, Left, Text } from 'native-base';

const datas = [
    {
        name: "Appointments",
        route: "AllAppointments"
    },
    {
        name: "Family Members",
        route: "AllFamilyMembers"
    }
];
export default class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'red'}}>
                <Content
                bounces={false}
                style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
                    <List
                    dataArray={datas}
                    renderItem={data =>
                        <ListItem
                        button
                        noBorder
                        onPress={() => this.props.navigation.navigate(data.route)}
                    >
                        <Left>
                        <Text style={styles.text}>
                        {data.name}
                        </Text>
                        </Left>
                    </ListItem>
                    }
                    />
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   text:{
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
   }     
}
)