import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'DecksOfCards'

function getAllDecks (results) {
    let data = []
    let dd = JSON.parse(results)
    let keys = Object.keys(dd)

    keys.map((key) => {
        data.push(dd[key])
    })

    return data
}

export function formatDecksResults (results) {
    return results !== null
        ? getAllDecks(results)
        : []
}

export function getDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY, (err, results) => {
        formatDecksResults(results)
    })
}

export function saveDeckTitle ({title, deck}) {
    AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
        if (result !== null) {
            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[title]: deck,}))
        } else {
            return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({[title]: deck,}))
        }
    })
}

export function addCardToDeck ({ card, title }) {
    AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
        if (result !== null) {
            console.log(result)
            const decks = JSON.parse(result)
            const keys = Object.keys(decks)
            const filteredKey = keys.filter((key) => key === title )
            decks[filteredKey].questions.push(card)
            console.log('DECKS', decks)
            console.log('KEYS', keys)
            console.log('THE KEY', decks)
            return AsyncStorage.mergeItem(DECK_STORAGE_KEY,JSON.stringify(decks))
        }
    })
}

export function removeDeckItem ({ title }) {
    AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
        if (result !== null) {
            const decks = JSON.parse(result)
            const keys = Object.keys(decks)
            const filteredKey = keys.filter((key) => key === title )
            console.log(decks[filteredKey])
            console.log(decks)
            delete decks[filteredKey]
            return AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(decks))
        }
    })
}