/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

const data_format = 'MMM do, yyyy'

export default async (id) => {

    const directus = await getDirectusClient()

    const response = await directus.items('category').readOne(id,{
        "fields": ["*","page.*"]
    })

    let item = response

    return item
}