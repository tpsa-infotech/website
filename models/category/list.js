/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";

const data_format = 'MMM do, yyyy'

export default async () => {

    const directus = await getDirectusClient()

    const response = await directus.items('category').readByQuery({
        "fields": ["*","page.*"],
        "sort": "sort",
        "limit": -1,
    })

    let list = response.data

    return list
}