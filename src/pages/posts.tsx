import * as React from 'react';
import { Link, graphql } from 'gatsby'
import {RouteComponentProps} from "@reach/router"
import {
  Helmet
} from 'react-helmet'
import {
  SinglePostQuery
} from '../../types/graphql-types'
import Layout from '../layouts/index'
import Jumbotron from '../components/Jumbotron'
import Main from '../components/Main'

type Props = RouteComponentProps & {
  data: SinglePostQuery
}

const Component: React.FC<Props> = (props) => {
  const [elem, setSelem] = React.useState<JSX.Element>(<p>Loading....</p>)
  const title = props.data.wordpressPost.title
  const slug = props.data.wordpressPost.slug
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../components/capacitor/Share')
      .then(({SharePost}) => {
        setSelem(<SharePost content={{
          title,
          dialogTitle: `Share the ${title}`,
          url: `https://example.com/${slug}`
        }}/>)
      }).catch(e => {
        setSelem(<p>{e}</p>)
      })
    }
  }, [])
  return (
    <Layout>
      <Helmet title={title} />
      <Jumbotron title={title} />
      <Main>
        <h1 dangerouslySetInnerHTML={{__html: title}} />
        <section dangerouslySetInnerHTML={{__html: props.data.wordpressPost.content}} />
        {elem}
        <Link to='/'>Home</Link>
      </Main>
    </Layout>
  )
}
export default Component

export const pageQuery = graphql`
  query SinglePost($slug: String) {
    wordpressPost(slug: { eq: $slug }) {
      id
      slug
      title
      content
    }
  }
`