import { MOCK_ACCESS_HISTORICAL, MOCK_ADRESSES } from "@/mocks"

type load_data = {
    payload: {
        adresses: typeof MOCK_ADRESSES,
        historical: typeof MOCK_ACCESS_HISTORICAL
    }
    type: "LOAD_DATA"
}

type set_loading = {
    payload: boolean
    type: "SET_LOADING"
}

type set_current = {
    payload: typeof MOCK_ADRESSES[0]
    type: "SET_CURRENT"
}

type filter_historical = {
    payload: typeof MOCK_ACCESS_HISTORICAL
    type: "FILTER_HISTORICAL"
}

export interface InitialStateProps {
    currentAdress: typeof MOCK_ADRESSES[0] | null
    adresses: typeof MOCK_ADRESSES | null
    historical: typeof MOCK_ACCESS_HISTORICAL | null
    loading: boolean
}

export type ActionProps = load_data | set_loading | set_current | filter_historical
