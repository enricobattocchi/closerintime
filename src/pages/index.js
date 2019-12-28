import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Typography } from "@material-ui/core"
import Chooser from "../components/Chooser"
import { EventsProvider } from "../context/EventsContext"
import { TitleProvider } from "../context/TitleContext"
import Timeline from "../components/Timeline"
import Sentence from "../components/Sentence"


const IndexPage = () => (
  <Layout>

    <TitleProvider>
      <SEO/>
      <Typography variant={"h2"} align={"center"}>Pick some events </Typography>
      <EventsProvider>
        <Chooser/>
        <Timeline/>
        <Sentence/>
      </EventsProvider>
    </TitleProvider>
  </Layout>)

export default IndexPage
