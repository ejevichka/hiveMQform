import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import mqtt from 'mqtt'; // import connect from mqtt// import everything inside the mqtt module and give it the namespace "mqtt"

type MqttWebClientFormProps = {};

const MqttWebClientForm: React.FC<MqttWebClientFormProps> = () => {
  const [hostname, setHostname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    const client = mqtt.connect('d8f93ae87dfc48128403f76653b2bca7.s2.eu.hivemq.cloud');
    client.on('connect', () => setConnectionStatus(true));
    client.on('message', (topic, payload, packet) => {
      setMessages(messages.concat(payload.toString() as any));
    });
  }, []);

  const handleConnect = () => {
    // Handle connection logic here
    // Use the values of hostname, username, and password
    // to connect to the MQTT broker
    console.log('Connecting to MQTT broker...');
  };

  const handleSubscribe = () => {
    // Handle subscription logic here
    // Use the value of topic to subscribe to the MQTT topic
    console.log(`Subscribing to topic: ${topic}`);
  };

  const handlePublish = () => {
    // Handle publishing logic here
    // Use the values of topic and message to publish the MQTT message
    console.log(`Publishing message: ${message} to topic: ${topic}`);
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <FormControl>
          <FormLabel>Hostname</FormLabel>
          <Input
            type="text"
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
            placeholder="Enter hostname"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Topic</FormLabel>
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleConnect}>
          Connect
        </Button>

        <Button colorScheme="green" onClick={handleSubscribe}>
          Subscribe
        </Button>

        <FormControl>
          <FormLabel>Message</FormLabel>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          />
        </FormControl>

        <Button colorScheme="purple" onClick={handlePublish}>
          Publish
        </Button>

        {/* View incoming messages */}
        <Box>
          <strong>Incoming Messages:</strong>
          {/* Display incoming messages here */}
        </Box>
      </VStack>
    </Box>
  );
};

export default MqttWebClientForm;
