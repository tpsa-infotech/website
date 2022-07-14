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
        "limit": 3,
    })

    

    const feed_posts = response.data.map((post) => {
        if(!post.date_updated){
            post.date_updated = post.date_created
        }
        return {
            ...post,
            date_updated: formatRelative(parseISO(post.date_updated), new Date()),
            
        }
    });

    return feed_posts
}