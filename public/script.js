document.getElementById('generateButton').addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;
    const loader = document.getElementById('loader');
    const responseTextDiv = document.getElementById('responseText');

    if (!prompt) {
        responseTextDiv.innerText = 'Please enter a prompt.';
        return;
    }

    loader.classList.remove('hidden');
    responseTextDiv.innerText = ''; // Clear previous content

    try {
        const response = await fetch(`/generate-content?prompt=${encodeURIComponent(prompt)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        responseTextDiv.innerText = data.text;
    } catch (error) {
        console.error('Fetch error:', error);
        responseTextDiv.innerText = 'Error: ' + error.message;
    } finally {
        loader.classList.add('hidden');
    }
});
