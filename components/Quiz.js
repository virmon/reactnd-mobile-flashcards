import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, red, white } from '../utils/colors'
import { connect } from 'react-redux'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Quiz`
        }
    }
    state = {
        currentQuestion: '',
        currentAnswer: '',
        questions: [],
        correct: [],
        answered: 1,
        total: 0,
        correctAnswers: 0
    }
    componentDidMount () {
        const { navigation, decks } = this.props
        const title = navigation.state.params.title
        const listOfQuestions = decks[title].questions

        if (listOfQuestions.length !== 0) {
            const firstQuestion = listOfQuestions.shift()
            listOfQuestions.push(firstQuestion)
    
            this.setState({ 
                total: listOfQuestions.length,
                questions: listOfQuestions,
                currentQuestion: firstQuestion.question,
                currentAnswer: firstQuestion.answer 
            })
        } else {
            alert('No cards')
            navigation.navigate('DeckList')
        }
        
    }
    checkAnswer = (ans) => {
        const { questions, answered, total, correctAnswers, correct, currentAnswer } = this.state

        if (ans) {
            correct.push(currentAnswer)
            this.setState({ correctAnswers: correctAnswers + 1 })
        }

        if (answered !== total) {
            const nextQuestion = questions.shift()
            questions.push(nextQuestion)
            
            this.setState({ 
                questions,
                currentQuestion: nextQuestion.question,
                currentAnswer: nextQuestion.answer,
                answered: answered + 1
            })
        } else {
            const { navigation } = this.props

            this.setState({ 
                answered: 1, 
                correctAnswers: 0,
                correct: []
            })

            navigation.navigate('Score', { score: correct.length, total })
        }
    }
    render () {
        const { navigation, decks } = this.props
        const { title } = navigation.state.params
        return (
            <View style={{flex: 1}}>
                <Text style={{alignSelf: 'flex-start', margin: 10, fontSize: 18}}>{`${this.state.answered}/${this.state.total}`}</Text>
                <View style={styles.container}>
                    <Text style={styles.question}>{this.state.currentQuestion}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Answer', {answer: this.state.currentAnswer, total: this.state.total, answered: this.state.answered, checkAnswer: this.checkAnswer})}>
                        <Text style={{color: red, margin: 10}}>Show Answer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.checkAnswer(true)} style={[styles.btn, {backgroundColor: green}]} >
                        <Text style={styles.btnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.checkAnswer(false)} style={[styles.btn, {backgroundColor: red}]} >
                        <Text style={styles.btnText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
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
    question: {
        fontSize: 30,
        padding: 10,
        textAlign: 'center'
    }
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)