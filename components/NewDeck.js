import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { blue, gray } from '../utils/colors'
import SubmitBtn from './SubmitBtn'

class NewDeck extends Component {
    state = {
        input: ''
    }
    render () {
        const { input } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={{fontSize: 25}}>What is the title of your new deck?</Text>
                <TextInput
                    value={input}
                    style={styles.input}
                    onChangeText={(text) => this.setState({ input: text })}
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

export default NewDeck