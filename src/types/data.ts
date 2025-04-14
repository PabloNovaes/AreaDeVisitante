export type Adress = {
    CONDOMINIO: string;
    ENDERECO: string;
    RESULT: string;
    VISITA: {
        RESULT: string;
        DIA: string;
        FAIXA: string;
        STATUS: boolean;
    }[] | null;
    KEY: string;
    BOTAO: boolean;
    ID: string
}

export type Historical = {
    RESULT: string | null;
    EVENTO: string | null;
    ANFITRIAO: string | null;
    DATA_CONVITE: string | null;
    HORA_CONVITE: string | null;
    ADIANTADO: string | null;
    ATRASADO: string | null;
    STATUS_ANTECIPACAO: string | null;
    DESC_STATUS: string | null;
    NOME_CONDOMINIO: string | null;
    ENDERECO: string | null;
}