/* eslint-disable import/no-anonymous-default-export */
import { getDirectusClient } from "@/lib/directus";
import formatTitle from "@directus/format-title"

export default async () => {

    const directus = await getDirectusClient()

    const response = await directus.items('staff').readByQuery({
        "fields": ["*","geographical_regions.name","manager.first_name","manager.last_name","geographical_region.geographical_regions_id.name","group.department"],
        "limit": -1,
        "sort": ["sort"]
    })

    return response.data
}