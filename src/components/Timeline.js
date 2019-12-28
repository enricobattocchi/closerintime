import React, { Fragment, useContext } from "react"
import EventsContext from "../context/EventsContext"
import Marker from "./Marker"
import TimelinePart from "./TimelinePart"
import { Box } from "@material-ui/core"
import moment from "moment"
import "moment-precise-range-plugin"
import makeStyles from "@material-ui/core/styles/makeStyles"

const displayDate = (event) => {
  let date = ""
  if (event.year) {
    if (event.month && event.day) {
      date = moment().utc().year(event.year).month(parseInt(event.month) - 1).date(event.day).hour(12).minute(0).seconds(0).millisecond(0).format("MMMM Do, ")
    }
    date += (event.year > 0) ? event.year : Math.abs(event.year) + " B.C."
  }
  return date
}

const Timeline = () => {

  const useStyles = makeStyles(theme => (
    {
      timeline: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "150px",
        marginBottom: "50px",
      },
      single: {
        display: "flex",
        justifyContent: "center",
        marginTop: "150px",
        marginBottom: "50px",
      },
    }
  ))

  const classes = useStyles()

  const contesto = useContext(EventsContext)

  const calcDistance = (event, index, array) => {
    if (contesto.onlyYears) {
      const date = moment().utc().year(event.year).hour(12).minute(0).seconds(0).millisecond(0)
      let date2
      if (index + 1 < array.length) {
        let event2 = array[index + 1]
        date2 = moment().utc().year(event2.year).hour(12).minute(0).seconds(0).millisecond(0)
      } else {
        date2 = moment().utc().hour(12).minute(0).seconds(0).millisecond(0)
      }
      event.diff = Math.abs(date.diff(date2, "years"))
      event.unit = "year"
      event.precisediff = date.preciseDiff(date2)
    } else {
      const date = moment().utc().year(event.year).month(parseInt(event.month) - 1).date(event.day).hour(12).minute(0).seconds(0).millisecond(0)
      let date2
      if (index + 1 < array.length) {
        let event2 = array[index + 1]
        date2 = moment().utc().year(event2.year).month(parseInt(event2.month) - 1).date(event2.day).hour(12).minute(0).seconds(0).millisecond(0)
      } else {
        date2 = moment().utc().hour(12).minute(0).seconds(0).millisecond(0)
      }
      event.diff = Math.abs(date.diff(date2, "days"))
      event.unit = "day"
      event.precisediff = date.preciseDiff(date2)
    }
    event.order = index
    event.total = array.length
  }

  contesto.events.forEach(calcDistance)

  const updateHistory = (event) => {
    let eventIds = contesto.events.filter(item => item.mysqlId !== event.mysqlId).map(item => parseInt(item.mysqlId)).sort((a, b) => a - b);
    let stateObj = { ids : eventIds };
    let path = '/' + eventIds.join('/');
    window.history.pushState(stateObj, '', path);
  }

  return (<Box className={(contesto.events.length > 0) ? classes.timeline : classes.single}>
    {contesto.events.map(event =>
      <Fragment key={event.mysqlId}>
        <Marker
          event={event}
          type={event.type}
          name={event.name}
          link={event.link}
          year={event.year}
          data={displayDate(event)}
          onClick={() => {
              contesto.deleteEvent(event);
              updateHistory(event)
            }
          }        />
        <TimelinePart grow={event.diff} precisediff={event.precisediff} unit={event.unit} order={event.order}
                      total={event.total}/>
      </Fragment>,
    )}
    <Marker
      name={"Now"}
      data={moment().utc().hour(12).minute(0).seconds(0).millisecond(0).format("MMMM Do, YYYY")}
    />
  </Box>)
}

export default Timeline
