import TestRenderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

export async function wait(ms = 0) {
  await act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

export async function waitRenderer(ms = 0) {
  await TestRenderer.act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}
