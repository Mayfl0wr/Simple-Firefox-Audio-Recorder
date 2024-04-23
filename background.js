  // background.js
  chrome.action.onClicked.addListener(async (tab) => {
    const tabId = tab.id;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
  
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
  
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      // Save the audio URL or send it to a server for storage.
      console.log('Audio recording saved:', url);
    };
  
    mediaRecorder.start();
  
    // Stop recording after 10 seconds (you can adjust the duration).
    setTimeout(() => {
      mediaRecorder.stop();
    }, 10000);
  });
  
  // popup.html (for the extension popup)
  <!DOCTYPE html>
  <html>
  <head>
    <title>Tab Audio Recorder</title>
    <script src="popup.js"></script>
  </head>
  <body>
    <button id="startRecording">Start Recording</button>
  </body>
  </html>
  
  // popup.js
  document.getElementById('startRecording').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          // Execute this code in the context of the active tab.
          // You can interact with the DOM or other page elements here.
          // For example, you can trigger audio playback to record it.
        },
      });
    });
  });
