import React from 'react'
import styled from 'styled-components';
import {backgroundColor2,fontSize2} from '../Shared/Styles';
import {AppContext} from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';


const SearchGrid = styled.div`
    display:grid;
    grid-template-columns:200px 1fr;

`;
const SearchInput = styled.input`
  ${backgroundColor2}
  color: #1163c9
  ${fontSize2}
  border: 1px solid;
  height:25px;
  place-self: center left;

`;
//use debounce lodash function to prevent too many filtering operations done at a time!
const handleFilter = _.debounce((inputValue,coinList,setFilteredCoins) =>{
  //wait half a second before retrieving input data.
  //get all the coin symbols
  let coinSymbol = Object.keys(coinList);
  //get all the coin names ,map symbol to name
  let coinNames = coinSymbol.map(sym =>coinList[sym].CoinName)
  //compile a list of all the strings that we want to search 
  let allStringsToSearch = coinSymbol.concat(coinNames);
  let fuzzyResults = fuzzy
  .filter(inputValue,allStringsToSearch,{})
  .map(result => result.string);
  
  //iterator function to be able to determine 
  let filteredCoins = _.pickBy(coinList,(result,symKey) =>{
    let coinName = result.CoinName;
    return(_.includes(fuzzyResults,symKey)||_.includes(fuzzyResults,coinName));
  })
  setFilteredCoins(filteredCoins);
},500)
 function filterCoins(e,setFilteredCoins,coinList){
  //get input value
  let inputValue = e.target.value;
  if(!inputValue){
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue,coinList,setFilteredCoins);

}
export default function () {
  return (
    <AppContext.Consumer>
    {({setFilteredCoins,coinList})=>
      <SearchGrid>
        <h2>Search All Coins</h2>
        <SearchInput onKeyUp ={(e)=> filterCoins(e,setFilteredCoins,coinList)}/>
      </SearchGrid>
    }
    </AppContext.Consumer>
  )
}
