import { MOCK_ACCESS_HISTORICAL, MOCK_ADRESSES } from "@/mocks";
import { ActionProps, InitialStateProps } from "@/types/use-user";
import { errorToastDispatcher } from "@/utils/error-toast-dispatcher";
import { useEffect, useReducer } from "react";

const reducer = (state: InitialStateProps, action: ActionProps): InitialStateProps => {
    switch (action.type) {
        case "LOAD_DATA": {
            const { adresses, historical } = action.payload
            return { ...state, adresses, historical }
        }
        case "SET_LOADING": {
            return { ...state, loading: action.payload }
        }
        case "SET_CURRENT": {
            return { ...state, currentAdress: action.payload }
        }
        case "FILTER_HISTORICAL": {
            return { ...state, historical: action.payload }
        }
        default: return state
    }
}

export function useUser() {
    // const { data } = useAuth()
    const [{ adresses, historical, loading, currentAdress }, dispatch] = useReducer(reducer, {
        adresses: null,
        historical: null,
        loading: false,
        currentAdress: null
    })

    useEffect(() => {
        (async () => {
            try {
                dispatch({ payload: true, type: "SET_LOADING" })
                // const [adresses, historical] = await Promise.all([
                //     callApi("POST", { body: { request: 'meus_recorrentes' } }),
                //     callApi("POST", { body: { request: 'meu_historico_visitas' } })
                // ])

                // if (!adresses["RESULT"] || !historical["RESULT"]) throw new Error((adresses || historical)["INFO"] ?? (adresses || historical)["MSG"])

                dispatch({ type: "LOAD_DATA", payload: { adresses: MOCK_ADRESSES, historical: MOCK_ACCESS_HISTORICAL } })
                dispatch({ type: "SET_CURRENT", payload: MOCK_ADRESSES[0] })
            } catch (err) {
                errorToastDispatcher(err)
            } finally {
                dispatch({ payload: false, type: "SET_LOADING" })
            }
        })()
    }, [])

    const setCurrentAdress = (payload: typeof MOCK_ADRESSES[0]) => {
        dispatch({ type: "SET_CURRENT", payload })
        dispatch({ type: "FILTER_HISTORICAL", payload: MOCK_ACCESS_HISTORICAL?.filter((record) => record.NOME_CONDOMINIO === currentAdress?.CONDOMINIO) as typeof MOCK_ACCESS_HISTORICAL })
    }

    return {
        loading,
        adresses,
        historical,
        currentAdress,
        setCurrentAdress
    }
}
