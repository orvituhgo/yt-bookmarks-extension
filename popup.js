import { getActiveTab } from "./utils";

// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await activeTab()
  const queryParameters = activeTab.url.split('?')[1]
  // getting the url search parameters
  const urlParameters = new URLSearchParams(queryParameters)

  const currentVideo = urlParameters.get("v")
// verify if the active tab is any youtube page
  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : []

      // viewBookmarks
    })
  } else {
    const container = document.getElementsByClassName('container')
    container.innerHTML = '<div class="title"> This is not a youtube page. </div>'
  }
});
