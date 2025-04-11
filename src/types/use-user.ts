import { Adress, Historical } from "./data"

type load_data = {
    payload: {
        adresses: Adress[],
        historical: Historical[]
    }
    type: "LOAD_DATA"
}

type set_loading = {
    payload: boolean
    type: "SET_LOADING"
}

type set_current = {
    payload: Adress
    type: "SET_CURRENT"
}

type filter_historical = {
    payload: Historical[]
    type: "FILTER_HISTORICAL"
}

export interface InitialStateProps {
    currentAdress: Adress | null
    adresses: Adress[] | null
    historical: Historical[] | null
    filteredHistorical: Historical[] | []
    loading: boolean
}

export type ActionProps = load_data | set_loading | set_current | filter_historical
