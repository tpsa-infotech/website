/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

const data_format = 'MMM do'

export default async () => {

    const directus = await getDirectusClient()

    const response = await directus.items('conferences').readByQuery({
        "fields": ["id","name","start_date","end_date"],
        "sort": "-start_date",
        "limit": 3,
    })


    let conferences = response.data.map((conference) => {
        conference.start_date = formatDate(conference.start_date, data_format)
        conference.end_date = format(parseISO(conference.end_date), data_format)
        return {
            href: `/conferences/${conference.id}`,
            subLabel: `${conference.start_date} - ${conference.end_date}`,
            label: conference.name,
            id: conference.id,
        }
    });

    conferences.push({"label": "All Conferences", "href":"/conferences"})

    return conferences
}