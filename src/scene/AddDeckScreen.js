import React from 'react'
import styled from 'styled-components/native'
import { DeckStore } from '../store/DeckStore';
import { MyButton } from '../component/MyButton';
import { MyTextInput } from '../component/MyTextInput';
import { Theme } from '../theme';
import { Subscribe } from 'unstated';

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`

const Title = styled.Text`
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    margin: 16px 0;
    max-width: 350px;
`

class _AddDeckScreen extends React.Component {

    get deckStore() {
        return this.props.deckStore
    }

    state = {
        deck: ''
    }

    onAddDeck = () => {
        this.deckStore.addDeck(this.state.deck)
        this.props.navigation.pop()
    }

    render() {
        return (
            <Container>
                <Title>What's the title of your new deck?</Title>
                <MyTextInput
                    style={{ marginVertical: 16, width: '90%', fontSize: 14 }}
                    onChangeText={deck => this.setState({ deck })}
                    value={this.state.deck}
                />
                <MyButton
                    disabled={this.state.deck.length <= 4}
                    title="Submit"
                    onPress={this.onAddDeck}
                />
            </Container>
        )
    }

}

export const AddDeckScreen = (props) => (
    <Subscribe to={[ DeckStore ]}>
        { (deckStore) => <_AddDeckScreen deckStore={deckStore} {...props}/> }
    </Subscribe>
)

AddDeckScreen.navigationOptions = {
    title: 'New Deck',
    headerTitleStyle: {
        color: 'white'
    },
    headerStyle: {
        backgroundColor: Theme.primaryColor,
    },
}