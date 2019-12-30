import React from "react"
import moment from "moment"

const defaultState = {
  events: [],
  onlyYears: false,
  selectEvents: () => {},
  removeEvent: () => {},
}

const EventsContext = React.createContext(defaultState)

class EventsProvider extends React.Component {
  state = {
    events: [],
    onlyYears: false
  }

  setOnlyYears = (value) => {
    this.setState((prevState) => {
      return {
        onlyYears: (value)
      }
    })
  }

  compareDates = (e1, e2) => {
    if(e1.month && e1.day && e2.month && e2.day) {
      const data1 = moment().utc().year(e1.year).month(e1.month).date(e1.day).hour(12).minute(0).seconds(0).millisecond(0);
      const data2 = moment().utc().year(e2.year).month(e2.month).date(e2.day).hour(12).minute(0).seconds(0).millisecond(0);
      if (data1.isBefore(data2)) return -1
      if (data1.isAfter(data2)) return 1
      return 0
    } else {
      const data1 = moment().utc().year(e1.year).hour(12).minute(0).seconds(0).millisecond(0)
      const data2 = moment().utc().year(e2.year).hour(12).minute(0).seconds(0).millisecond(0)
      if (data1.isBefore(data2)) return -1
      if (data1.isAfter(data2)) return 1
      return 0
    }
  }

  selectEvents = (...events) => {
    let orderedEvents = [...this.state.events, ...events].sort(this.compareDates);
    let onlyYears = false
    orderedEvents.forEach((event, index, array) => {
      if(!event.month || !event.day) {
        onlyYears = true
      }
    })
    this.setState({
      events: orderedEvents,
      onlyYears: onlyYears
    })
  }

  deleteEvent = (event) => {
    let eventi = this.state.events.filter(value => value.id !== event.id)
    let onlyYears = false
    eventi.forEach((event, index, array) => {
      if(!event.month || !event.day) {
        onlyYears = true
      }
    })
    this.setState((prevState) => {
      return {
        events: eventi,
        onlyYears: onlyYears
      }
    })
  }

  render() {
    const { children } = this.props
    const {events, onlyYears} = this.state

    return(
      <EventsContext.Provider
        value={{
          events,
          onlyYears,
          selectEvents: this.selectEvents,
          deleteEvent: this.deleteEvent,
          setOnlyYears: this.setOnlyYears,
          compareDates: this.compareDates
        }}
        >
        {children}
      </EventsContext.Provider>
    )
  }
}

export default EventsContext
export { EventsProvider }
