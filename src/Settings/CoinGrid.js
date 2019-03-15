import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import { Tile } from '../Shared/Tile';
import { SelectableTile } from '../Shared/Tile';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
    display:grid;
    grid-template-columns:repeat(5,1fr);
    grid-gap:15px
`

function getCoinsToDisplay(coinList,topSection,favourites){
  return topSection?favourites:Object.keys(coinList).slice(0, 100);
  //give us only the first 100 cryptocurrencies

}

export default function({topSection}) {
  return (
    <AppContext.Consumer>
      {({coinList,favourites})=>
        <CoinGridStyled>
          {getCoinsToDisplay(coinList,topSection,favourites).map(coinKey =>
          <CoinTile  topSection = {topSection} coinKey = {coinKey}/>
          )}
        </CoinGridStyled>
      }

    </AppContext.Consumer>
      
    
  )
}
