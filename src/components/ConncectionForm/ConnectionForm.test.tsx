import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConnectionForm } from './ConnectionForm';

describe('ConnectionForm', () => {

  test('should call handleConnect on button click', () => {
    const handleConnectMock = jest.fn();
    const credentials = {
      hostname: 'example.com',
      username: 'testuser',
      password: 'password123',
    };

    render(
      <ConnectionForm
        credentials={credentials}
        setCredentials={() => {}}
        handleConnect={handleConnectMock}
      />
    );

    const connectButton = screen.getByText('Connect');
    fireEvent.click(connectButton);

    expect(handleConnectMock).toHaveBeenCalledTimes(1);
  });
});
