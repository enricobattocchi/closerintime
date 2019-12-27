import React from "react"
import Components from "./Components"

const CategoryIcon = (props) => {
  let Component = Components['default']
  if(props.type) {
    Component = Components[props.type]
  }

  return( <Component {...props} />)
}

export default CategoryIcon;






