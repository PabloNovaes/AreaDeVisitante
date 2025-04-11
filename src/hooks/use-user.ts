import { callApi } from "@/api.config";
import { MOCK_ACCESS_HISTORICAL } from "@/mocks";
import { Adress, Historical } from "@/types/data";
import { ActionProps, InitialStateProps } from "@/types/use-user";
import { errorToastDispatcher } from "@/utils/error-toast-dispatcher";
import { useEffect, useReducer } from "react";
import { useAuth } from "./use-auth";

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
            return { ...state, filteredHistorical: action.payload }
        }
        default: return state
    }
}

export function useUser() {
    const { data: user } = useAuth()
    const [{ adresses, historical, filteredHistorical, loading, currentAdress }, dispatch] = useReducer(reducer, {
        adresses: null,
        historical: null,
        filteredHistorical: [],
        loading: false,
        currentAdress: null
    })

    const setCurrentAdress = (payload: Adress) => dispatch({ type: "SET_CURRENT", payload })

    useEffect(() => {
        dispatch({ type: "FILTER_HISTORICAL", payload: historical?.filter((record) => record.ENDERECO === currentAdress?.ENDERECO) as Historical[] })
    }, [currentAdress, historical])

    useEffect(() => {
        (async () => {
            try {
                dispatch({ payload: true, type: "SET_LOADING" })

                const [{ DADOS } = adresses] = await Promise.all([
                    callApi("POST", {
                        body: {
                            request: 'get_autorizacoes_recorrente', tipo: 2
                        },
                        headers: { Authorization: `Bearer ${user["TOKEN"]}` }
                    }),
                    callApi("POST", { body: { request: 'meu_historico_visitas' } })
                ])

                const inactiveAdresses = MOCK_ACCESS_HISTORICAL
                    .map(({ NOME_CONDOMINIO, ENDERECO } = DADOS) => ({ CONDOMINIO: NOME_CONDOMINIO, ENDERECO, RESULT: false, BOTAO: false, KEY: '', VISITA: null }))
                    .filter(({ CONDOMINIO }, index, self) => index === self.findIndex((t) => t.CONDOMINIO === CONDOMINIO))
                console.log([...DADOS, ...inactiveAdresses]);

                dispatch({ type: "LOAD_DATA", payload: { adresses: [...DADOS, ...inactiveAdresses], historical: MOCK_ACCESS_HISTORICAL } })
                dispatch({ type: "SET_CURRENT", payload: DADOS[0] })
            } catch (err) {
                errorToastDispatcher(err)
            } finally {
                dispatch({ type: "SET_LOADING", payload: false })
            }
        })()
    }, [])


    return {
        loading,
        adresses,
        historical,
        filteredHistorical,
        currentAdress,
        setCurrentAdress
    }
}
