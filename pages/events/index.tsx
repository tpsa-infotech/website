// Import the NextJS Link component for Routing
import NextLink from "next/link"

// Import Query and Data Function
import EventData from "@/models/events/list"
import { useQuery } from 'react-query'

const template = (props) => {
  const eventQuery = useQuery('events-index', EventData, { initialData: props.events })

  return (<ul>
    {eventQuery.data.map((event) => (
      <li key={event.id}>
        <NextLink href={`/events/${event.id}`} passHref>
          <a>{event.name} {event.category} {event.scoring_base}</a>
        </NextLink>
      </li>
    ))}
  </ul>)
}

export default template

// Statically Generate Props on Build
export async function getStaticProps() {
  const events = await EventData()

  return {
    props: {
      events
    },
  };
}
