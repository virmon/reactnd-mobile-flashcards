import React, { Component } from 'react'
import { TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { gray } from '../utils/colors' 
import SubmitBtn from './SubmitBtn'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }
    render () {
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput 
                    style={styles.input} 
                    value={question} 
                    onChangeText={(question) => this.setState({ question: question })}
                    placeholder='Input question'
                />
                <TextInput 
                    style={styles.input} 
                    value={answer} 
                    onChangeText={(answer) => this.setState({ answer: answer })}
                    placeholder='Input answer'
                />
                <SubmitBtn onPress={() => console.log('submit')}>
                    Submit
                </SubmitBtn>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: gray,
        width: 300,
        height: 50,
        padding: 8,
        margin: 20
    }
})

export default AddCard