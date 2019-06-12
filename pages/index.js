import Link from 'next/link'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

const PostLink = props => (
  <li key={props.id}>
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
      <a>{props.name}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: ${props.color};
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)

const Index = props => {
  const length = props.shows.length

  return (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <PostLink key={show.id} {...show} color="red" />
        ))}
      </ul>

      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
          color: ${length < 5 ? 'pink' : 'green'};
        }

        ul {
          padding: 0;
        }
      `}</style>
    </Layout>
  )
}

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  return {
    shows: data.map(item => item.show)
  }
}

export default Index
