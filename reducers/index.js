import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'

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
        case REMOVE_DECK :
            return Object.keys(state)
            .filter(key => key !== action.title)
            .reduce((result, current) => {
              result[current] = state[current]
              return result
          }, {});
        default : 
            return state
    }
}

export default deck