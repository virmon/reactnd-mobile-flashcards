import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { blue, gray } from '../utils/colors'
import { getDecks, saveDeckTitle, DECK_STORAGE_KEY } from '../utils/api'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { addDeck } from '../actions'
import SubmitBtn from './SubmitBtn'
import { connect } from 'react-redux'

class NewDeck extends Component {
    state = {
        title: '',
        questions: []
    }
    submit = () => {
        const title = this.state.title
        const deck = this.state

        if (title !== '') {
            this.props.dispatch(addDeck({
                [title]: deck
            }))
    
            this.setState(() => ({
                title: '' 
            }))
    
            this.toHome()
            
            saveDeckTitle({title, deck})
    
            clearLocalNotification()
                .then(setLocalNotification)
        } else {
            alert('You need to enter a deck title')
        }
    }
    clearData = async () => {
        try {
            AsyncStorage.removeItem(DECK_STORAGE_KEY)
            console.log('clear data')
        }

        catch(error) {
            console.log(error)
        }
    }
    toHome = () => {
        this.props.navigation.navigate('DeckList')
    }
    render () {
        const { title } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={{fontSize: 25}}>What is the title of your new deck?</Text>
                <TextInput
                    value={title}
                    style={styles.input}
                    onChangeText={(text) => this.setState({ title: text })}
                    placeholder='Input deck title'
                />
                <SubmitBtn onPress={this.submit}>
                    Submit
                </SubmitBtn>
                <SubmitBtn onPress={this.clearData}>
                    Clear all data
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

export default connect()(NewDeck)