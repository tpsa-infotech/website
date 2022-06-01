/* eslint-disable import/no-anonymous-default-export */
import { getDirectusClient } from "@/lib/directus";
import formatTitle from "@directus/format-title"

export default async () => {

    const directus = await getDirectusClient()

    const response = await directus.items('events').readByQuery({
        "fields": ["id","name","category","scoring_base","updated_on"],
        "filter": {"status": {"_eq": "published"}, "published": {"_eq": true}},
        "sort": "category,name",
        "limit": -1,
    })

    return response.data
}