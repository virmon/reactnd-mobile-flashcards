import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import DeckItem from './DeckItem'
import { connect } from 'react-redux'
import { getDecks, formatDecksResults } from '../utils/api'
import { _getDecks } from '../utils/_DATA'
import { receiveDecks } from '../actions';

class DeckList extends Component {
    componentDidMount () {
        const { dispatch } = this.props

        getDecks()
            .then((deck) => {
                dispatch(receiveDecks(JSON.parse(deck)))
            })
    }
    renderItems = ({ item }) => {
        return <DeckItem {...item} navigation={this.props.navigation}/>
    }
    render () {
        const { decks } = this.props
        console.log('PROPS', formatDecksResults(JSON.stringify(decks)))
        return (
            <View>
                <FlatList
                    data={formatDecksResults(JSON.stringify(decks))}
                    renderItem={this.renderItems}
                />
            </View>
        )
    }
}

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)