import logo from './logo.svg';
import './App.css';
import Gmap from './assets/components/Gmap';
import React from 'react';
import Weather from './assets/components/Weather';
import { Box } from '@mui/system';

function App() {
  return (
    <div className="App">
      <Box sx={{display:"flex", flexDirection:"row"}}>
        <Box sx={{width: "50%"}}><Weather/></Box>
        <Box sx={{display:"flex", flexDirection:"column", height:"100vh", width:'50vw'}}>
          <Box sx={{height:"50%"}}>
            <Gmap />
          </Box>
          <Box sx={{height:"50%"}}>
            
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
