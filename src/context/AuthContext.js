import {createContext, useReducer} from 'react';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                user: action.payload
            }
        case 'LOGOUT':
            return{
                user: null
            }
        case 'REGISTER':
            return {
            ...state,
            cards: state.cards.filter((card) => card.id !== action.payload),
            };
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('AuthContext State: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}