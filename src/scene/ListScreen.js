import React from 'react'
import styled from 'styled-components/native'
import { FlatList, Text } from 'react-native'
import { Card } from '../component/Card';
import { LoadingModal } from '../component/LoadingModal';
import { DeckStore } from '../store/DeckStore';

const Container = styled.View`
    flex-direction: column;
    flex: 1;
`

export class ListScreen extends React.Component {

    deckStore = new DeckStore()

    state = {
        loading: true,
        decks: []
    }

    async componentDidMount() {
        const decks = await this.deckStore.getDecks()
        this.setState({
            loading: false,
            decks
        })
    }

    renderItem = ({ item: deck }) => {
        return (
            <Card>
                <Text>{ JSON.stringify(deck) }</Text>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <FlatList
                    data={this.state.decks}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderItem}
                />
                <LoadingModal visible={this.state.loading}/>
            </Container>
        )
    }

}