import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import '@testing-library/jest-dom';

const ErrorComponent = (): JSX.Element => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    const element = screen.getByText('Test content') as HTMLElement;
    expect(element).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const titleElement = screen.getByText('Something went wrong') as HTMLElement;
    const errorElement = screen.getByText('Test error') as HTMLElement;
    expect(titleElement).toBeInTheDocument();
    expect(errorElement).toBeInTheDocument();
  });

  it('reloads page when reload button is clicked', () => {
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const button = screen.getByText('Reload page') as HTMLButtonElement;
    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalled();
  });
}); 