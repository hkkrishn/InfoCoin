import React from 'react'
import styled,{css} from 'styled-components';

const CoinImage = styled.img`
  height:50px;
  ${props => props.spotlight && css`
    height:200px;
    margin:auto;
    display:block;
  `}

`;

export default function({coin,spotlight}) {
  return (
   <CoinImage
     spotlight = {spotlight}
     alt = {coin.CoinSymbol}
     src = {`http://cryptocompare.com/${coin.ImageUrl}`}
   />
  )
}

//retries the coin object and the style we want passed in, we also get src from the cryptocompare website the coin image url is in the coin object