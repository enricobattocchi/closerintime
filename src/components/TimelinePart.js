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
        display: 'flex',
        justifyContent: 'center',
        flexGrow: props.grow,
        //transition: "flex-grow 1.5s ease-in-out,border-color 1s ease-in-out,color 1s ease-in-out",
        borderBottom: 'solid 6px',
        borderBottomColor: 'hsl('+(115+360*props.order/props.total) +', 65%, 50%)',
        height: '0',
        top: '22px',
        [theme.breakpoints.down('xs')]: {
          border: '0',
          borderLeft: 'solid 6px',
          borderLeftColor: 'hsl('+(115+360*props.order/props.total) +', 65%, 50%)',
          height: 'unset',
          width: '20vw',
          top: 'unset',
          left: '22px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
        },
      },
      label: {
        position: 'relative',
        top: '-35px',
        color: 'hsl('+(115+360*props.order/props.total) +', 65%, 50%)',
        [theme.breakpoints.down('xs')]: {
          top: '0',
          right: '25vw',
          width: '20vw',
          textAlign: 'right'
        }
      }
    }
  ))

  const classes = useStyles();

  return(<div className={classes.timelinepart}>
    <Typography variant={"body1"} className={classes.label}>{props.precisediff}</Typography>
  </div>)
}

export default TimelinePart
