import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import { Tile } from '../Shared/Tile';
import { SelectableTile } from '../Shared/Tile';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(100px,1fr));
    grid-gap:15px
`

function getLowerSectionCoins(coinList, filteredCoins){
  

  
  
  return (filteredCoins && Object.keys(filteredCoins)) ||Object.keys(coinList).slice(0, 100)
    
}

function getCoinsToDisplay(coinList, topSection, favourites, filteredCoins){
  
  return topSection ? favourites : getLowerSectionCoins(coinList, filteredCoins);
}

export default function ({topSection}){
  return (
    <AppContext.Consumer>
    {({coinList, favourites, filteredCoins}) => (
      <CoinGridStyled>
        {getCoinsToDisplay(coinList, topSection, favourites, filteredCoins).map(coinKey =>
          <CoinTile key={coinKey} topSection={topSection} coinKey={coinKey}/>
        )}
      </CoinGridStyled>
    )}
  </AppContext.Consumer>
  );
}
