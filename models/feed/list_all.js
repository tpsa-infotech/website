/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

import {formatRelative} from 'date-fns'

import formatTitle from "@directus/format-title"

const data_format = 'MMM do, yyyy'

export default async () => {

    const directus = await getDirectusClient()

    const response = await directus.items('feed').readByQuery({
        "fields": ["id","title","description","status", "user_updated", "date_updated", "date_created", "conference.name"],
        "filter": {"status": {"_eq": "published"}},
        "sort": "-date_updated,-date_created",
        "limit": -1,
    })

    return response.data.map(i => {
        if(!i.date_updated){
            i.date_updated = i.date_created
        }

        return {
            id: i.id,
            title: formatTitle(i.title),
            description: i.description,
            status: i.status,
            date_updated: format(parseISO(i.date_updated), data_format),
            date_created: format(parseISO(i.date_created), data_format),
            conference: i.conference,
            date_relative: formatTitle(formatRelative(parseISO(i.date_updated), new Date())),
        }
    })
}