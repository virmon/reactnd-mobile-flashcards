import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import DeckItem from './DeckItem'
import { connect } from 'react-redux'
import { getDecks, formatDecksResults } from '../utils/api'
import { _getDecks } from '../utils/_DATA'
import { receiveDecks } from '../actions';
import { gray } from '../utils/colors'

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
        return (
            <View>
                {formatDecksResults(JSON.stringify(decks)).length > 0
                    ?   <FlatList
                            data={formatDecksResults(JSON.stringify(decks))}
                            renderItem={this.renderItems}
                            keyExtractor={(item) => item.title.toString()}
                        />
                    : <Text style={{fontSize: 18, color: gray, margin: 20}}>No Deck Available</Text>
                }
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