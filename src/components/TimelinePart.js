import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Typography } from "@material-ui/core"

const TimelinePart = (props) => {
  const useStyles = makeStyles(theme => (
    {
      timelinepart: {
        border: '0',
        position: 'relative',
        textAlign: 'center',
        zIndex: '-100',
        //transition: "flex-grow 1.5s ease-in-out,border-color 1s ease-in-out,color 1s ease-in-out",
        borderBottom: 'solid 6px',
        borderBottomColor: 'hsl('+(115+360*props.order/props.total) +', 65%, 50%)',
        height: '0',
        flexGrow: props.grow,
        top: 'calc(1.5vw - 3px)'
      },
      label: {
        position: 'relative',
        top: '-30px',
        color: 'hsl('+(115+360*props.order/props.total) +', 65%, 50%)',
      }
    }
  ))

  const classes = useStyles();

  return(<div className={classes.timelinepart}>
    <Typography variant={"body1"} className={classes.label}>{props.grow} {props.unit}s</Typography>
  </div>)
}

export default TimelinePart
