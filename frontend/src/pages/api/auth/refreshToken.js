async function refreshToken(refreshToken) {
    try {
      const response = await fetch('/api/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.access; // The new access token
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }
  
  export default refreshToken;
  