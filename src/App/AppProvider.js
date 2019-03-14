import React, { Component } from 'react';

export const AppContext = React.createContext();
class AppProvider extends Component {
  constructor(props){
    super(props)
    this.state = {
      page:'dashboard',
      setPage:this.setPage,
    }
  }
  setPage = page => this.setState({page});
  render(){
    return(
      <AppContext.Provider value = {this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppProvider;