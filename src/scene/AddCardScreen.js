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


class _AddCardScreen extends React.Component {

    get deckStore() {
        return this.props.deckStore
    }

    state = {
        question: '',
        answer: ''
    }

    onAddCard = async (deckId) => {
        const { question, answer } = this.state
        const card = {
            question, answer
        }
        await this.deckStore.addCardToDeck(deckId, card)
        this.props.navigation.pop()
    }

    render() {
        const deck = this.props.navigation.getParam('deck', 'no deck selected')
        return (
            <Container>
                <MyTextInput
                    style={{ marginVertical: 16, width: '90%', fontSize: 14 }}
                    onChangeText={question => this.setState({ question })}
                    value={this.state.question}
                    placeholder='Question'
                />
                <MyTextInput
                    style={{ marginVertical: 16, width: '90%', fontSize: 14 }}
                    onChangeText={answer => this.setState({ answer })}
                    value={this.state.answer}
                    placeholder='Answer'
                />
                <MyButton
                    title="Submit"
                    onPress={() => this.onAddCard(deck.id)}
                />
            </Container>
        )
    }

}

export const AddCardScreen = (props) => (
    <Subscribe to={[ DeckStore ]}>
        { (deckStore) => <_AddCardScreen deckStore={deckStore} {...props}/> }
    </Subscribe>
)

AddCardScreen.navigationOptions = {
    title: 'New Card',
    headerTitleStyle: {
        color: 'white'
    },
    headerStyle: {
        backgroundColor: Theme.primaryColor,
    },
}