import React from 'react';
import {Tile} from '../Shared/Tile';
import {AppContext} from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';
import styled from 'styled-components';


const SpotLighName = styled.h2`
  text-align:center;
`

export default function() {
  return (
    <AppContext.Consumer>
      {({currentFavourite,coinList})=>
        <Tile> 
        <SpotLighName> {coinList[currentFavourite].CoinName} </SpotLighName> 
         <CoinImage spotlight coin = {coinList[currentFavourite]}/>
        </Tile>
      }
    </AppContext.Consumer>
  )
}
