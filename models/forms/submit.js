/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

const data_format = 'MMM do, yyyy'

export default async (slug, data) => {

    const directus = await getDirectusClient()

    const form_item = await directus.items('forms').readByQuery({
        "fields": ["id","slug"],
        "filter": {
            "slug": {
                "_eq": slug
            }
        },
        "limit": 1,
    }).then(response => response.data[0])

    const response = await directus.items('form_response').createOne({
        "form": form_item.id,
        "data": data
    })

    return response
}