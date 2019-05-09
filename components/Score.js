import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { gray, white } from '../utils/colors'

class Score extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Score`
        }
    }
    render () {
        const { navigation } = this.props
        const { score, total } = navigation.state.params
        return (
            <View behavior='padding' style={styles.container}>
                <Text style={styles.score}>{'You scored ' + (score/total*100).toFixed(0) + '%'}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Quiz')} style={[styles.btn, {backgroundColor: gray}]} >
                    <Text style={styles.btnText}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DeckList')} style={[styles.btn, {backgroundColor: gray}]} >
                    <Text style={styles.btnText}>Back to Deck</Text>
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
        margin: 20,
    },
    btnText: {
        color: white,
        fontSize: 18,
        textAlign: 'center'
    },
    score: {
        fontSize: 40,
        padding: 10
    }
})

export default Score