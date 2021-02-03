import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#a18b5f',
        justifyContent: "space-around",
        alignItems: 'center',
     },
     card: {
        backgroundColor: '#874fa1',
        padding: 10,
        width: WIDTH - 50,
     },
     cardWelcome: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
     },
     cardText: {         
        color: 'white',
        fontSize: 15,
        alignContent: 'center',
     },
     cardTextNumber: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
     },
     cardTitle: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
     },
     cardTitleText: {
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'center',
      fontSize: 17,
     },
     btnUpdate: {
      width: WIDTH - 95,
      height: 45,
      borderRadius: 25,
      justifyContent: "center",
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: '#008cff',
    },
    btnUpdateText: {
       textAlign: 'center',
       color: 'white',
       fontWeight: 'bold',      
    },
    listContainer: {
      flex: 1,
      justifyContent: 'space-between',      
      backgroundColor: '#a18b5f',
    },
    list: {
       flex: 12,
    },
    rowList: {
      justifyContent: 'center',
      padding: 18,
      backgroundColor: '#874fa1',
      borderBottomColor: '#e5e5e5',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    rowText: {
      color: '#ffffff',
      fontSize: 18,
    },
    rowBack: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      paddingHorizontal: 18,
    },
    backLeftBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
    },
    successBtn: {
      backgroundColor: '#1ADE2C',
      left: 0,
    },
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
    },  
    infoBtn: {
      backgroundColor: '#1A11E8',
      right: 75,
    },
    dangerBtn: {
      backgroundColor: '#EA1010',
      right: 0,
    },
    backTextSuccess: {
      color: '#000000',
      fontSize: 18,
    },
    backTextNeutral: {
      color: '#ffffff',
      fontSize: 18,
    },
    backTextDanger: {
      color: '#ffffff',
      fontSize: 18,
    },
    addButton: {
      bottom: 0,
      backgroundColor: '#008cff',      
    },
    addSomething: {
      flex: 1
    },
    formContainer: {
      flex: 1,
      backgroundColor: '#a18b5f',
      justifyContent: "center",
    },
    formCard: {
      backgroundColor: "#874fa1",
      width: WIDTH - 20,
      padding: 20,
    },
    formTitle: {
      color: "#ffffff",
      fontSize: 22,
      paddingBottom: 50,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dateTitle: {
      color: "#ffffff",
      paddingBottom: 5,
    },
    datePickerStyle: {
      alignSelf: 'center',
      width: WIDTH - 60,
    },
    textInputStyle: {
      borderWidth: 1,
      borderColor: 'white',
      padding: 10,
      marginBottom: 3,
      color: 'white',
    },
    btnLogin: {
      height: 35,
      marginTop: 20,
      justifyContent: "center",
      backgroundColor: '#008cff'
    },
    btnText: {
      textAlign: "center",
      color: 'white',
    }
});