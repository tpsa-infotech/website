/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

const data_format = 'MMM do, yyyy'

export default async (id) => {

    const directus = await getDirectusClient()

    const response = await directus.items('feed').readOne(id,{
        "fields": ["id","title","description","date_created","date_updated","content", "conference.name", "conference.id"],
    })

    let item = response

    // item.date_created = formatDate((item.date_created), data_format)
    // item.date_updated = format((item.date_updated), data_format)
    item.date_created =  format(parseISO(item.date_created), data_format)
    item.date_updated =  format(parseISO(item.date_updated), data_format)

    return item
}