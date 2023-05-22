import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessagesList } from './MessagesList';

describe('MessagesList', () => {
  test('renders MessagesList component', () => {
    const topicsById = {
      topic1: {
        topic: 'Topic 1',
        messages: ['Message 1', 'Message 2'],
        id: 'topic1',
      },
      topic2: {
        topic: 'Topic 2',
        messages: ['Message 3', 'Message 4'],
        id: 'topic2',
      },
    };

    render(<MessagesList topicsById={topicsById} />);

    const message1Element = screen.getByTestId('message-Message 1');
    const message2Element = screen.getByTestId('message-Message 2');
    const message3Element = screen.getByTestId('message-Message 3');
    const message4Element = screen.getByTestId('message-Message 4');
    expect(message1Element).toBeVisible;
    expect(message2Element).toBeVisible;
    expect(message3Element).toBeVisible;
    expect(message4Element).toBeVisible;
  });
});
