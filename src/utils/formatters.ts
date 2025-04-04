export const formatInput = (e: React.ChangeEvent<HTMLInputElement>, formatter: (value: string) => string) => {
    e.target.value = formatter(e.target.value)
}

export const formatUppercase = (value: string) => {
    return value.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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

export const formatBirthDate = (value: string) => {
    let valor = value.replace(/\D/g, '');

    if (valor.length > 2) valor = valor.slice(0, 2) + '/' + valor.slice(2);
    if (valor.length > 5) valor = valor.slice(0, 5) + '/' + valor.slice(5, 9);

    return valor;
}

export const formatRG = (value: string) => {
    return value
        .replace(/[^a-zA-Z0-9]/g, "") // Remove tudo que não for número ou letra
        .toUpperCase() // Converte para maiúsculas
        .replace(/^([A-Z0-9]{2,3})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{1})?$/, (_, p1, p2, p3, p4) => {
            let result = `${p1}${p2}${p3}`;
            if (p4) result += `${p4}`;
            return result;
        });
};


export const formatPlate = (plate: string): string => {
    const cleaned = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    const currentPlateFormat = /^([A-Z]{3})([0-9]{1})([A-Z]{1})([0-9]{2})$/;
    const oldPlateFormat = /^([A-Z]{3})([0-9]{4})$/;

    if (currentPlateFormat.test(cleaned)) {
        return cleaned.replace(currentPlateFormat, '$1-$2$3$4');
    } else if (oldPlateFormat.test(cleaned)) {
        return cleaned.replace(oldPlateFormat, '$1-$2');
    }

    return cleaned;
};

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

export function generateInviteMessage({
    qrcode, CONVIDADO, CONDOMINIO, DESC_ENDERECO, DATA_CONVITE
}: {
    qrcode: string,
    CONVIDADO: string,
    CONDOMINIO: string,
    DESC_ENDERECO: string,
    DATA_CONVITE: string
}) {
    const [date, time] = DATA_CONVITE.split(" ")
    const [day, mounth, year] = date.split("/")

    return `
  🎉 *Você está convidado!* 🎉
  
👤 *Convidado:* ${CONVIDADO}  
🏢 *Condominio:* ${CONDOMINIO}  
📍 *Local:* ${DESC_ENDERECO}  
📅 *Data:* ${day}/${mounth}/${year}  
🕛 *Horário:* ${time.split(":")[0]}:${time.split(":")[1]}
  
📸 *Confira seu QR Code:*  
  ${qrcode}
    
🔗 *Saiba mais:* http://www.livoapp.com.br
    `;
}

export function generateCompanionInviteMessage({
    CONDOMINIO,
    DESC_ENDERECO,
    DATA_CONVITE,
    link
}: {
    CONDOMINIO: string,
    DESC_ENDERECO: string,
    DATA_CONVITE: string,
    link: string
}) {
    const [date, time] = DATA_CONVITE.split(" ");
    const [day, month, year] = date.split("/");

    return `
🎉 *Convite Especial!* 🎉

👋 *Você está convidado para ir como meu acompanhante ao*  
🏢 *${CONDOMINIO}*  
📍 *Local:* ${DESC_ENDERECO}  
📅 *Data:* ${day}/${month}/${year}  
🕛 *Horário:* ${time.split(":")[0]}:${time.split(":")[1]}

🔗 *Para facilitar seu acesso, cadastre-se como acompanhante usando o link abaixo:*  
${link}

🔗 *Saiba mais sobre o condomínio:* http://www.livoapp.com.br
    `;
}
