import React from 'react';
import { Stack, Box, Text } from '@chakra-ui/react';
import { Topic } from '../types'

interface ITopicList {
    topicsById: Topic[]
}
export const TopicList: React.FC<ITopicList> = ({ topicsById }) =>
    <Stack direction='column'>
        {topicsById.map((topic) => (
            <Box key={topic.id} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' padding={2}>
                <Text key={topic.id}>{topic.topic}</Text>
            </Box>
        ))}
    </Stack>
