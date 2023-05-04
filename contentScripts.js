(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = ""
  let currentVideoBookmarks = []


  // handle when receives a mesasgem from background.js
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj

    if (type == "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    }
  })

  const fetchBookmarks = () => {
    return new Promise ((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : [])
      })
    })
  }
 
  const newVideoLoaded = async () => {
    console.log('estou rodando: newVideoLoaded')
    const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn");
    currentVideoBookmarks = await fetchBookmarks();


    if (bookmarkBtnExists) {
      console.log('entrei na condição')
      const bookmarkBtn = document.createElement("img");
      
      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png")
      bookmarkBtn.className = "ytb-button" + "bookmark-btn"
      console.log(bookmarkBtn.classList)
      bookmarkBtn.title = "Click to bookmark current timestamp"
      bookmarkBtn.setAttributeNS = "background-color: red"
      
      youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0]
      console.log(youtubeLeftControls)
      youtubePlayer = document.getElementsByClassName("video-stream")[0]
      console.log(youtubeLeftControls)

      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler)
      
    }
  }

  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    console.log('estou rodando: addNewBookmarkEventHandler')
    console.log(currentTime)
    const newBookmark = {
      time: currentTime,
      desc: "Bookmark at " + getTime(currentTime)
    }

    currentVideoBookmarks = await fetchBookmarks()

    console.log(newBookmark)

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
    })
  }
  
})();

const getTime = t => {
  var date = new Date(0)
  date.setSeconds(t)

  return date.toISOString().substr(11, 8)
}