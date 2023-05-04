// to get active tab chorme

export async function getActiveTab() {
  let queryOptions = {active: true, currentWindow: true};
  let [tab] = await chorme.tabs.query(queryOptions);
  return tab
}