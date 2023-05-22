import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopicList } from './TopicList';
import { Topic } from '../types'

describe('TopicList', () => {
  it('renders a list of topics', () => {
    const topics: Topic[] = [
      { id: '1', topic: 'Topic 1', messages:[''] },
      { id: '2', topic: 'Topic 2', messages:[''] },
      { id: '3', topic: 'Topic 3', messages:[''] },
    ];

    render(<TopicList topicsById={topics as Topic[]} />);

    // Check if each topic is rendered
    topics.forEach((topic) => {
      const topicElement = screen.getByText(topic.topic);
      expect(topicElement).toBeInTheDocument();
    });
  });
});
