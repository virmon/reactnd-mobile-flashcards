import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { removeDeck } from '../actions'
import { removeDeckItem } from '../utils/api'
import { white, gray, red } from '../utils/colors'
import { connect } from 'react-redux';

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Deck`
        }
    }
    deleteDeck = (title, navigation) => {
        const { dispatch } = this.props

        dispatch(removeDeck(title))

        removeDeckItem({ title })
        
        navigation.navigate('DeckList')
    }
    render () {
        const { navigation, decks } = this.props
        const { title } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 40}}>{title}</Text>
                <Text style={styles.number}>{!decks[title] ? 0 : decks[title].questions.length} cards</Text>
                <TouchableOpacity style={[styles.btn, {backgroundColor: gray}]} onPress={() => navigation.navigate('AddCard', {title})}>
                    <Text style={styles.btnText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: gray}]} onPress={() => navigation.navigate('Quiz', {title})}>
                    <Text style={styles.btnText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteDeck(title, navigation)}>
                    <Text  style={{fontSize: 18, color: red, margin: 20}}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: 200,
        height: 60,
        padding: 20,
        margin: 20
    },
    btnText: {
        color: white,
        fontSize: 18,
        textAlign: 'center'
    },
    number: {
        fontSize: 16,
        color: gray,
        padding: 10
    }
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckDetail)