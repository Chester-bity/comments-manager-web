import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './main/home'
import About from './main/table'

const Routes = () => (
   <Router>
   <Stack key="root">
     <Scene key="home" component={Home} />
   </Stack>
 </Router>
)
export default Routes