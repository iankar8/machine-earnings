/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

const ErrorComponent = (): JSX.Element => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    const { container } = render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    const view = within(container);
    const element = view.getByText('Test content');
    expect(element).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    const { container } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const view = within(container);
    const titleElement = view.getByText('Something went wrong');
    const errorElement = view.getByText('Test error');
    expect(titleElement).toBeInTheDocument();
    expect(errorElement).toBeInTheDocument();
  });

  it('reloads page when reload button is clicked', () => {
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    const { container } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const view = within(container);
    const button = view.getByText('Reload page');
    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalled();
  });
}); 