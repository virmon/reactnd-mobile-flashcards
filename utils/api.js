import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'DecksOfCards'

function getAllDecks (results) {
    let data = []
    let dd = JSON.parse(results)
    let keys = Object.keys(dd)

    keys.map((key) => {
        data.push(dd[key])
    })
    // AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    
    return data
}

export function formatDecksResults (results) {
    return results !== null
        ? getAllDecks(results)
        : []
}

export function getDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY, (err, results) => {
        console.log('componentDidMount', results)
        formatDecksResults(results)
    })
}

export function getDeck (id) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY, id)
}

export function saveDeckTitle ({title, deck}) {
    AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
        if (result !== null) {
            console.log('Found existing data', result)
            // let newData = JSON.parse(result).concat({title, questions: []})
            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[title]: deck,}))
        } else {
            console.log('No existing data')
            return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({[title]: deck,}))
        }
    })
    // return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    //     [title]: deck,
    // }))
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