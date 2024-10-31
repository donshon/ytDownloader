// This event runs when the extension is first installed or the browser starts
browser.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    browser.contextMenus.create({
      id: "custom-context-menu", // Unique ID for this context menu item
      title: "Download as MP3",    // The label that will appear in the context menu
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
    //open mp3 download link
    browser.tabs.create({ url: videoUrl });
  }
});

  