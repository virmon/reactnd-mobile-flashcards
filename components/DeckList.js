import React, { Component } from 'react'
import { View, Text } from 'react-native'
import DeckItem from './DeckItem'

class DeckList extends Component {
    render () {
        return (
            <View>
                <Text>Decks</Text>
                <DeckItem />
                <DeckItem />
            </View>
        )
    }
}

export default DeckList