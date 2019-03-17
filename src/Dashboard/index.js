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


const ChartGrid = styled.div`
  display:grid;
  margin-top:20px;
  grid-gap:15px;
  grid-template-columns:1fr 3fr;
`;

export default function() {
  return <Page name = 'dashboard'>
      <PriceGrid/>
      <ChartGrid>
        <CoinSpotlight/>
        <div>Chart Goes Here</div>
      </ChartGrid>
    </Page>
  
}