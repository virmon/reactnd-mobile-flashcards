import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function deck (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD :
            return {
                ...state,
                [action.card.title]: {
                    title: action.card.title,
                    questions: state[action.card.title].questions.concat(action.card.card)
                }
            }
        default : 
            return state
    }
}

export default deck