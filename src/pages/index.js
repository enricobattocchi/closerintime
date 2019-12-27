import React from "react"
import { StaticQuery } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Typography } from "@material-ui/core"
import Chooser from "../components/Chooser"
import { EventsProvider } from "../context/EventsContext"
import Timeline from "../components/Timeline"


const IndexPage = () => {

  return (
    <StaticQuery query={graphql`
      query{
          allMysqlEvents(limit: 3,skip: 125) {
          nodes {
            mysqlId
            name
            plural
            type
            year
            month
            day
            link
          }
        }
      }
    `}
                 render={data => {
                   return (<Layout>
                     <SEO title="Home"/>
                     <Typography variant={"h1"} align={"center"}> Pick two events </Typography>
                     <EventsProvider>
                       <Chooser/>
                       <Timeline/>
                     </EventsProvider>
                   </Layout>)
                 }}/>
  )
}

export default IndexPage
