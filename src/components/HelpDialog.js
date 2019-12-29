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
import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNoteOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import MemoryOutlinedIcon from '@material-ui/icons/MemoryOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import LocalMoviesOutlinedIcon from '@material-ui/icons/LocalMoviesOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import SportsSoccerOutlinedIcon from '@material-ui/icons/SportsSoccerOutlined';
import TagFacesOutlinedIcon from '@material-ui/icons/TagFacesOutlined';

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
          <p>Choose some events by typing in the text field to filter results. You can also search by year or by category:</p>
        <ul>
          <li><MusicNoteOutlinedIcon fontSize={"small"}/> music</li>
          <li><AccountBalanceOutlinedIcon fontSize={"small"}/> history</li>
          <li><MemoryOutlinedIcon fontSize={"small"}/> computer</li>
          <li><PaletteOutlinedIcon fontSize={"small"}/> art</li>
          <li><LocalMoviesOutlinedIcon fontSize={"small"}/> film</li>
          <li><LocationCityOutlinedIcon fontSize={"small"}/> building</li>
          <li><EmojiObjectsOutlinedIcon fontSize={"small"}/> science</li>
          <li><MenuBookOutlinedIcon fontSize={"small"}/> book</li>
          <li><SportsSoccerOutlinedIcon fontSize={"small"}/> sport</li>
          <li><TagFacesOutlinedIcon fontSize={"small"}/> pop culture</li>
        </ul>
        <p>After you've chosen some events, the timeline will be updated to show the timespans.</p>
        <p>The dates chosen for some events may be approximate when a precise dating is not possible. Supporting one dating hypothesis against others is beyond the scope of this app. We suggest to read the Wikipedia article (by clicking on the event's name) to learn more about each event, person or object.</p>
        </Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.close} color="primary">
        <Typography variant={"body1"}>Dismiss</Typography>
      </Button>
    </DialogActions>
  </Dialog>)

}

export default HelpDialog
