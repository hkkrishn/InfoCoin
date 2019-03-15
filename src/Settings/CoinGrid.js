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

function getCoinsToDisplay(coinList){
  return Object.keys(coinList).slice(0,100);
  //give us only the first 100 cryptocurrencies

}

export default function() {
  return (
    <AppContext.Consumer>
      {({coinList})=>
        <CoinGridStyled>
          {getCoinsToDisplay(coinList).map(coinKey =>
          <CoinTile coinKey = {coinKey}/>
          )}
        </CoinGridStyled>
      }

    </AppContext.Consumer>
      
    
  )
}
