const mockFetch = (status: number, data?: any) => {
  const xhrMockObj = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: 4,
    status,
    response: JSON.stringify(data),
  };

  const xhrMockClass = () => xhrMockObj;

  // @ts-ignore
  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

  setTimeout(() => {
    // @ts-ignore
    xhrMockObj['onreadystatechange']();
  }, 0);
};

export default mockFetch;
