import { v4 as uuidv4 } from 'uuid';
import { Topic, ITopicsById, ICredentials } from "./types"
import { IClientOptions } from 'mqtt-browser'; 

export const calcTopicsByName = (prevTopics: ITopicsById, receivedTopic: string, decodedMessage:string) => {
    const existingTopic = Object.values(prevTopics).find(topic => topic.topic === receivedTopic);

    if (existingTopic) {
      const updatedTopic = {
        ...existingTopic,
        messages: [...existingTopic.messages, decodedMessage]
      };

      return {
        ...prevTopics,
        [existingTopic.id]: updatedTopic
      };
    } else {
      const id = uuidv4();
      const newTopic: Topic = {
        topic: receivedTopic,
        messages: [decodedMessage],
        id
      };

      return {
        ...prevTopics,
        [id]: newTopic
      };
    }
  };

  export const calcOptions = (credentials:ICredentials):IClientOptions=> {
    const {hostname, username, password} = credentials
    return {
    protocol: 'wss',
    hostname: hostname, //'d8f93ae87dfc48128403f76653b2bca7.s2.eu.hivemq.cloud',
    port: 8884,
    path: '/mqtt',
    clean: true,
    resubscribe: false,
    keepalive: 2200,
    reconnectPeriod: 0,
    username: username, //'ejevichka',
    password: password//'SjwKYYSAP3V8@3m'
}
  }







