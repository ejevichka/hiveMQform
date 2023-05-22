import React, { useState, useEffect } from 'react';

import { Box, HStack } from '@chakra-ui/react';
import mqtt, { IClientOptions } from 'mqtt-browser'; // import connect from mqtt// import everything inside the mqtt module and give it the namespace "mqtt"
import { ConnectionForm } from "../components/ConncectionForm/ConnectionForm"
import { MessagesList } from "../components/MessagesList/MessagesList"
import {Subscriptions} from "../components/Subscriptions/Subscriptions"
import { ITopicsById } from "./types"
import { calcOptions, calcTopicsByName } from "./utils"

const MqttWebClientForm: React.FC = () => {
    const [credentials, setCredentials] = useState({
        hostname: '',
        username: '',
        password: ''
    });

    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [connectionReady, setConnectionReady] = React.useState(false);
    const [topicsById, setTopicsById] = useState<ITopicsById>({});
    const [client, setClient] = useState<mqtt.MqttClient | null>(null);
 

    useEffect(() => {
        if (connectionReady) {
            const options:IClientOptions = calcOptions(credentials)
            const connectToBroker = async () => {
              try {
                const mqttClient = await mqtt.connect(options);
      
                mqttClient.on('connect', () => {
                  setConnectionStatus(true);
                  setClient(mqttClient);
      
                  mqttClient.on('message', (receivedTopic, payload, packet) => {
                    console.log("packet", packet)
                    const decodedMessage = new TextDecoder().decode(payload);
                
                    setTopicsById(prevTopics => calcTopicsByName(prevTopics, receivedTopic, decodedMessage));
                    });
                  });
        
                  mqttClient.on('error', (error) => {
                    console.error('MQTT connection error:', error);
                  });
        
                  mqttClient.on('close', () => {
                    setConnectionReady(false)
                    console.log('Disconnected from MQTT broker');
                  });
                  return () => {
                    mqttClient.end();
                    console.log('Cleaned up MQTT client');
                  };
                } catch (error) {
                  console.error('MQTT connection error:', error);
                }
              };
        
              connectToBroker();
            }
    }, [connectionReady]);

    const handleConnect = () => {
        // Handle connection logic here
        setConnectionReady(true)
        console.log('Connecting to MQTT broker...');
    };

    const handleSubscribe = (topic:string) => {
        client && client.subscribe(topic);
    };

    const handlePublish = (topic:string, message:string) => {
        client && client.publish(topic, message);
    };

    return (
        <Box p={4} >
            {!!connectionStatus && <div className="radar">
                <div className="pointer"></div>
                <div className="shadow"></div>
            </div> }
            <HStack align={'top'} justify="flex-start">
            <ConnectionForm
                credentials={credentials}
                setCredentials={setCredentials}
                handleConnect={handleConnect}
            />
            <Subscriptions handleSubscribe={handleSubscribe} handlePublish={handlePublish}/>
            </HStack>
            { Object.keys(topicsById).length > 0 && <MessagesList topicsById={topicsById} /> }
        </Box>
    );
};

export default MqttWebClientForm;
