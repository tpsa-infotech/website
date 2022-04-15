import { useRouter } from 'next/router'

const template = () => {
  const router = useRouter()
  const { conference_id } = router.query

  return <p>ID: {conference_id}</p>
}

export default template