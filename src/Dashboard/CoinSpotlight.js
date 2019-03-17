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
      {({currentFavourite,coinList,isEmpty})=>
        <Tile>
        {isEmpty(currentFavourite) ? <div> Please Select Coins from Settings</div> :<div>
        <SpotLighName> {coinList[currentFavourite].CoinName} </SpotLighName> 
         <CoinImage spotlight coin = {coinList[currentFavourite]}/>
        </div>}
        </Tile>
      }
    </AppContext.Consumer>
  )
}
