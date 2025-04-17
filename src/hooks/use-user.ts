import { callApi } from "@/api.config";
import { Address, Historical } from "@/types/data";
import { ActionProps, InitialStateProps } from "@/types/use-user";
import { errorToastDispatcher } from "@/utils/error-toast-dispatcher";
import cuid from 'cuid';
import { useEffect, useReducer } from "react";

import { MOCK_ACCESS_HISTORICAL } from "@/mocks";
import { useAuth } from "./use-auth";

const reducer = (state: InitialStateProps, action: ActionProps): InitialStateProps => {
    switch (action.type) {
        case "LOAD_DATA": {
            const { addresses, historical } = action.payload
            return { ...state, addresses, historical }
        }
        case "SET_LOADING": {
            return { ...state, loading: action.payload }
        }
        case "SET_CURRENT": {
            return { ...state, currentAddress: action.payload }
        }
        case "FILTER_HISTORICAL": {
            return { ...state, filteredHistorical: action.payload }
        }
        default: return state
    }
}

export function useUser() {
    const { data: user } = useAuth()
    const [{ addresses, historical, filteredHistorical, loading, currentAddress }, dispatch] = useReducer(reducer, {
        addresses: null,
        historical: null,
        filteredHistorical: [],
        loading: false,
        currentAddress: null
    })

    const setCurrentAddress = (payload: Address) => dispatch({ type: "SET_CURRENT", payload })

    useEffect(() => {
        if (historical) {
            dispatch({ type: "FILTER_HISTORICAL", payload: historical?.filter((record) => record.ENDERECO === currentAddress?.ENDERECO) as Historical[] })
        }
    }, [currentAddress, historical])

    useEffect(() => {
        if (addresses) {
            dispatch({ type: "SET_CURRENT", payload: addresses[0] })
        }
    }, [addresses])

    useEffect(() => {
        (async () => {
            try {
                dispatch({ payload: true, type: "SET_LOADING" })

                const [recurrent, temporary] = await Promise.all([
                    callApi("POST", {
                        body: { request: 'get_autorizacoes_recorrente', tipo: 2 },
                        headers: { Authorization: `Bearer ${user["TOKEN"]}` }
                    }),
                    callApi("POST", {
                        body: { request: 'get_autorizacoes_temporario', tipo: 2 },
                        headers: { Authorization: `Bearer ${user["TOKEN"]}` }
                    }),
                    callApi("POST", { body: { request: 'get_registros_visitante' } })
                ])

                const inactiveAdresses = MOCK_ACCESS_HISTORICAL.map(({ NOME_CONDOMINIO, ENDERECO }) => ({
                    CONDOMINIO: NOME_CONDOMINIO,
                    ID: cuid(),
                    RESULT: false,
                    BOTAO: false,
                    VISITA: null,
                    RECORRENTE: true,
                    ENDERECO,
                    KEY: '',
                })).filter(({ CONDOMINIO }, index, self) => index === self.findIndex((t) => t.CONDOMINIO === CONDOMINIO))

                dispatch({
                    type: "LOAD_DATA", payload: {
                        historical: MOCK_ACCESS_HISTORICAL,
                        addresses: [
                            ...recurrent.RESULT ? recurrent.DADOS.map((item: Address) => ({ ...item, ID: cuid(), RECORRENTE: true })) : [],
                            ...temporary.RESULT ? temporary.DADOS.map((item: Address) => ({ ...item, BOTAO: true, ID: cuid(), RECORRENTE: false })) : [],
                            ...inactiveAdresses
                        ],
                    }
                })
            } catch (err) {
                errorToastDispatcher(err)
            } finally {
                dispatch({ type: "SET_LOADING", payload: false })
            }
        })()
    }, [user])

    return {
        loading,
        addresses,
        historical,
        filteredHistorical,
        currentAddress,
        setCurrentAddress
    }
}
