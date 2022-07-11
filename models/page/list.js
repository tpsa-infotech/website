/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";

const data_format = 'MMM do, yyyy'

export default async () => {

    const directus = await getDirectusClient()

    const response = await directus.items('page').readByQuery({
        "fields": ["*","category.page.slug","category.page.title","category.slug"],
        "sort": "sort",
        "limit": -1,
    })

    return response.data.map(item => {
        return {
            ...item,
            date_updated: item.date_updated && format(parseISO(item.date_updated), data_format) || null,
            date_created: format(parseISO(item.date_created), data_format),
        }
    })
}