import React from 'react'
import WelcomeMessage from './WelcomeMessage';
import PlaceHolder from './Placeholder';
import ByeMessage from './ByeMessage';
import ConfirmButton from './ConfirmButton';
import CoinGrid from './CoinGrid';
import Page from '../Shared/Page';


export default function() {
  return <Page name = 'settings'>
      <WelcomeMessage/>
      <PlaceHolder/>
      <br/>
      <CoinGrid topSection/>
      <ConfirmButton/>
      <CoinGrid/>
      <ByeMessage/>
    </Page>
  
}
