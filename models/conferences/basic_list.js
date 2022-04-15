/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

const data_format = 'MMM do, yyyy'

export default async () => {

    const directus = await getDirectusClient()

    const response = await directus.items('conferences').readByQuery({
        "fields": ["id","name","start_date","end_date"],
        "sort": "-start_date",
        "limit": 3,
    })

    

    const conferences = response.data.map((conference) => {
        conference.start_date = formatDate(conference.start_date, data_format)
        conference.end_date = format(parseISO(conference.end_date), data_format)
        return {
            start_date: conference.start_date,
            end_date: conference.end_date,
            name: conference.name,
            id: conference.id,
        }
    });

    return conferences
}