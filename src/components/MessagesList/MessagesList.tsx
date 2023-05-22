import React from 'react';
import { Box, Flex, Text, Card, CardBody, CardHeader, Heading, StackDivider, Stack } from '@chakra-ui/react';
import { TopicList } from './TopicList'
import { ITopicsById } from '../types'

interface IMessagesList {
    topicsById: ITopicsById;
}

export const MessagesList: React.FC<IMessagesList> = ({ topicsById }) =>
    <Flex color="white">
        <TopicList topicsById={Object.values(topicsById)} />


        <Box flex={1} pl={4} color={'gray.200'}  borderColor={'gray.200'} >
            <Card background={'#282c34'}>
                <CardHeader>
                    <Heading size="md" color={'gray.200'}>Client Report</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider color={'gray.200'} />} spacing="4">
                        {Object.values(topicsById).map((topic) =>
                            topic.messages.map((message) => (
                                <Box key={message}>
                                    <Text pt="2" fontSize="sm" color={'gray.200'} data-testid={`message-${message}`}>
                                        {topic.topic}: {message}
                                    </Text>
                                </Box>
                            ))
                        )}
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    </Flex>
