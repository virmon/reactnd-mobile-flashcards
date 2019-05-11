import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

const DeckItem = ({ navigation, title, questions }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('DeckDetail', {title: title})}>
            <Text style={{fontSize: 25}}>{title}</Text>
            <Text style={styles.number}>{questions ? questions.length : 0} cards</Text>
        </TouchableOpacity>
    )
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