interface Props extends Omit<RequestInit, 'body'> {
    body?: Record<string, string | number | boolean>;
}

const debug = false

const environment = [
    "https://livo-convite.vercel.app",
    "http://localhost",
    "http://192.168",
    "loca.lt"
].some(env => window.location.href.startsWith(env))
    ? "https://app.applivo.com.br/api_2_0/homologacao.php"
    : "https://app.applivo.com.br/api_2_0/index.php"

const BASE_URL = debug ? environment : "https://app.applivo.com.br/api_2_0/index.php"

export const BASE_HEADERS = {
    "Content-Type": "application/json",
    "redirect": "visita",
    "Authorization": "hash"
}

export const callApi = async (method: 'GET' | 'POST', { body, headers }: Props) => {
    try {
        const req = await fetch(BASE_URL, {
            method,
            body: JSON.stringify(body),
            headers: {
                ...BASE_HEADERS,
                ...(headers && headers)
            }
        })
        const res = await req.json()
        return res
    } catch (err) {
        console.log(err);

    }
}
