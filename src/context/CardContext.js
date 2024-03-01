import {createContext, useReducer} from 'react';

export const CardsContext = createContext()

export const cardsReducer = (state, action) => {
    switch(action.type){
        case 'SET_CARDS':
            return{
                cards: action.payload
            }
        case 'CREATE_CARD':
            console.log(state.cards);
            console.log(action.payload);
            return{
                cards: [action.payload, ...state.cards]
            }
        case 'DELETE_CARD':
            return {
            ...state,
            cards: state.cards.filter((card) => card.id !== action.payload),
            };
        default:
            return state
    }
}

export const CardsContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(cardsReducer, {
        cards: null
    })

    return (
        <CardsContext.Provider value={{...state, dispatch}}>
            {children}
        </CardsContext.Provider>
    )
}