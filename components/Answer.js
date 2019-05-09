import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, red, white } from '../utils/colors'
import { connect } from 'react-redux'

class Answer extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Answer`
        }
    }
    handleCheckAnswer = (status) => {
        const { navigation } = this.props
        const { params } = navigation.state
        const { total, answered, score } = navigation.state.params
        params.checkAnswer(status)
        if (answered !== total) {
            navigation.navigate('Quiz')
        }
    }
    render () {
        const { navigation } = this.props
        const { answer, total, answered } = navigation.state.params
        return (
            <View behavior='padding' style={styles.container}>
                <Text style={{alignSelf: 'flex-start', justifyContent: 'flex-start'}}>{`${answered}/${total}`}</Text>
                <Text style={styles.answer}>{answer}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
                    <Text style={{color: red}}>Question</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleCheckAnswer(true)} style={[styles.btn, {backgroundColor: green}]} >
                    <Text style={styles.btnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleCheckAnswer(false)} style={[styles.btn, {backgroundColor: red}]} >
                    <Text style={styles.btnText}>Incorrect</Text>
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
    answer: {
        fontSize: 40,
        padding: 10
    }
})

export default connect()(Answer)