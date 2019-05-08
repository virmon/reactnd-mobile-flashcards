import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, blue, gray } from '../utils/colors'
import { connect } from 'react-redux';

class DeckDetail extends Component {
    render () {
        const { navigation, decks } = this.props
        const { title } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 40}}>{title}</Text>
                <Text style={styles.number}>{decks[title].questions.length} cards</Text>
                <TouchableOpacity style={[styles.btn, {backgroundColor: blue}]} onPress={() => navigation.navigate('AddCard', {title})}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: white}]} onPress={() => navigation.navigate('Quiz', {title})}>
                    <Text>Start Quiz</Text>
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
        height: 20,
        padding: 30,
        margin: 20
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