/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

const data_format = 'MMM do, yyyy'

export default async (id) => {

    const directus = await getDirectusClient()

    const response = await directus.items('conferences').readOne(id,{
        "fields": ["id","name","start_date","end_date"],
    })

    let conference = response

    conference.start_date = formatDate(conference.start_date, data_format)
    conference.end_date = format(parseISO(conference.end_date), data_format)

    return response
}