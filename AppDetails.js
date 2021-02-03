import React from 'react';
import {TouchableOpacity, View, ScrollView, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {globalStyles} from './globalStyles';
import CardView from 'react-native-cardview';

const {width: WIDTH} = Dimensions.get("window")

export default class AppDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed1: true,
            collapsed2: true,
            collapsed3: true,
            collapsed4: true,
        };
    }

    toggleExpandedFirst = () => {
        this.setState({collapsed1: !this.state.collapsed1});
    };

    toggleExpandedSecond = () => {
        this.setState({collapsed2: !this.state.collapsed2});
    };

    toggleExpandedThird = () => {
        this.setState({collapsed3: !this.state.collapsed3});
    };

    toggleExpandedFourth = () => {
        this.setState({collapsed4: !this.state.collapsed4});
    };

    render(){
        return(
        <ScrollView contentContainerStyle={[globalStyles.container, {justifyContent: 'flex-start'}]}>
        <View style={{justifyContent: 'space-between', paddingTop: 20}}>
          <CardView style={globalStyles.formCard} cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}
                  cornerOverlap={false}>
          <Text style={globalStyles.formTitle}>Details of Appointment</Text>
          <TouchableOpacity onPress={() => this.toggleExpandedFirst()}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>Accepted Users</Text>
            <Text style={globalStyles.cardTextNumber}>{this.props.route.params.detailData.numberofaccept}</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed1}>
            {this.props.route.params.detailData.listofaccept.map((data) => {
                return (
                    <CardView
                style={{
                    backgroundColor: 'white',
                    flex: 1,
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
                </CardView>
                )
                })}
          </Collapsible>
          <TouchableOpacity onPress={() => this.toggleExpandedSecond()}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={globalStyles.cardText}>Rejected Users</Text>
            <Text style={globalStyles.cardTextNumber}>{this.props.route.params.detailData.numberofreject}</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed2} align="center">
            <View>
            {this.props.route.params.detailData.listofreject.map((data) => {
                return (
                  <CardView
                  style={{
                      backgroundColor: 'white',
                      flex: 1,
                      margin: 10,
                      padding: 10,
                    }}
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    cornerOverlap={false}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize: 15, alignContent: 'center',}}>Name/Surname</Text>
                  <Text>{data[0]} {data[1]}</Text>
                  </View>  
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize: 15, alignContent: 'center',}}>Email</Text>
                  <Text>{data[2]}</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize: 15, alignContent: 'center',}}>Telephone</Text>
                  <Text>{data[4]}</Text>
                  </View> 
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize: 15, alignContent: 'center',}}>Address</Text>
                  <Text>{data[3]}</Text>
                  </View>  
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize: 15, alignContent: 'center',}}>Description</Text>
                  <Text>{data[5]}</Text>
                  </View>            
                  </CardView>
                )
                })}
            </View>
          </Collapsible>
          <TouchableOpacity onPress={() => this.toggleExpandedThird()}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={globalStyles.cardText}>Not Answered Users</Text>
              <Text style={globalStyles.cardTextNumber}>{this.props.route.params.detailData.numberofnotr}</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed3} align="center">
            <View>
            {this.props.route.params.detailData.listofnotr.map((data) => {
                return (
                  <CardView
                  style={{
                      backgroundColor: 'white',
                      flex: 1,
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
                  </CardView>
                )
                })}             
            </View>
          </Collapsible>
          <TouchableOpacity onPress={() => this.toggleExpandedFourth()}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={globalStyles.cardText}>Users Came To Appointment</Text>
              <Text style={globalStyles.cardTextNumber}>{this.props.route.params.detailData.numberofcame}</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed4} align="center">
            <View>
            {this.props.route.params.detailData.listofcame.map((data) => {
                return (
                  <CardView
                  style={{
                      backgroundColor: 'white',
                      flex: 1,
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
                  </CardView>
                )
                })}             
            </View>
          </Collapsible>
          </CardView>
        </View>
        </ScrollView>
        );
    };          
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});