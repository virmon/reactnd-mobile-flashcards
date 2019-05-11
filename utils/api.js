import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'DecksOfCards'

/**
 * @description Get all deck and place them in an array
 * @param {Object} results - list of deck Objects
 * @returns {array} Collection of deck
 */
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

/**
 * @description Get all deck from AscyncStorage key
 * @returns {array} Collection of deck
 */
export function getDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY, (err, results) => {
        formatDecksResults(results)
    })
}

/**
 * @description Save deck title and store it in AsyncStorage
 */
export function saveDeckTitle ({title, deck}) {
    AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
        if (result !== null) {
            console.log('check',AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[title]: deck,})))
            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[title]: deck,}))
        } else {
            return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({[title]: deck,}))
        }
    })
}

/**
 * @description Save card to deck
 */
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

/**
 * @description Remove deck
 */
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