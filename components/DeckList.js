import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import DeckItem from './DeckItem'

const data = [
    {
        key: 1,
        title: 'Deck 1',
        cards: 10
    },
    {
        key: 2,
        title: 'Deck 2',
        cards: 20
    }
]

class DeckList extends Component {
    renderItems = ({ item }) => {
        return <DeckItem key={item.key} {...item} navigation={this.props.navigation}/>
    }
    render () {
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={this.renderItems}
                />
            </View>
        )
    }
}

export default DeckList