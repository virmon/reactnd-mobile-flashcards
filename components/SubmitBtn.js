import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { blue, white } from '../utils/colors'

const SubmitBtn = ({ children, style = {}, onPress }) => {
    return (
        <TouchableOpacity style={[styles.submit, style]} onPress={onPress}>
            <Text style={{fontSize: 16, color: white}}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submit: {
        width: 200,
        height: 50,
        backgroundColor: blue,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SubmitBtn