import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { ListScreen } from './scene/ListScreen';

const Navigator = createStackNavigator({
    List: {
        screen: ListScreen
    },
}, {
    headerMode: 'screen',
    initialRouteName: 'List'
})

const NavContainer = createAppContainer(Navigator)

export default class App extends React.Component {

    render() {
        return (
            <NavContainer/>
        )
    }

}
