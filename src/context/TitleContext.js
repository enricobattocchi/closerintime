import React from "react"

const defaultState = {
  title: '',
  setTitle: () => {},
}

const TitleContext = React.createContext(defaultState)

class TitleProvider extends React.Component {
  state = {
    title: ''
  }

  setTitle = (newTitle) => {
    if(this.state.title !== newTitle){
      this.setState((prevState) => {
          return {
            title: newTitle
          }
        }
      )
    }
  }

  render() {
    const { children } = this.props
    const { title } = this.state

    return(
      <TitleContext.Provider
        value={{
          title,
          setTitle: this.setTitle
        }}
        >
        {children}
      </TitleContext.Provider>
    )
  }
}

export default TitleContext
export { TitleProvider }
