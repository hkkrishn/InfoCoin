import React from 'react';
import styled,{css} from 'styled-components';
import {SelectableTile} from '../Shared/Tile';
import { fontSize3,fontSizeBig, greenBoxShadow } from '../Shared/Styles';
import {CoinHeaderGridStyled} from '../Settings/CoinHeader'
import {AppContext} from '../App/AppProvider';


const JustifyRight = styled.div`
  justify-self:right;
`;

const JustifyLeft = styled.div`
  justify-self:left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    display:grid
    ${fontSize3}
    grid-gap:5px;
    grid-template-columns:repeat(3,1fr);
    justify-items:right;
  `}

  ${props => props.currentFavourite && css`
    ${greenBoxShadow}
    pointer-events:none;
  `}
`;

const ChangePercent = styled.div`
  color:green;
  ${props => props.red&&css`
    color:red;
  `}
`;

const numberFormat= number =>{
  //first convert number to string to slice it and then convert back to num with + symbol
  return +(number + '').slice(0,7);
}



const ChangePct =({data}) => {
  return(
    <JustifyRight>
          <ChangePercent red = {data.CHANGEPCT24HOUR<0}>
            {numberFormat(data.CHANGEPCT24HOUR)}
          </ChangePercent>
    </JustifyRight>
  );
  
};


function PriceTile({sym,data,currentFavourite,setCurrentFavourite}){
  return(
    <PriceTileStyled onClick = {setCurrentFavourite} currentFavourite = {currentFavourite}>
      <CoinHeaderGridStyled>
        <div>{sym}</div>
      <ChangePct data = {data}/>
      </CoinHeaderGridStyled>
      <TickerPrice>
        ${numberFormat(data.PRICE)} 
      </TickerPrice>
    </PriceTileStyled>
  )
};

 const PriceTileCompact = ({sym,data,currentFavourite,setCurrentFavourite}) =>{
    return(
      <PriceTileStyled  onClick = {setCurrentFavourite} compact currentFavourite = {currentFavourite}>
        <JustifyLeft>{sym}</JustifyLeft>
        <ChangePct data = {data}/>
      
      <div>
        ${numberFormat(data.PRICE)} 
      </div>
    </PriceTileStyled>

    )
 }


export default function({price,index}) {
  let sym = Object.keys(price)[0];
  let data = price[sym]['USD'];
  let TileClass = index < 5 ? PriceTile: PriceTileCompact;


  return (
    <AppContext.Consumer>
      {({currentFavourite,setCurrentFavourite})=>
      <TileClass 
        sym={sym} 
        data={data} 
        currentFavourite={currentFavourite === sym}
        setCurrentFavourite = {() => setCurrentFavourite(sym)}
        >
      </TileClass>
      }
    </AppContext.Consumer>
  )
}
