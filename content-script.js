// Listen for messages from the background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "convertVideo") {
      // Extract the YouTube video URL
      const videoUrl = window.location.href;
  
      // Send the video URL back to the background script
      browser.runtime.sendMessage({ action: "startConversion", videoUrl: videoUrl });
    }
  });
  