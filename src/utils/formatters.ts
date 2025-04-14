export const formatInput = (e: React.ChangeEvent<HTMLInputElement>, formatter: (value: string) => string) => {
    e.target.value = formatter(e.target.value)
}

export const formatUppercase = (value: string) => {
    return value.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function blurPhone(telefone: string): string {
    const sanitizedPhone = telefone.replace(/\D/g, '');
    if (sanitizedPhone.length < 4) return '*'.repeat(sanitizedPhone.length);

    const start = sanitizedPhone.slice(0, 2); // exemplo: DDD
    const end = sanitizedPhone.slice(-2);
    const mid = '*'.repeat(sanitizedPhone.length - 4);

    return `${start}${mid}${end}`;
}

export function blurEmail(email: string): string {
    const [user, provider] = email.split('@');
    if (!user || !provider) return email;

    const bluredName =
        user.length <= 2
            ? '*'.repeat(user.length)
            : user[0] + '*'.repeat(user.length - 2) + user[user.length - 1];

    return `${bluredName}@${provider}`;
}

export const formatCPF = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, (_, p1, p2, p3, p4) => {
            let result = p1
            if (p2) result += `.${p2}`
            if (p3) result += `.${p3}`
            if (p4) result += `-${p4}`
            return result
        })

}

export const isToday = (day: string) => {
    const today = new Date().toLocaleDateString("pt-BR", { weekday: "long" })
    return day.toLowerCase() === today
}

export const formatTimeRange = (startTime: string, endTime: string) => {
    if (startTime === "Closed" || endTime === "Closed") {
        return "Closed"
    }
    return `${startTime} - ${endTime}`
}

export const getUsDate = (date: string) => {
    const [day, mounth, year] = date.split("/")
    return `${year}-${mounth}-${day}`
}

export const formatDate = (date: string) => {
    const [datePart, timePart] = date.split(" ");

    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds).toLocaleString("pt-BR", {
        dateStyle: "long", timeStyle: "short"
    })
}


export const dateFormater = (dateString: string) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}
