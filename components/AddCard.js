import React, { Component } from 'react'
import { TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { gray } from '../utils/colors' 
import SubmitBtn from './SubmitBtn'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Add Card`
        }
    }
    state = {
        question: '',
        answer: ''
    }
    submit = () => {
        const { title } = this.props.navigation.state.params
        const { dispatch } = this.props
        const card = this.state
        this.setState({ title })

        dispatch(addCard({ title, card}))

        this.setState({ 
            title: '',
            question: '', 
            answer: '' 
        })

        this.props.navigation.navigate('DeckDetail')

        addCardToDeck({ card, title })

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

export default connect()(AddCard)