import PropTypes from "prop-types"
import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Toolbar } from "@material-ui/core"

const Header = ({ siteTitle }) => {

  const useStyles = makeStyles(theme => (
    {
      toolbar: {
        justifyContent: 'center'
      }
    }
  ))

  const classes = useStyles()


  return(
    <AppBar color="primary" position={"sticky"}
    >
      <Toolbar className={classes.toolbar}>
        <Typography variant="h1" align={"center"}>
          {siteTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
