import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { expect, jest, describe, it, beforeEach, afterEach } from '@jest/globals';
import type { SpyInstance } from 'jest-mock';
import type { RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const ErrorComponent = (): JSX.Element => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  let consoleSpy: SpyInstance;
  let renderResult: RenderResult;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    renderResult?.unmount?.();
  });

  it('renders children when there is no error', () => {
    renderResult = render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    const element = renderResult.getByText('Test content');
    expect(element).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    renderResult = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const titleElement = renderResult.getByText('Something went wrong');
    const errorElement = renderResult.getByText('Test error');
    expect(titleElement).toBeInTheDocument();
    expect(errorElement).toBeInTheDocument();
  });

  it('reloads page when reload button is clicked', () => {
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    renderResult = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const button = renderResult.getByText('Reload page');
    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalled();
  });
}); 