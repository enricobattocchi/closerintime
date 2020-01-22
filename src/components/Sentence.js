import React, { useContext, useEffect, Fragment } from "react"
import { Typography } from "@material-ui/core"
import EventsContext from "../context/EventsContext"
import TitleContext from "../context/TitleContext"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import makeStyles from "@material-ui/core/styles/makeStyles"
import { graphql, useStaticQuery } from "gatsby"

const ucfirst = (string) => string[0].toUpperCase() + string.slice(1)

const Sentence = () => {

  const useStyles = makeStyles(theme => ( {
    sentence: {
      fontSize: '1.8em',
    },
    sharing: {
      fontFamily: 'Raleway,sans-serif',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 auto',
      marginTop: '50px',
      maxWidth: '300px'
    },
    button: {
      fontFamily: theme.typography.body1.fontFamily,
      fontWeight: 'bold',
      textTransform: 'none'
    }
  }))

  const classes = useStyles()

  const titleContext = useContext(TitleContext)
  const eventsContext = useContext(EventsContext)
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
            app_id
          }
        }
      }
    `
  )

  let testo = ""
  let sharingText = ""
  let url = site.siteMetadata.url
  if( typeof window !== 'undefined' ) {
    url = window.location.href
  }

  if (eventsContext.events.length === 0) {
    testo = ""
  }
  if (eventsContext.events.length === 1) {
    testo = eventsContext.events[0].precisediff + " ago: <br/>" + eventsContext.events[0].name
    sharingText = eventsContext.events[0].precisediff + " ago: " + eventsContext.events[0].name + " #closerintime"
  }
  if (eventsContext.events.length === 2) {
    let evento1 = eventsContext.events[0]
    let evento2 = eventsContext.events[1]
    let verb = parseInt(evento2.plural) ? " are " : " is "
    if (evento1.diff > evento2.diff) {
      testo = ucfirst(evento2.name) + verb + "closer in time to us than to " + evento1.name + "."
      sharingText = ucfirst(evento2.name) + verb + "#closerintime to us than to " + evento1.name + "."
    } else if (evento1.diff < evento2.diff) {
      testo = ucfirst(evento2.name) + verb + "closer in time to " + evento1.name + " than to us."
      sharingText = ucfirst(evento2.name) + verb + "#closerintime to " + evento1.name + " than to us."
    } else {
      testo = ucfirst(evento2.name) + verb + "exactly halfway between " + evento1.name + " and us."
      sharingText = ucfirst(evento2.name) + verb + "exactly halfway between " + evento1.name + " and us. #closerintime"
    }
  }
  if (eventsContext.events.length === 3) {
    let evento1 = eventsContext.events[0]
    let evento2 = eventsContext.events[1]
    let evento3 = eventsContext.events[2]

    if (evento1.diff > evento3.diff) {
      testo = "More time passed between " + evento1.name + " and " + evento2.name + " than between " + evento3.name + " and us."
      sharingText = "More time passed between " + evento1.name + " and " + evento2.name + " than between " + evento3.name + " and us. #closerintime"
    } else if (evento1.diff < evento3.diff) {
      testo = "More time passed between " + evento3.name + " and us than between " + evento1.name + " and " + evento2.name + "."
      sharingText = "More time passed between " + evento3.name + " and us than between " + evento1.name + " and " + evento2.name + ". #closerintime"
    } else {
      testo = "The same amount time passed between " + evento1.name + " and " + evento2.name + " as it did between " + evento3.name + " and us."
      sharingText = "The same amount time passed between " + evento1.name + " and " + evento2.name + " as it did between " + evento3.name + " and us. #closerintime"
    }
  }

  useEffect(() => {
    titleContext.setTitle(testo)
  }, [testo])

  const copyToClipboard = (text, href) => {

    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    textArea.style.background = 'transparent';
    textArea.value = text+' '+href;

    document.body.appendChild(textArea);

    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
  }


  return (<Fragment>
    <Typography className={classes.sentence} variant={"h1"} align={"center"} dangerouslySetInnerHTML={{ __html: testo }}></Typography>
    {(sharingText) &&
    <Box className={classes.sharing} >
      <Button
        component={"a"}
        className={classes.button}
        target={"_blank"}
        href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(sharingText) + "&url=" + encodeURIComponent(url)}
      startIcon={<TwitterIcon/>}>
        Tweet
      </Button>
      <Button
        component={"a"}
        className={classes.button}
        target={"_blank"}
        href={"https://www.facebook.com/dialog/share?app_id=" + site.siteMetadata.app_id + "&href=" +  encodeURIComponent(url) + "&quote=" + encodeURIComponent(sharingText) + "&hashtag=%23closerintime"}
        startIcon={<FacebookIcon/>}>
        Share
      </Button>
      <Button
        component={"a"}
        className={classes.button}
        onClick={() => copyToClipboard(sharingText,url)}
        startIcon={<FileCopyIcon/>}>
        Copy
      </Button>
    </Box>}
  </Fragment>)
}

export default Sentence
