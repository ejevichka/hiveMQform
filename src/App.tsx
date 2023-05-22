import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import MqttWebClientForm from './components/Form'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <header className="App-header">
          <MqttWebClientForm />
        </header>
      </ChakraProvider>
    </div>
  );
}

export default App;
