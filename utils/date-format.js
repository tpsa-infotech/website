import { format, parseISO } from 'date-fns'

export default function formatDate(isoString, formatString){
    return format(parseISO(isoString), formatString)
}