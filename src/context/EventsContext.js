import React from "react"

const defaultState = {
  events: [],
  selectEvents: () => {},
  removeEvent: () => {},
}

const EventsContext = React.createContext(defaultState)

class EventsProvider extends React.Component {
  state = {
    events: []
  }
  selectEvents = (event) => {
    this.setState({
      events: [...this.state.events, event]
    })
  }
  deleteEvent = (event) => {
    this.setState({
      events: this.state.events.filter(value => value.mysqlId !== event.mysqlId)
    })
  }

  render() {
    const { children } = this.props
    const {events} = this.state

    return(
      <EventsContext.Provider
        value={{
          events,
          selectEvents: this.selectEvents,
          deleteEvent: this.deleteEvent
        }}
        >
        {children}
      </EventsContext.Provider>
    )
  }
}

export default EventsContext
export { EventsProvider }
