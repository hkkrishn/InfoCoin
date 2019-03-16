import React from 'react'
import WelcomeMessage from '../Settings/WelcomeMessage';
import PlaceHolder from '../Settings/Placeholder';
import ByeMessage from '../Settings/ByeMessage';
import ConfirmButton from '../Settings/ConfirmButton';
import CoinGrid from '../Settings/CoinGrid';
import Page from '../Shared/Page';
import Search from '../Settings/Search';
import PriceGrid from './PriceGrid';



export default function() {
  return <Page name = 'dashboard'>
      <PriceGrid/>
    </Page>
  
}