import React from "react";
import { ActivityIndicator,View, Text, StatusBar, Dimensions, StyleSheet, TextInput, Button, Image, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Cocktail extends React.Component {

    // Hide header title
    // static navigationOptions= { headerShown: false }

    // Show
    static navigationOptions = { title: "Let's find some cocktails" }


    constructor(props) {
        super(props)
        this.state = {
            cocktails: [],
            ingredient: '',
            displayCocktail: false,
            displayError: false,
            load:false
        };
    }

    // On page load
    componentDidMount() {
        // Hide status bar on top of the phone
        StatusBar.setHidden(true);
    }

    // https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
    fetchCocktails() {
        //faire genre ca charge
        this.setState({
            load:true,
            displayCocktail:false,
            displayError:false,
            cocktails:[]
        })

        setTimeout(()=>{
            fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + this.state.ingredient, {
                method: 'GET',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(reponse.statusText)
                    }
                    if (response._bodyInit._data.size === 0) {
                        this.setState({
                            displayCocktail: false,
                            displayError: true,
                            load:false
                        })
                    } else {
                        // console.log(response.json())
                        return response.json()
                    }
                })
                .then((json) => {
                    if (json.drinks === null) {
                        this.setState({
                            displayCocktail: false,
                            displayError: true,
                            load:false
                        })
                    }
                    else {
                        this.setState({
                            cocktails: json.drinks,
                            displayCocktail: true,
                            displayError: false,
                            load:false
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        },1500)
        
    }

    search(text) {
        this.setState({
            ingredient: text
        })
    }

    render() {
        return (

            <View style={styles.view}>

                {/* Make the current view scrollable */}
                <ScrollView style={styles.ScrollView} ref='test'>
                    <TextInput placeholder="Choose an ingredient ..." 
                        style={styles.textInput}
                        onChangeText={this.search.bind(this)}
                    />

                        <TouchableOpacity
                                style={styles.button}
                                onPress={this.fetchCocktails.bind(this)}
                        >
                            <Text style={{color:'white'}}>SEARCH</Text>
                        </TouchableOpacity>

                    {this.state.displayCocktail ? <Text style={styles.found}>Here's what we've found for you :</Text> : null}
                    {this.state.load ?  <ActivityIndicator style={styles.loader} size="large" color="#0000ff" /> : null}
                    


                    {/* Foreach loop */}

                    {this.state.displayError ? <Text style={styles.error}>No match with input ingredient ...</Text> :
                        this.state.cocktails.map(cocktail => {
                            return (
                                <View key={cocktail.idDrink}>
                                    <Text
                                        onPress={() => this.props.navigation.navigate('CocktailDetail', { cocktailId: cocktail.idDrink })}> <Image style={styles.img} source={{uri: cocktail.strDrinkThumb}} />  {cocktail.strDrink}</Text>
                                </View>
                                
                            )
                        })
                    }

                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    ScrollView: {
        width: screenWidth,
        height: screenHeight-20,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight:10,
        
    },
    view:{
        alignItems: 'center',
        paddingTop:10,
        backgroundColor:"#FFFFFF",
    },
    TextInput: {
        width: screenWidth / 3,
    },
    img: {
        width: 120, 
        height: 120
    },
    button: {
        marginTop:7,
        alignItems: 'center',
        backgroundColor: "#2870f7",
        padding: 10,
        borderRadius:10
    },
    textInput:{
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius:5,
        paddingLeft:10,
        paddingBottom:5
    },
    loader:{
        paddingTop:screenHeight/3
    },
    error:{
        fontSize:15,
        textAlign:"center",
        paddingTop:screenHeight/3
    },
    found:{
        fontSize:15,
        textAlign:"center",
    }
});

export default Cocktail
