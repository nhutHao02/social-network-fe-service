const perform = async (endpoint, params = {}, payload = {}) => {
  const { method, url, requiresToken, responseType } = endpoint;
  const fullUrl = typeof url === 'function' ? url(params) : url;
  const token = localStorage.getItem('token');

  if (requiresToken && !token) {
    console.error('Error: Token is required but not found.');
    return;
  }
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(requiresToken && { Authorization: `Bearer ${token}` })
  });

  const options = {
    method,
    headers,
    ...(payload && Object.keys(payload).length > 0 && { body: JSON.stringify(payload) })
  };
  try {
    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return responseType === 'json' ? response.json() : response.text();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
export default perform;