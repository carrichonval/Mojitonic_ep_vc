import React from "react";
import { View, Text, StatusBar, Dimensions, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import * as Font from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


class CocktailDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.state.params.cocktailId,
            cocktail: [],
            ingredients: [],
            isReady: false
        };
    }

    static navigationOptions = { title: "Detail of the cocktail" }


    async componentDidMount() {
        await Font.loadAsync({
            "Roboto":require('../assets/fonts/Roboto-Regular.ttf'),
            "Strange":require('../assets/fonts/DancingScript-VariableFont_wght.ttf'),
            "Third":require('../assets/fonts/KaushanScript-Regular.ttf'),
        });
         this.setState({
             isReady:true
         })
        StatusBar.setHidden(true);
        this.fetchCocktailDetail();
    }



    fetchCocktailDetail() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + this.state.id, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(reponse.statusText)
                }
                return response.json();
            })
            .then((json) => {
                var ingredients = [];
                var cocktail = json.drinks[0]
                for (let i = 1; i < 16; i++) {
                    if (cocktail["strIngredient" + i] !== null) {
                        ingredients.push({ key: cocktail["strIngredient" + i], value: (cocktail["strMeasure" + i] === null) ? 'optional' : cocktail["strMeasure" + i] });
                    }
                }
                console.log(ingredients)
                this.setState({
                    cocktail: cocktail,
                    ingredients: ingredients
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
         if(!this.state.isReady){
             return null
         }

        return (
            <View style={styles.container}>
                <Image style={styles.img} source={{ uri: this.state.cocktail.strDrinkThumb }} />
                <Text style={styles.name}>{this.state.cocktail.strDrink}</Text>
                <FlatList style={styles.list}
                    data={[
                        { key: "Category", value: this.state.cocktail.strCategory },
                        { key: "Alcohol", value: this.state.cocktail.strAlcoholic },
                        { key: "Type of glass", value: this.state.cocktail.strGlass },
                        { key: "Instructions to follow", value: this.state.cocktail.strInstructions }
                    ]}
                    renderItem={({ item }) => <View style={styles.details}>
                        <Text style={styles.section}>{item.key}</Text>
                        <Text style={styles.elem}> : {item.value}</Text>
                    </View>}
                />
                <Text style={styles.section}>Here are the ingredients and the doses</Text>
                <FlatList style={styles.ingredients}
                    data={this.state.ingredients}
                    renderItem={({ item }) => <Text> - {item.key} &#x2794; {item.value}</Text>}
                />
            </View>

        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        backgroundColor: '#ffffff',
        paddingTop: 15,
    },
    name: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 15,
        fontFamily: "Third"
    },
    img: {
        display: 'flex',
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    section: {
        fontWeight: "bold",
        marginBottom: 5
    },
    elem: {
        flex: 1,
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginBottom: 15,
    },
    ingredients: {
        marginLeft: 10
    }
});



export default CocktailDetail