import React from 'react'

export default function({coin,style}) {
  return (
   <img
     alt = {coin.CoinSymbol}
     style = {style || {height: '50px'}}
     src = {`http://cryptocompare.com/${coin.ImageUrl}`}
   />
  )
}

//retries the coin object and the style we want passed in, we also get src from the cryptocompare website the coin image url is in the coin object