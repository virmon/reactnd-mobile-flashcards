import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { blue, gray } from '../utils/colors'

class DeckItem extends Component {
    handlePress () {
        console.log('pressed')
    }
    render () {
        return (
            <View style={styles.container} onPress={() => console.log('pressed')}>
                <Text style={{fontSize: 25}}>{this.props.title}</Text>
                <Text style={styles.number}>{this.props.cards} cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        borderBottomWidth: 1,
        borderColor: gray
    },
    number: {
        fontSize: 16,
        color: gray,
        padding: 10
    }
})

export default DeckItem