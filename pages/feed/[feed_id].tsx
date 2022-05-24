import { useRouter } from 'next/router'

const template = () => {
  const router = useRouter()
  const { feed_id } = router.query

  return <p>ID: {feed_id}</p>
}

export default template