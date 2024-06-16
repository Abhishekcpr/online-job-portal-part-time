async function getGeminiResponse(prompt)
{
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    };

    
    const response = await fetch('http://localhost:5000/api/gemini', requestOptions);
    const responseData = await response.json();
    // console.log(responseData);
   
    return responseData.bot;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default getGeminiResponse ;