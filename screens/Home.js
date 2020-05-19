import React from "react";
import {View, Text, StatusBar, Dimensions, StyleSheet, Image } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cocktail = require('../images/cocktail.png')
const drinking = require('../images/drinking.png')
const mojitonic = require('../images/test.png')

class Home extends React.Component {
     
    componentDidMount() {
        StatusBar.setHidden(true);

    }

    render() {
        return (

            <View style={styles.container}>
               { /*<Text style={styles.title}>Mojitonic</Text>*/}
                <Image source={mojitonic}></Image> 
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 80
    }
});



export default Home