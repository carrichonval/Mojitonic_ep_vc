import React from "react";
import { View, Text,StatusBar,Dimensions,StyleSheet,Image} from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ginTonic = require('../images/gin-tonic.png')
const linkedin = require('../images/linkedin.png')
const mojito = require('../images/mojito.png')

class Infos extends React.Component{

    componentDidMount() {
        StatusBar.setHidden(true);
        
    }
    
    render(){
        return  (
            
            <View style={{backgroundColor:'#FFFFFF',flex:1,alignItems:"center",justifyContent:'space-around',flexDirection:'column'}}>
                <View style={{backgroundColor:'#FFFFFF',flex:0.7,alignItems:"center",flexDirection:'column',marginTop:70}}>
                    <Text>Created By :</Text>
                </View>
                <View style={{backgroundColor:'#FFFFFF',flex:1,alignItems:"center",flexDirection:'column'}}>
                    <Text>Eloi</Text>
                    <Text style={{height:50}}><Image style={{width: 30,height: 30,resizeMode: 'stretch',}} source={linkedin}></Image> : dfdfdfdf</Text>
                    
                    <Image source={mojito}></Image>
                    <Image source={ginTonic}></Image>
                </View>
                <View style={{backgroundColor:'#FFFFFF',flex:1,alignItems:"center",flexDirection:'column'}}>
                    <Text>Valentin</Text>
                    <Text style={{height:50}}><Image style={{width: 30,height: 30,resizeMode: 'stretch',}} source={linkedin}></Image> : dfdfdfdf</Text>
                </View>
            </View>
            
        )
    }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        width:screenWidth,
        backgroundColor:'#ffffff',
        paddingTop:15,
        paddingLeft:10,
        paddingRight:10
    }
  });

export default Infos