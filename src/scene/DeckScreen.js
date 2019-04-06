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
const DeckCardCount = styled.Text`
    font-size: 14px;
`

class _DeckScreen extends React.Component {
    state = {
        deck: {}
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            this.loadDeck
        )
    }

    loadDeck = async () => {
        await this.props.deckStore.loadDecks()
        let deck = this.props.navigation.getParam('deck', 'no deck was selected')
        deck = {id: deck.id, ...this.props.deckStore.getDeck(deck.id)}
        this.setState({
            deck
        })
    }

    render() {
        const { deck } = this.state
        let cardCount
        if (deck && deck.questions) {
            cardCount = deck.questions.length
        }
        
        return deck && (
            <Container>
                <Title>{deck.title}</Title>
                <DeckCardCount>{ cardCount + (cardCount == 1 ? ' card' : ' cards') }</DeckCardCount>
                <MyButton
                    title="Add Card"
                    onPress={() => this.props.navigation.navigate('AddCard', { deck })}
                />
                <MyButton
                    title="Start Quiz"
                    onPress={() => this.props.navigation.navigate('Quiz', { questions: deck.questions })}
                />
            </Container>
        )
    }

}

export const DeckScreen = (props) => (
    <Subscribe to={[ DeckStore ]}>
        { (deckStore) => <_DeckScreen deckStore={deckStore} {...props}/> }
    </Subscribe>
)

DeckScreen.navigationOptions = {
    headerTitleStyle: {
        color: 'white'
    },
    headerStyle: {
        backgroundColor: Theme.primaryColor,
    },
}