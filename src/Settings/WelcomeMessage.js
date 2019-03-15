import React from 'react'
import {AppContext} from '../App/AppProvider';


export default function WelcomeMessage(props) {
  return (
    <AppContext.Consumer>
      {({firstVisit})=>firstVisit?<div>Welcome to CrytoViz,please select your cryptocurrencies of interest.{' '}</div>:null}
    </AppContext.Consumer>
  )
}

