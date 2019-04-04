import { AsyncStorage } from 'react-native'
import map from 'lodash/map'
const generateId = require('uuid/v4');

const DECK_KEY = "DECK"

export class DeckStore {

    getDeck = async (id) => {
        const decks = await AsyncStorage.getItem(DECK_KEY)
        const selected = decks[id]
        return {
            id,
            ...selected
        }
    }

    getDecks = async () => {
        const decks = (await AsyncStorage.getItem(DECK_KEY)) || []
        return map(decks, (v, k) => ({
            id: k,
            ...v
        }))
    }

    addDeck = async (deckTitle) => {
        const id = generateId()
        const value = {
            title: deckTitle,
            questions: []
        } 
        await AsyncStorage.setItem(DECK_KEY, JSON.stringify({
            [id]: value
        }))
        return id
    }

    addCardToDeck = (id, card) => {
        const decks = getDecks()
        // TODO
    }

}