import { useRouter } from 'next/router'

const template = () => {
  const router = useRouter()
  const { rubric_id } = router.query

  return <p>ID: {rubric_id}</p>
}

export default template