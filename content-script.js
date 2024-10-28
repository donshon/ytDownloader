// Listen for messages from the background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "convertVideo") {
      // Extract the YouTube video URL
      const videoUrl = window.location.href;
      console.log(`${videoUrl}`);
 
      // Call the external API to convert the YouTube video to MP3
      const apiUrl = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/custom/?url=${videoUrl}&quality=320`
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'a8bb11c2f5mshe7468b4aa5c41e2p1bb4e2jsne2e86e3818dc',
          'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
      };
      
      try {
        fetch(apiUrl, options)
        .then(res => res.json())
        .then(res => {console.log(res.dlink); // Send the video URL back to the background script
          browser.runtime.sendMessage({ action: "startConversion", videoUrl: res.dlink }) })
      } catch (error) {
        console.error(error);
      }
    }
  });
  