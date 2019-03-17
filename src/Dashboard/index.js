import React from 'react'
import WelcomeMessage from '../Settings/WelcomeMessage';
import PlaceHolder from '../Settings/Placeholder';
import ByeMessage from '../Settings/ByeMessage';
import ConfirmButton from '../Settings/ConfirmButton';
import CoinGrid from '../Settings/CoinGrid';
import Page from '../Shared/Page';
import Search from '../Settings/Search';
import PriceGrid from './PriceGrid';
import CoinSpotlight from './CoinSpotlight';
import styled from 'styled-components'
import PriceChart from './PriceChart';



const ChartGrid = styled.div`
  display:grid;
  margin-top:20px;
  grid-gap:15px;
  grid-template-columns:1fr 3fr;
`;

export default function() {
  return <Page name = 'dashboard'>
      <div>If want to view data of other cryptocurrencies select them as your favourites in Settings</div>
      <div>If no favourite is selected Bitcoin is chosen by default</div>
      <PriceGrid/>
      <ChartGrid>
        <CoinSpotlight/>
        <PriceChart/>
      </ChartGrid>
      <ByeMessage/>
    </Page>
  
}