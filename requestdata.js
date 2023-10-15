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

  let lastTime = '';
  let dontRun = false;
  let lastEntry = '';
  let preDont = '';
  async function fetchDataFromApiSong(id) {
    let apiUrl = `https://xmplaylist.com/api/station/${id}`;
  
    if (lastTime && !dontRun && !preDont) {
      const unixTimestamp = Date.parse(lastTime);
      apiUrl += `?last=${unixTimestamp}`;
    }
  
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
      if (data.length > 0) {
        const lastData = data[data.length - 1];
        lastTime = lastData.start_time;
      }
  
      const formattedTime = new Date(lastTime).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
  
      console.log('Last Time (Unix Timestamp):', Date.parse(lastTime));
      console.log('Formatted time:', formattedTime);
  
      // Check if the formatted time is greater than 1:00 and less than 1:10
      const formattedTimeParts = formattedTime.split(':');
      const hours = parseInt(formattedTimeParts[0]);
      const minutes = parseInt(formattedTimeParts[1]);
  
      if (hours < 1 && hours >= 0 && minutes > 0 && minutes < 60) {
        console.log('The time is greater than 1:00 and less than 1:10. Running code...');
        setInterval(function () {
          dontRun = true;
        }, 3000);
       preDont = true
      } else {
        if (preDont === true){
        }else{
          datafetchsong(id);
        }
      
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  