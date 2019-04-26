import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { gray } from '../utils/colors' 
import SubmitBtn from './SubmitBtn'

class Quiz extends Component {
    state = {
        isAnswer: true
    }
    render () {
        const { isAnswer } = this.state
        return (
            <View behavior='padding' style={styles.container}>
                <Text style={{alignSelf: 'flex-start', justifyContent: 'flex-start'}}>2/2</Text>
                <Text>Does React Native work with Android?</Text>
                <Text>{isAnswer ? 'answer' : 'question'}</Text>
                <TouchableOpacity>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Incorrect</Text>
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
    }
})

export default Quiz