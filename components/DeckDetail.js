import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, blue } from '../utils/colors'

class DeckDetail extends Component {
    render () {
        const { navigation } = this.props
        const { title } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 25}}>Deck Detail - {title}</Text>
                <TouchableOpacity style={[styles.btn, {backgroundColor: blue}]} onPress={() => navigation.navigate('AddCard')}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: white}]} onPress={() => navigation.navigate('Quiz')}>
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
    }
})

export default DeckDetail