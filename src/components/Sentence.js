import React from "react"
import { Typography } from "@material-ui/core"
import EventsContext from "../context/EventsContext"
import TitleContext from "../context/TitleContext"

const ucfirst = (string) => string[0].toUpperCase() + string.slice(1)

const Sentence = () => {
  return (
    <TitleContext.Consumer>
      {({ setTitle }) => {
        return (
          <EventsContext.Consumer>
            {(contesto) => {
              let testo = ""


              if (contesto.events.length === 0) {
                testo = ''
              }
              if (contesto.events.length === 1) {
                testo = contesto.events[0].precisediff + " ago: <br/>" + contesto.events[0].name
              }
              if (contesto.events.length === 2) {
                let evento1 = contesto.events[0]
                let evento2 = contesto.events[1]
                let verb = evento2.plural ? " are " : " is "
                if (evento1.diff > evento2.diff) {
                  testo = ucfirst(evento2.name) + verb + "closer in time to us than to " + evento1.name + "."
                } else if (evento1.diff < evento2.diff) {
                  testo = ucfirst(evento2.name) + verb + "closer in time to " + evento1.name + " than to us."
                } else {
                  testo = ucfirst(evento2.name) + verb + "exactly halfway between " + evento1.name + " and us."
                }
              }
              if (contesto.events.length === 3) {
                let evento1 = contesto.events[0]
                let evento2 = contesto.events[1]
                let evento3 = contesto.events[2]

                if (evento1.diff > evento3.diff) {
                  testo = "The time passed between " + evento1.name + " and " + evento2.name + " is longer than the time passed between " + evento3.name + " and us."
                } else if (evento1.diff < evento3.diff) {
                  testo = "The time passed between " + evento1.name + " and " + evento2.name + " is shorter than the time passed between " + evento3.name + " and us."
                } else {
                  testo = "The time passed between " + evento1.name + " and " + evento2.name + " is the same passed between " + evento3.name + " and us."
                }
              }
              setTitle(testo)
              return (<Typography variant={"h1"} align={"center"} dangerouslySetInnerHTML={{ __html: testo }}></Typography>)
            }}
          </EventsContext.Consumer>)
      }}
    </TitleContext.Consumer>
  )
}

export default Sentence
