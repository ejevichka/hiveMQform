import React from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { ICredentials } from "../types"

interface IConnectionForm {
    credentials: ICredentials;
    setCredentials: React.Dispatch<React.SetStateAction<ICredentials>>;
    handleConnect: () => void;
}
export const ConnectionForm: React.FC<IConnectionForm> = ({ credentials, setCredentials, handleConnect }) => {
    const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    }
    return (
        <VStack spacing={4} align="start" padding={'20'}>
            <FormControl>
                <FormLabel>Hostname</FormLabel>
                <Input
                    type="text"
                    name="hostname"
                    value={credentials.hostname}
                    onChange={(e) => handleEvent(e)}
                    placeholder="Enter hostname"
                />
            </FormControl>

            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={(e) => handleEvent(e)}
                    placeholder="Enter username"
                />
            </FormControl>

            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={(e) => handleEvent(e)}
                    placeholder="Enter password"
                />
            </FormControl>
            <Button colorScheme="blue" onClick={handleConnect}>
                Connect
            </Button>
        </VStack>
    )
}