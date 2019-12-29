module.exports = {
  siteMetadata: {
    title: `#closerintime`,
    description: `Timespan comparisons between historical events.`,
    author: `@lopo`,
    url: `https://gatsby.closerinti.me`,
    app_id: `1012298692240693`
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: 'localhost',
          user: 'root',
          password: '***REMOVED***',
          database: 'closerintime'
        },
        queries: [
          {
            statement: 'SELECT * FROM events ORDER BY year ASC',
            idFieldName: 'id',
            name: 'events'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Fredoka One`,
            /*subsets: [`latin`],
            variants: [`400`, `700`]*/
          },
          {
            family: `Raleway`,
            subsets: [`latin`],
            variants: [`400`, `700`]
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `#closerintime`,
        short_name: `#closerintime`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#fa7921`,
        display: `standalone`,
        icon: `src/images/icon-512.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`**/*`],
      },
    },
  ],
}
