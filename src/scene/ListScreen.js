import React from 'react'
import styled from 'styled-components/native'
import { FlatList, TouchableHighlight } from 'react-native'
import { Card } from '../component/Card';
import { LoadingModal } from '../component/LoadingModal';
import { DeckStore } from '../store/DeckStore';
import { MyButton } from '../component/MyButton';
import { Theme } from '../theme';
import { Subscribe } from 'unstated';
import map from 'lodash/map';

const Container = styled.View`
    flex-direction: column;
    flex: 1;
`

const AddContainer = styled.View`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 16px;
`

const DeckContainer = styled(Card)`
    align-items: center;
    padding: 16px 8px;
    justify-content: center;
`

const DeckTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

const DeckCardCount = styled.Text`
    font-size: 14px;
`

class _ListScreen extends React.Component {

    get deckStore() {
        return this.props.deckStore
    }

    state = {
        loading: true
    }

    componentDidMount() {
        this.reloadDecks()
    }

    openAddDeckScreen = () => {
        this.props.navigation.navigate('AddDeck')
    }

    reloadDecks = async () => {
        await this.deckStore.loadDecks()
        this.setState({
            loading: false
        })
    }

    renderItem = ({ item: deck }) => {
        const cardCount = deck.questions.length
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Deck', { 
                deck: deck 
            })}>
                <DeckContainer >
                    <DeckTitle>{ deck.title }</DeckTitle>
                    <DeckCardCount>{ cardCount + (cardCount == 1 ? ' card' : ' cards') }</DeckCardCount>
                </DeckContainer>
            </TouchableHighlight>
        )
    }

    render() {
        const decks = !this.state.loading ? map(this.deckStore.state.decks, (v, id) => ({
            ...v,
            id
        })) : null
        return (
            <Container>
                { decks ? (
                    <FlatList
                        style={{
                            marginBottom: 64
                        }}
                        data={decks}
                        keyExtractor={(i) => i.id}
                        renderItem={this.renderItem}
                    />
                ) : null }
                <AddContainer>
                    <MyButton style={{ width: '100%' }} title="New Deck" onPress={this.openAddDeckScreen}/>
                </AddContainer>
                <LoadingModal visible={this.state.loading}/>
            </Container>
        )
    }

}

export const ListScreen = (props) => (
    <Subscribe to={[ DeckStore ]}>
        { (deckStore) => <_ListScreen deckStore={deckStore} {...props}/> }
    </Subscribe>
)

ListScreen.navigationOptions = {
    title: 'Deck List',
    headerTitleStyle: {
        color: 'white'
    },
    headerStyle: {
        backgroundColor: Theme.primaryColor,
    },
}