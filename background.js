// This event runs when the extension is first installed or the browser starts
browser.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    browser.contextMenus.create({
      id: "custom-context-menu", // Unique ID for this context menu item
      title: "Custom Action",    // The label that will appear in the context menu
      contexts: ["all"],         // Show the context menu on any type of page
    });
  });
  
  // Listener for clicks on the context menu item
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "custom-context-menu") {
      // Perform some action when the context menu item is clicked
      console.log(`Context menu item clicked on URL: ${tab.url}`);
    }
  });
  