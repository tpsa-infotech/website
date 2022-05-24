import { useRouter } from 'next/router'

const template = () => {
  const router = useRouter()
  const { event_id } = router.query

  return <p>ID: {event_id}</p>
}

export default template