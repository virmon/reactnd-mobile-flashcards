import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, red } from '../utils/colors'
import { connect } from 'react-redux'

class Quiz extends Component {
    state = {
        currentQuestion: '',
        currentAnswer: '',
        questions: [],
        answered: 1,
        total: 0,
        isCorrect: false,
        correctAnswers: 0
    }
    componentDidMount () {
        const { navigation, decks } = this.props
        const title = navigation.state.params.title
        const listOfQuestions = decks[title].questions
    
        const firstQuestion = listOfQuestions.shift()
        listOfQuestions.push(firstQuestion)

        this.setState({ 
            total: listOfQuestions.length,
            questions: listOfQuestions,
            currentQuestion: firstQuestion.question,
            currentAnswer: firstQuestion.answer 
        })
    }
    toggleCard = () => {
        const { isAnswer } = this.state

        isAnswer
            ? this.setState({ isAnswer: false })
            : this.setState({ isAnswer: true })
    }
    checkAnswer = () => {
        const { questions, answered, total } = this.state

        if (answered !== total) {
            const nextQuestion = questions.shift()
            questions.push(nextQuestion)
            console.log('NEXT QUESTION',nextQuestion.question)
            
            this.setState({ 
                questions,
                currentQuestion: nextQuestion.question,
                currentAnswer: nextQuestion.answer,
                answered: answered + 1
            })
        } else {
            alert('Show score')
        }
    }
    render () {
        const { navigation, decks } = this.props
        const title = navigation.state.params.title
        console.log('PROPS', decks[title].questions)
        console.log('state',this.state.currentAnswer)
        return (
            <View behavior='padding' style={styles.container}>
                <Text style={{alignSelf: 'flex-start', justifyContent: 'flex-start'}}>{`${this.state.answered}/${this.state.total}`}</Text>
                <Text style={styles.question}>{this.state.currentQuestion}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Answer', {answer: this.state.currentAnswer, total: this.state.total, answered: this.state.answered, checkAnswer: this.checkAnswer})}>
                    <Text style={{color: red}}>Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.checkAnswer} style={[styles.btn, {backgroundColor: green}]} >
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.checkAnswer} style={[styles.btn, {backgroundColor: red}]} >
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
    },
    btn: {
        width: 200,
        height: 20,
        padding: 30,
        margin: 20,
        borderRadius: 10
    },
    question: {
        fontSize: 40,
        padding: 10
    }
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)