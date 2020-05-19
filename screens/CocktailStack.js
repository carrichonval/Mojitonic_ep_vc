import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Cocktail from '../screens/Cocktail';
import CocktailDetail from '../screens/CocktailDetail';

const screens = {
    Cocktail: {
        screen: Cocktail
    },
    CocktailDetail: {
        screen: CocktailDetail,
    }
}

const CocktailStack = createStackNavigator(screens);

createAppContainer(CocktailStack)


export default CocktailStack