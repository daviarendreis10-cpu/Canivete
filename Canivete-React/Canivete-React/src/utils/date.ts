import dayjs from "dayjs"

const WEEKDAY_PT = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira' , 'Sábado']

export default function getToday () {
    const now = dayjs()
    const weekday = now.day()
    const weekdayName = WEEKDAY_PT[weekday]
    const textDate =`${weekdayName} - ${now.format("DD/MM/YYYY")}`
    return textDate
}