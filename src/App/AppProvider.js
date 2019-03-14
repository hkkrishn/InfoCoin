import React, { Component } from 'react';
import cc from 'cryptocompare'; 

export const AppContext = React.createContext();
class AppProvider extends Component {
  constructor(props){
    super(props)
    this.state = {
      page:'dashboard',
      ...this.savedSettings(), //The result of this function is spread the other properties as well
      setPage:this.setPage,
      confirmFavourites:this.confirmFavourites,

    }
  }
  componentDidMount=()=>{
    this.fetchCoins();
  }
   fetchCoins = async () =>{
     let coinList = (await cc.coinList()).Data;
     this.setState({coinList});
   } 
  

  confirmFavourites = ()=>{
   this.setState({
     firstVisit:false,
     page:'dashboard',
    });
    localStorage.setItem('cryptoViz',JSON.stringify({
      test:'hello'
    }));
  }

  savedSettings=()=>{
    let cryptoVizData = JSON.parse(localStorage.getItem('crytoViz'));
    if(!cryptoVizData){
      return{page:'settings',firstVisit:true}
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