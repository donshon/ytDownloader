// This event runs when the extension is first installed or the browser starts
browser.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    browser.contextMenus.create({
      id: "custom-context-menu", // Unique ID for this context menu item
      title: "Custom Action",    // The label that will appear in the context menu
      contexts: ["all"],         // Show the context menu on any type of page
      documentUrlPatterns: ["*://www.youtube.com/watch*"] //only show on YT pages
    });
  });
  
  // Listener for clicks on the context menu item
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "custom-context-menu") {
      // Perform some action when the context menu item is clicked
      browser.tabs.sendMessage(tab.id, { action: "convertVideo" });
    }
  });

// Listen for messages from the content script
browser.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "startConversion") {
    const videoUrl = message.videoUrl;

    // Call the external API to convert the YouTube video to MP3
    const conversionApiUrl = "https://your-mp3-converter-api.com/convert";
    
    fetch(`${conversionApiUrl}?url=${encodeURIComponent(videoUrl)}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Open the MP3 download link
          browser.tabs.create({ url: data.mp3DownloadUrl });
        } else {
          console.error("Conversion failed:", data.error);
        }
      })
      .catch(error => {
        console.error("Error during conversion:", error);
      });
  }
});

  