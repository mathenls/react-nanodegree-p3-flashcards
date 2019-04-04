import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { ListScreen } from './scene/ListScreen';
import { AddDeckScreen } from './scene/AddDeckScreen';
import { Provider } from 'unstated';
import { DeckStore } from './store/DeckStore';

const Navigator = createStackNavigator({
    List: ListScreen,
    AddDeck: AddDeckScreen
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
