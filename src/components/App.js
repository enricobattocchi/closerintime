import React from "react"
import SEO from "../components/SEO"
import { Typography } from "@material-ui/core"
import Chooser from "../components/Chooser"
import { EventsProvider } from "../context/EventsContext"
import { TitleProvider } from "../context/TitleContext"
import Timeline from "../components/Timeline"
import Sentence from "../components/Sentence"

const App = (props) => (
  <TitleProvider>
  <SEO/>
  <Typography variant={"h2"} align={"center"}>Pick some events</Typography>
  <EventsProvider>
    <Chooser/>
    <Timeline/>
    <Sentence/>
  </EventsProvider>
  </TitleProvider>)

export default App
