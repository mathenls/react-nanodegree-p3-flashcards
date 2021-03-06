import {
    AsyncStorage
} from 'react-native'
import { Container } from 'unstated'

const generateId = require('uuid/v4');

const DECK_KEY = "DECK"

/*
{
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}
*/

export class DeckStore extends Container {

    state = {
        decks: {}
    }

    async loadDecks() {
        const decks = JSON.parse(await AsyncStorage.getItem(DECK_KEY)) || {}
        await this.setState({
            decks
        })
    }

    getDeck = (id) => this.state.decks[id]

    addDeck = async (deckTitle) => {
        const id = generateId()
        const value = {
            title: deckTitle,
            questions: []
        }
        const curDecks = this.state.decks ? this.state.decks : {}
        const decks = {
            ...curDecks,
            [id]: value
        }
        await this.saveDecksToAsyncStorage(decks)
        await this.setState({ decks })
        return {id, ...value}
    }

    saveDecksToAsyncStorage = async (decks) => {
        await AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks))
    }

    clearAsyncStorage = async () => {
        await AsyncStorage.removeItem(DECK_KEY)
    }

    addCardToDeck = async (id, card) => {
        const decks = JSON.parse(await AsyncStorage.getItem(DECK_KEY)) || {}
        const deck = decks[id]
        deck.questions.push(card)
        decks[id] = deck
        await this.saveDecksToAsyncStorage(decks)
    }

}