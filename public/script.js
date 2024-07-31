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
        const data = await response.json();
        if (response.ok) {
            responseTextDiv.innerText = data.text;
        } else {
            responseTextDiv.innerText = 'Error: ' + data.error;
        }
    } catch (error) {
        responseTextDiv.innerText = 'Error: ' + error.message;
    } finally {
        loader.classList.add('hidden');
    }
});
