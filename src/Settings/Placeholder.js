
import React from 'react'
import {AppContext} from '../App/AppProvider';


export default function WelcomeMessage(props) {
  return (
    <AppContext.Consumer>
      {({firstVisit,isEmpty})=>isEmpty&&!firstVisit?<div>Please select your cryptocurrencies of interest.{' '}</div>:null}
    </AppContext.Consumer>
  )
}
