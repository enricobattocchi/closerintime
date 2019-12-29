import React from "react"
import Fab from "@material-ui/core/Fab"
import { makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import CategoryIcon from "./CategoryIcon"
import Paper from "@material-ui/core/Paper"

const Marker = (props) => {
  const useStyles = makeStyles(theme => (
    {
      box: {
        width: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: '0',
        '&:hover': {
          zIndex: '100'
        },
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'row',
          width: 'auto',
          height: 0
        }
      },
      fab: {
        height: '50px',
        width: '50px',
        minHeight: 'unset',
        flex: '0 0 50px'
      },
      icona: {
        height: '30px',
        width: '30px',
      },
      paper:{
        fontWeight: 'bold',
        textDecoration: 'none',
        padding: '7px',
        marginTop: '5px',
        width: '10vw',
        [theme.breakpoints.down('sm')]: {
          width: '20vw',
        },
        [theme.breakpoints.down('xs')]: {
          marginTop: '0',
          marginLeft: '5px',
          width: '50vw',
        }
      },
      title:{
        fontWeight: 'bold',
        textDecoration: 'none',
        fontSize: '0.8em',
        lineHeight: '1',
        '&:first-letter' : {
          textTransform: 'uppercase'
        }
      },
      data:{
        textDecoration: 'none',
        fontSize: '0.8em',
        lineHeight: '1',
        marginBottom: '5px'
      },
    }
  ))

  const classes = useStyles();

  return(
    <Box className={classes.box}>
      <Fab color="primary" className={classes.fab} onClick={props.onClick}>
        <CategoryIcon type={props.type} className={classes.icona} color="secondary"/>
      </Fab>
      <Paper component={"a"} href={props.link} target={'_blank'} className={classes.paper}>
        <Typography variant={"body2"} className={classes.data} align={"center"}>{props.data}</Typography>
        <Typography variant={"body1"} className={classes.title} align={"center"}>{props.name}</Typography>
      </Paper>
    </Box>)
}

export default Marker;
