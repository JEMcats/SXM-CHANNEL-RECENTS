async function fetchDataFromApi(key) {
    const apiUrl = 'https://xmplaylist.com/api/station';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (key) {
        // Return the specified key from the JSON object
        return data.find(item => item.number === key);
      }
  
      return data;  // Return the entire JSON object
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  async function fetchDataFromApiSong(id) {
    const apiUrl = `https://xmplaylist.com/api/station/${id}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      return data;  // Return the entire JSON object
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  