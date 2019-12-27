import React, {Fragment} from "react"
import EventsContext from "../context/EventsContext"
import Marker from "./Marker"
import TimelinePart from "./TimelinePart"
import { Box } from "@material-ui/core"
import moment from "moment"
import makeStyles from "@material-ui/core/styles/makeStyles"

const displayDate = (event) => {
  let date = '';
  if(event.year){
    if(event.month && event.day) {
      date = moment().utc().year(event.year).month(parseInt(event.month) - 1).date(event.day).hour(12).minute(0).seconds(0).millisecond(0).format("MMMM Do, ");
    }
    date += (event.year>0) ? event.year : Math.abs(event.year)+' B.C.'
  }
  return date;
}

const Timeline = () => {

  const useStyles = makeStyles(theme => (
    {
      timeline: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '150px'
      },
      single: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '150px'
      },
    }
  ))

  const classes = useStyles();

  return (<EventsContext.Consumer>
      {(eventi) => {

        let onlyYears = false;

        const compareDates = (e1, e2) => {
          if(e1.month && e1.day && e2.month && e2.day) {
            const data1 = moment().utc().year(e1.year).month(e1.month).date(e1.day).hour(12).minute(0).seconds(0).millisecond(0);
            const data2 = moment().utc().year(e2.year).month(e2.month).date(e2.day).hour(12).minute(0).seconds(0).millisecond(0);
            if (data1.isBefore(data2)) return -1
            if (data1.isAfter(data2)) return 1
            return 0
          } else {
            onlyYears = true
            const data1 = moment().utc().year(e1.year).hour(12).minute(0).seconds(0).millisecond(0)
            const data2 = moment().utc().year(e2.year).hour(12).minute(0).seconds(0).millisecond(0)
            if (data1.isBefore(data2)) return -1
            if (data1.isAfter(data2)) return 1
            return 0
          }
        }



        const setOnlyYears = (event, index, array) => {
          if(!event.month || !event.day) {
            onlyYears = true
          }
        }

        eventi.events.forEach(setOnlyYears);

        const orderedEvents = eventi.events.sort(compareDates);

        const calcDistance = (event, index, array) => {
          if(onlyYears){
            const date = moment().utc().year(event.year).hour(12).minute(0).seconds(0).millisecond(0);
            let date2;
            if(index + 1 < array.length) {
              let event2 = array[index + 1];
              date2 = moment().utc().year(event2.year).hour(12).minute(0).seconds(0).millisecond(0);
            } else {
              date2 = moment().utc().hour(12).minute(0).seconds(0).millisecond(0);
            }
            event.diff = Math.abs(date.diff(date2, 'years'));
            event.unit = 'year';
          } else {
            const date = moment().utc().year(event.year).month(parseInt(event.month) - 1).date(event.day).hour(12).minute(0).seconds(0).millisecond(0);
            let date2;
            if(index + 1 < array.length) {
              let event2 = array[index + 1];
              date2 = moment().utc().year(event2.year).month(parseInt(event2.month) - 1).date(event2.day).hour(12).minute(0).seconds(0).millisecond(0);
            } else {
              date2 = moment().utc().hour(12).minute(0).seconds(0).millisecond(0);
            }
            event.diff = Math.abs(date.diff(date2, 'days'));
            event.unit = 'day';
          }
          event.order = index
          event.total = array.length
        }

        orderedEvents.forEach(calcDistance)

        return(<Box className={(eventi.length > 0)?classes.timeline:classes.single}>
          {orderedEvents.map(event =>
            <Fragment key={event.mysqlId}>
              <Marker
                event={event}
                type={event.type}
                name={event.name}
                link={event.link}
                year={event.year}
                data={displayDate((event))}
                onClick={() => eventi.deleteEvent(event)}
              />
              <TimelinePart grow={event.diff} unit={event.unit} order={event.order} total={event.total}/>
            </Fragment>
          )}
          <Marker
            name={"Now"}
            data={moment().utc().hour(12).minute(0).seconds(0).millisecond(0).format("MMMM Do, YYYY")}
          />
        </Box>)
      }}
    </EventsContext.Consumer>
  )
}

export default Timeline
