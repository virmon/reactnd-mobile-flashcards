import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function deck (state = [], action) {
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
                [action.deck]: {
                    ...state.title,
                    questions: state.questions.push(action.card)
                }
            }
        default : 
            return state
    }
}

export default deck