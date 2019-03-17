import React, { Component } from 'react';
import cc from 'cryptocompare';
import _ from 'lodash'; 
import moment from 'moment'


// Limit of Favourite currencies a user can pick
 const MAX_FAVOURITES = 10;
 const TIME_UNITS = 10;
export const AppContext = React.createContext();
class AppProvider extends Component {
  constructor(props){
    super(props)
    this.state = {
      timeInterval:'months',
      page:'dashboard',
      favourites:['BTC', 'ETH', 'XMR', 'DOGE'],
      ...this.savedSettings(), //The result of this function is spread the other properties as well
      setPage:this.setPage,
      addCoin:this.addCoin,
      removeCoin:this.removeCoin,
      isInFavourites:this.isInFavourites,
      isEmpty:true,
      confirmFavourites:this.confirmFavourites,
      setFilteredCoins:this.setFilteredCoins,
      setCurrentFavourite:this.setCurrentFavourite,
      isEmpty:this.isEmpty,
      changeChartSelect:this.changeChartSelect,
    }
  }
  componentDidMount=()=>{
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  }
   fetchCoins = async () =>{
     let coinList = (await cc.coinList()).Data;
     this.setState({coinList});
   } 

   fetchPrices = async () =>{
     if(this.state.firstVisit){
       return;
     }
     let prices = await this.prices();
     console.log(prices);
     this.setState({prices})
   }

   fetchHistorical = async () =>{
     if(this.state.firstVisit){
       return;
     }

     let results = await this.historical();
     console.log(results);
     let historical = [
       {
         name:this.state.currentFavourite,
         data:results.map((ticker,index) => [
            moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(),
            ticker.USD
         ]),
       }
     ];
     this.setState({historical});

   }

   

   prices = async () =>{
     let returnData = []
     for(let i = 0;i< this.state.favourites.length;i++){
       try{
         let pricesData = await cc.priceFull(this.state.favourites[i],'USD')
         returnData.push(pricesData);
       } catch(e){
         console.warn('Prices for coins could not be found',e)
       }
     }
     return returnData;
   }

   historical = () =>{
     let promises = [];
     for(let units  = TIME_UNITS;units>0;units--){
       promises.push(cc.priceHistorical(
         this.state.currentFavourite,
         ['USD'],
         moment().subtract({[this.state.timeInterval]:units}).toDate()
       ))
     }
     //returns after all promises are fetched;
     return Promise.all(promises);
     
   }
   addCoin = (key) =>{
     let favourites = [...this.state.favourites]
     if(favourites.length< MAX_FAVOURITES){
       favourites.push(key);
       this.setState({favourites,isEmpty:false});
       
     }

   }

   removeCoin = (key) =>{
     let favourites = [...this.state.favourites]
     this.setState({favourites:_.pull(favourites,key)})
     //pull this value from the array and return an array with that value removed

   }
  // remember that in arrow functions the parenthesis might affect how a third party function like lodash might be called.
  //  isInFavourites = key =>{
  //    console.log(_.includes(this.state.favourites,key))
  //    _.includes(this.state.favourites,key)
  //  }
   isInFavourites = key => _.includes(this.state.favourites, key)

  //  isEmpty = () =>{
  //    if(this.state.favourites.length === 0){
  //      return true;
  //    }else{
  //      return false;
  //    }
  //  };


  confirmFavourites = ()=>{
    if(this.state.favourites.length === 0){
      this.state.favourites[0] = 'BTC'
    }
   let currentFavourite = this.state.favourites[0];
   this.setState({
     firstVisit:false,
     page:'dashboard',
     prices:null,
     historical:null,
     currentFavourite,
     //callback will run after the state is set
    },()=>{
      this.fetchPrices();
      this.fetchHistorical();
    
    });
    localStorage.setItem('cryptoViz',JSON.stringify({
      favourites:this.state.favourites,
      currentFavourite,
    }));
  }
  setCurrentFavourite = (sym) =>{
    this.setState({
      currentFavourite:sym,
      historical:null
    },this.fetchHistorical);
    localStorage.setItem('cryptoViz',JSON.stringify({...JSON.parse(localStorage.getItem('cryptoViz')),currentFavourite:sym}))
  }
  savedSettings=()=>{
    let cryptoVizData = JSON.parse(localStorage.getItem('cryptoViz'));
    if(!cryptoVizData){
      return{page:'settings',firstVisit:true}
    }
    let {favourites,currentFavourite} = cryptoVizData;
    return {favourites,currentFavourite};
  }
   isEmpty(currentFavourite){
    let empty = false;
    if(currentFavourite === undefined){
      empty = true;
    }
    return empty;
  }

  setPage = page => this.setState({page});

  setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})
  
  changeChartSelect = (value) => {
    this.setState({timeInterval:value,historical:null},this.fetchHistorical)
  }
  
  render(){
    return(
      <AppContext.Provider value = {this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppProvider;