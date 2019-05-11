import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, red, white } from '../utils/colors'

class Answer extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Answer`
        }
    }
    handleCheckAnswer = (status) => {
        const { navigation } = this.props
        const { params } = navigation.state
        const { total, answered } = navigation.state.params
        params.checkAnswer(status)
        if (answered !== total) {
            navigation.navigate('Quiz')
        }
    }
    render () {
        const { navigation } = this.props
        const { answer, total, answered } = navigation.state.params
        return (
            <View style={{flex: 1}}>
                <Text style={{alignSelf: 'flex-start', margin: 10, fontSize: 18}}>{`${answered}/${total}`}</Text>
                <View style={styles.container}>
                    <Text style={styles.answer}>{answer}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
                        <Text style={{color: red, margin: 10}}>Show Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleCheckAnswer(true)} style={[styles.btn, {backgroundColor: green}]} >
                        <Text style={styles.btnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleCheckAnswer(false)} style={[styles.btn, {backgroundColor: red}]} >
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
    answer: {
        fontSize: 30,
        padding: 10,
        textAlign: 'center'
    }
})

export default Answer