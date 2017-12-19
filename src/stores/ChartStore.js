import { createStore } from 'redux';
import chartApp from '../reducers/chartReducer';
let store = createStore(chartApp);

import {
    setDrawingToolbarVisibility
  } from './actions'

   // Log the initial state
   console.log(store.getState())
   
   // Every time the state changes, log it
   // Note that subscribe() returns a function for unregistering the listener
   const unsubscribe = store.subscribe(() =>
     console.log(store.getState())
   )
   
   // Dispatch some actions
   store.dispatch(setDrawingToolbarVisibility(true));
   
   // Stop listening to state updates
   unsubscribe()