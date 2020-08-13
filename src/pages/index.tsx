import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/index.module.scss'
import { GetStaticProps } from 'next'
import { getAllPostsForHome, getSettings, getAllPagesForHome } from '../lib/api'
import PostCard from '../components/postCard'

const Index = ({
  allPosts: { edges: postEdges },
  info: { generalSettingsDescription, generalSettingsTitle },
  allPages: { edges: pageEdges }
}) => {

  const title: string = generalSettingsTitle
  const descriptions: string[] = generalSettingsDescription.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")

  const articles = [...postEdges, pageEdges[0]]

  const showIntro = () => {
    return (
      <section className={styles.intro}>
        <h2 className={styles.intro__title}>Japanese Language Study Site</h2>
        <p className={styles.intro__description}>This site is for you if you're learning Japanese language. Let's enjoy and study Japanese!</p>
      </section>
    )
  }

  return (
    <Layout
      title={title}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.top__wrapper}>
        <div className={styles.top}>
          <h1 className={styles.top__title}>{title}</h1>
          {descriptions.map((description: string, index: number) => (
            <p
              className={styles.top__description}
              key={index}
            >{decodeURI(description)}</p>
          ))}
        </div>
      </div>
      <div className={styles.container}>
        {showIntro()}
      </div>
      <div className={styles.container}>
        {
          articles.map(({node}) => (
            <PostCard
              key={node.id}
              title={node.title}
              coverImage={node.featuredImage.node.sourceUrl}
              date={node.date}
              slug={node.slug}
            />
          ))
        }
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPostsForHome()
  const allPages = await getAllPagesForHome()
  const info = await getSettings()
  return {
    props: { allPosts, allPages, info }
  }
}

export default Index