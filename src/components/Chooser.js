import React, { Fragment, useContext, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { graphql, useStaticQuery } from "gatsby"
import EventsContext from "../context/EventsContext"
import makeStyles from "@material-ui/core/styles/makeStyles"
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined"
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined"
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined"
import MemoryOutlinedIcon from "@material-ui/icons/MemoryOutlined"
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined"
import LocalMoviesOutlinedIcon from "@material-ui/icons/LocalMoviesOutlined"
import LocationCityOutlinedIcon from "@material-ui/icons/LocationCityOutlined"
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined"
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined"
import SportsSoccerOutlinedIcon from "@material-ui/icons/SportsSoccerOutlined"
import TagFacesOutlinedIcon from "@material-ui/icons/TagFacesOutlined"
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined"
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined"


const Chooser = (props) => {

  let ids = [props.id1, props.id2, props.id3]

  const useStyles = makeStyles(theme => (
    {
      autocomplete: {
        maxWidth: "600px",
        margin: "0 auto",
      },
      option: {
        //fontSize: '0.8rem',
        margin: "0",
      },
      span: {
        marginLeft: "5px",
        "&:first-letter": {
          textTransform: "uppercase",
        },
      },
    }
  ))

  const classes = useStyles()

  const getIcon = (type) => {
    switch (type) {
      case "music":
        return <MusicNoteOutlinedIcon color="primary"/>
      case "history":
        return <AccountBalanceOutlinedIcon color="primary"/>
      case "computer":
        return <MemoryOutlinedIcon color="primary"/>
      case "art":
        return <PaletteOutlinedIcon color="primary"/>
      case "film":
        return <LocalMoviesOutlinedIcon color="primary"/>
      case "building":
        return <LocationCityOutlinedIcon color="primary"/>
      case "science":
        return <EmojiObjectsOutlinedIcon color="primary"/>
      case "book":
        return <MenuBookOutlinedIcon color="primary"/>
      case "sport":
        return <SportsSoccerOutlinedIcon color="primary"/>
      case "pop culture":
        return <TagFacesOutlinedIcon color="primary"/>
      case "personal":
        return <PersonOutlinedIcon color="primary"/>
      case "submitted":
        return <InboxOutlinedIcon color="primary"/>
      default:
        return <EventAvailableOutlinedIcon color="primary"/>
    }
  }

  const { events, selectEvents } = useContext(EventsContext)

  const onSelect = (e, value) => {
    selectEvents(value);
    let eventIds = [...events,value].map(event => parseInt(event.mysqlId)).sort((a, b) => a - b);
    let stateObj = { ids : eventIds };
    let path = '/' + eventIds.join('/');
    window.history.pushState(stateObj, '', path);
  }

  const data = useStaticQuery(graphql`
      query{
        allMysqlEvents {
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
      `)

  useEffect(() => {
    let newEvents = []
    data.allMysqlEvents.nodes.forEach(event => {
      if (ids.indexOf(String(event.mysqlId)) !== -1) {
        newEvents.push(event)
      }
    })
    selectEvents(...newEvents)
  }, [])

  return (<Fragment><Autocomplete
    classes={{
      option: classes.option,
    }}
    className={classes.autocomplete}
    options={data.allMysqlEvents.nodes}
    getOptionDisabled={ option => events.map(e => e.mysqlId).indexOf(option.mysqlId) !== -1 }
    disableClearable
    blurOnSelect
    getOptionLabel={option => ""}
    renderOption={option => (
      <React.Fragment>
        {getIcon(option.type)} <span
        className={classes.span}><strong>{option.name}</strong> - {(option.year > 0) ? option.year : Math.abs(option.year) + " B.C."}</span>
      </React.Fragment>
    )
    }
    renderInput={params => (
      <TextField
        {...params}
        label="Lookup an event or add your own"
        fullWidth
        inputProps={{
          ...params.inputProps,
          autoComplete: "disabled", // disable autocomplete and autofill
        }}
      />
    )}
    onChange={onSelect}
  /></Fragment>)
}

export default Chooser
