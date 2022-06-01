/* eslint-disable import/no-anonymous-default-export */
import { getDirectusClient } from "@/lib/directus";

export default async (id) => {

    const directus = await getDirectusClient()

    const response = await directus.items('events').readOne( id )
    
    return response
}