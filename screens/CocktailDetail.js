import React from "react";
import { View, Text, StatusBar, Dimensions, StyleSheet,Image,FlatList,ScrollView} from "react-native";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


class CocktailDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.state.params.cocktailId,
            cocktail:[]
        };
    }

    static navigationOptions = { title: "Detail of the cocktail" }

    componentDidMount() {
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
              this.setState({
                cocktail: json.drinks[0]
              })
          })
          .catch((error) => {
            console.log(error)
          });
      }

    render() {
        return (

            // name = strDrink, category = strCategory, alcoholic = strAlcoholic, glass_type = strGlass, instructions = strInstructions
            // ingredients_list = strIngredient 1 to 15
            <View style={styles.container}>
                <Image style={styles.img} source={{uri: this.state.cocktail.strDrinkThumb}} />
                <Text style={styles.name}>{this.state.cocktail.strDrink}</Text>
                <FlatList 
                    data={[
                        {key:"Category", value:this.state.cocktail.strCategory},
                        {key:"Alcohol",value:this.state.cocktail.strAlcoholic},
                        {key:"Type of glass",value:this.state.cocktail.strGlass},
                        {key:"Instructions to follow",value:this.state.cocktail.strInstructions}
                    ]}
                    renderItem={({item}) => <Text>{item.key} : {item.value}</Text>}
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
        paddingTop: 15
    },
    name:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    img:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
});



export default CocktailDetail