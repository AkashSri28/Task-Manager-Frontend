import { useContext } from "react"
import { CardsContext } from "../context/CardContext"

export const useCardsContext = ()=>{
    const context = useContext(CardsContext)

    if(!context){
        throw Error('useCardsContext must be used inside CardsContextProvider')
    }

    return context
}