/* eslint-disable import/no-anonymous-default-export */
import { format, parseISO } from 'date-fns'
import { getDirectusClient } from "@/lib/directus";
import formatDate from "@/utils/date-format"

const data_format = 'MMM do'

export default async () => {

    const directus = await getDirectusClient()

    const response = await directus.items('category').readByQuery({
        "fields": ["*","page.*"],
        "sort": "sort",
        "limit": -1,
    })


    let categories = response.data.map((category) => {
        
        return {
            label: category.name,
            pages: category.page.map(page => {
                return {
                    href: `/${category.slug}/${page.slug}`,
                    label: page.title,
                    id: page.slug,
                }
            })
        }
    });

    return categories
}