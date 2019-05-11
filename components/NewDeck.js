import React, { Component } from 'react'
import { Text, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { gray } from '../utils/colors'
import { saveDeckTitle, DECK_STORAGE_KEY } from '../utils/api'
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
    
            this.toCard(title)
            
            saveDeckTitle({title, deck})
    
            clearLocalNotification()
                .then(setLocalNotification)
        } else {
            alert('You need to enter a deck title')
        }
    }
    toCard = (title) => {
        this.props.navigation.navigate('DeckDetail', {title: title})
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