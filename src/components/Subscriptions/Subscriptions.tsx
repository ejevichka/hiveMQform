import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
interface ISubscriptions {
    handleSubscribe: (topic: string) => void
    handlePublish: (topic: string, message: string) => void
}
export const Subscriptions: React.FC<ISubscriptions> = ({ handleSubscribe, handlePublish }) => {
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    return (
        <VStack spacing={4} align="start" padding={'20'}>
            <FormControl>
                <FormLabel>Topic</FormLabel>
                <Input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic"
                />
            </FormControl>
            <Button colorScheme="green" onClick={() => handleSubscribe(topic)}>
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

            <Button colorScheme="purple" onClick={() => handlePublish(topic, message)}>
                Publish
            </Button>
        </VStack>
    )
}