import React, { useContext } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import TitleContext from "../context/TitleContext"

function SEO({ lang, meta }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
            app_id
          }
        }
      }
    `
  )

  const metaDescription = site.siteMetadata.description
  const url = site.siteMetadata.url

  const titleContext = useContext(TitleContext)

      return(<Helmet
      htmlAttributes={{
        lang,
      }}
      title={titleContext.title.replace(/(<([^>]+)>)/ig,"")}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      defaultTitle={site.siteMetadata.title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:image`,
          content: url+'/closerintime-sharing.png'
        },
        {
          property: `og:image:width`,
          content: '1200'
        },
        {
          property: `og:image:height`,
          content: '627'
        },
        {
          property: `fb:app_id`,
          content: site.siteMetadata.app_id
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          property: `twitter:image`,
          content: url+'/closerintime-sharing.png'
        },
      ].concat(meta)}
    />)
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
}

export default SEO
