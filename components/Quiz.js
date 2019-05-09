import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, red } from '../utils/colors'
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
            console.log('NEXT QUESTION',nextQuestion.question)
            
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
        console.log('PROPS', decks[title].questions)
        console.log('state',this.state.currentAnswer)
        return (
            <View behavior='padding' style={styles.container}>
                <Text style={{alignSelf: 'flex-start', justifyContent: 'flex-start'}}>{`${this.state.answered}/${this.state.total}`}</Text>
                <Text style={styles.question}>{this.state.currentQuestion}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Answer', {answer: this.state.currentAnswer, total: this.state.total, answered: this.state.answered, checkAnswer: this.checkAnswer})}>
                    <Text style={{color: red}}>Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.checkAnswer(true)} style={[styles.btn, {backgroundColor: green}]} >
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.checkAnswer(false)} style={[styles.btn, {backgroundColor: red}]} >
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