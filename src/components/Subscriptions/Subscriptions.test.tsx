import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Subscriptions } from './Subscriptions';

describe('Subscriptions', () => {
  it('calls handleSubscribe and handlePublish correctly', () => {
    // Mock functions
    const handleSubscribe = jest.fn();
    const handlePublish = jest.fn();

    render(
      <Subscriptions
        handleSubscribe={handleSubscribe}
        handlePublish={handlePublish}
      />
    );

    // Test subscribing to a topic
    const topicInput = screen.getByPlaceholderText('Enter topic');
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });

    fireEvent.change(topicInput, { target: { value: 'topic1' } });
    fireEvent.click(subscribeButton);

    expect(handleSubscribe).toHaveBeenCalledWith('topic1');

    // Test publishing a message
    const messageInput = screen.getByPlaceholderText('Enter message');
    const publishButton = screen.getByRole('button', { name: 'Publish' });

    fireEvent.change(messageInput, { target: { value: 'Hello' } });
    fireEvent.click(publishButton);

    expect(handlePublish).toHaveBeenCalledWith('topic1', 'Hello');
  });
});
