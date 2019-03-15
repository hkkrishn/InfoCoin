import React from 'react'
import {AppContext} from '../App/AppProvider';

//name is from the prop level
    //page is comes from the app state
export default function({name,children}) {
  return (
    <AppContext.Consumer>
      {({page})=>{
        if(page !== name){
          return null;
        }else{
          return <div>{children}</div>
        }
      }}
    </AppContext.Consumer>
  );
};
