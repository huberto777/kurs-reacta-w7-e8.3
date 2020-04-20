const BASE_URL = "http://localhost:4000/timeboxes";
const FetchTimeboxesAPI = {
  getAllTimeboxes: async function () {
    const response = await makeRequest(BASE_URL, "GET");

    const timeboxes = await response.json();
    return timeboxes;
  },
  addTimebox: async function (timeboxToAdd) {
    const response = await makeRequest(
      BASE_URL,
      "POST",

      timeboxToAdd
    );
    const addedTimebox = await response.json();
    return addedTimebox;
  },
  replaceTimebox: async function (timeboxToReplace) {
    if (!timeboxToReplace.id) {
      throw new Error("timebox has to have an id to be updated");
    }

    const response = await makeRequest(
      `${BASE_URL}/${timeboxToReplace.id}`,
      "PUT",
      timeboxToReplace
    );
    const replacedTimebox = await response.json();
    return replacedTimebox;
  },
  partiallyUpdateTimebox: async function (timeboxToUpdate) {
    if (!timeboxToUpdate.id) {
      throw new Error("timebox has to have an id to be updated");
    }
    const response = await makeRequest(
      `${BASE_URL}/${timeboxToUpdate.id}`,
      "PATCH",
      timeboxToUpdate
    );
    const updatedTimebox = await response.json();
    return updatedTimebox;
  },
  removeTimebox: async function (timeboxToRemove) {
    if (!timeboxToRemove.id) {
      throw new Error("timebox has to have an id to be updated");
    }
    await makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE");
  },
  createTimeboxesAPI: async function (baseUrl) {
    const response = await makeRequest(baseUrl, "GET");

    const timeboxes = await response.json();
    return timeboxes;
  },
  // Full-text searchAdd q GET /posts?q=internet -> dokumentacja json-server
  getTimeboxesByFullTextSearch: async function (searchQuery) {
    const response = await makeRequest(`${BASE_URL}/?q=${searchQuery}`, "GET");
    const timeboxes = await response.json();
    return timeboxes;
  },
};

export default FetchTimeboxesAPI;

async function makeRequest(url, method, body) {
  const jsonBody = body ? JSON.stringify(body) : undefined;
  const response = await window.fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonBody,
  });

  if (!response.ok) {
    throw new Error("something went wrong");
  }
  return response;
}
