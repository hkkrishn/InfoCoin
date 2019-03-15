import React from 'react';
import {AppContext} from '../App/AppProvider';
import {SelectableTile,DisabledTile,DeletableTile} from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeader'
import CoinImage from '../Shared/CoinImage';


export default function({coinKey, topSection}){
  return <AppContext.Consumer>
    {({coinList, addCoin, removeCoin, isInFavourites}) => {
      let coin = coinList[coinKey];

      let TileClass = SelectableTile;
      if(topSection){
        TileClass = DeletableTile;
      }else if(isInFavourites(coinKey)){
        TileClass = DisabledTile; //pointer events none means we cannot select that!
      }

      return <TileClass
        onClick={ClickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
      >
        <CoinHeaderGrid
          topSection={topSection}
          name={coin.CoinName}
          symbol={coin.Symbol}/>
        <CoinImage coin={coin}/>
      </TileClass>
    }}
  </AppContext.Consumer>
}


const ClickCoinHandler = (topSection,coinKey,addCoin,removeCoin) => {
  return topSection ? () =>{
    removeCoin(coinKey)
  }: () =>{
    addCoin(coinKey);
  }
}