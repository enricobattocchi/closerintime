import React, {useState} from "react"
import SEO from "../components/SEO"
import { Typography } from "@material-ui/core"
import Chooser from "../components/Chooser"
import { EventsProvider } from "../context/EventsContext"
import { TitleProvider } from "../context/TitleContext"
import Timeline from "../components/Timeline"
import Sentence from "../components/Sentence"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
import HelpDialog from "./HelpDialog"

const App = (props) => {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TitleProvider>
      <SEO/>
      <Typography variant={"h2"} align={"center"}>Pick some events <IconButton onClick={handleClickOpen}><HelpOutlineIcon/></IconButton></Typography>
      <HelpDialog open={open} close={handleClose}/>
      <EventsProvider>
        <Chooser {...props}/>
        <Timeline/>
        <Sentence/>
      </EventsProvider>
    </TitleProvider>)
}

export default App
