/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

const data_format = 'MMM do, yyyy'

export default async (id) => {

    const directus = await getDirectusClient()

    const response = await directus.items('forms').readByQuery({
        "fields": ["id","slug","json_schema","ui_schema"],
        "filter": {
            "slug": {
                "_eq": id
            }
        },
        "limit": 1,
    }).then(response => response.data[0])

    return response
}