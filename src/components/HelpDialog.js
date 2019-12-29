import React from "react"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from "@material-ui/core/styles/useTheme"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"

const HelpDialog = (props) => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return(<Dialog
    fullScreen={fullScreen}
    open={props.open}
    onClose={props.close}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title"><Typography variant={"h2"}>Instructions</Typography></DialogTitle>
    <DialogContent>
      <DialogContentText>
        <Typography variant={"body1"}>
        Choose two events by typing in the text fields to get suggestions. You can also search by year or by category:

        music
        history
        computer
        art
        film
        building
        science
        book
        sport
        pop culture
        personal
        submitted

        After you've chosen two events, the timeline will be updated to show the timespans.

        The dates chosen for some events may be approximate when a precise dating is not possible. Supporting one dating hypothesis against others is beyond the scope of this app. We suggest to read the Wikipedia article (clicking on the event's name) to learn more about each event, person or object.
        </Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={props.close} color="primary">
        <Typography variant={"body1"}>Dismiss</Typography>
      </Button>
    </DialogActions>
  </Dialog>)

}

export default HelpDialog
