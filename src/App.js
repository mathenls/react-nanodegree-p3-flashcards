import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { ListScreen } from './scene/ListScreen';
import { AddDeckScreen } from './scene/AddDeckScreen';
import { AddCardScreen } from './scene/AddCardScreen';
import { DeckScreen } from './scene/DeckScreen';
import QuizScreen from './scene/QuizScreen';
import { Provider } from 'unstated';
import { DeckStore } from './store/DeckStore';

const Navigator = createStackNavigator({
    List: ListScreen,
    AddDeck: AddDeckScreen,
    Deck: DeckScreen,
    AddCard: AddCardScreen,
    Quiz: QuizScreen
}, {
    headerMode: 'screen',
    initialRouteName: 'List'
})

const NavContainer = createAppContainer(Navigator)

export default class App extends React.Component {

    render() {
        return (
            <Provider inject={[ new DeckStore() ]}>
                <NavContainer/>
            </Provider>
        )
    }

}
