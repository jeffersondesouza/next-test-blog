import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

const Content = props => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
)

const Post = props => {
  // console.log('props:', props)
  return (
    <Layout>
      <h1>{props.show.name}</h1>
      <h1>{props.nome}</h1>
      <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
      <img src={props.show.image.medium} />
    </Layout>
  )
}

Post.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()
  console.log('context:', context.query.nome)
  return { show,  nome: context.query.nome }
}

export default Post
