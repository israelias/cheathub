import axios from 'axios';
/**
 * Get requests for snippets and collections endpoints.
 * All `get` views are public.
 * All `post/put/delete` methods require token.
 * See counterpart fetchers in @module crud.service.ts
 *
 * @file defines all get methods to retrieve data from backend
 * @see ProfileDataProvider
 * @see AppDataProvider
 */

/**
 * Api backend base URL.
 */
const axiosConfig = {
  baseURL: 'https://cheathub-backend.herokuapp.com/api',
};

/**
 * Get search results data.
 *
 * SearchApi, `/api/search`
 * Queryies the Snippet cluster in the database with the following params.
 * Flask Restful handles on param at a time; the ternary block is written to accommodate this.
 * Sample querystring `search?query=hello%20world&tags=javascript&tags=jquery` will return data, but query
 * takes precedence over the other params.
 * @param {string} searchText
 * @param {string} language
 * @param {string} tags
 * @param {number} page
 */
function getResultsData(
  searchText: string,
  language: string,
  tags: string,
  page = 1
) {
  const querystring = searchText
    ? `search?query=${searchText}`
    : language
    ? `search?query=&language=${language}`
    : tags
    ? `search?query=&language=&tags=${tags}`
    : `search?query=`;
  return axios.get(`/${querystring}&page=${page}`, axiosConfig);
}
/**
 * Get initial data.
 *
 * SnippetsApi, `/api/snippets`
 */
function getInitialData() {
  return axios.get(`snippets`, axiosConfig);
}
/**
 * Get collections profile data.
 *
 * MyCollectionsApi, `/api/users/<user_id>/collections`
 * Endpoint can be modified without username param to
 * fetch general list of public collections: CollectionsApi, "/api/collections"
 * @param {string} username username stored in UserContext
 */
function getCollectionsProfile(username: string) {
  return axios.get(`users/${username}/collections`, axiosConfig);
}
/**
 * Get Snippets profile data.
 *
 * MySnippetsApi, `/api/users/<id>/snippets`
 * @param {string} username username stored in UserContext
 */
function getSnippetsProfile(username: string) {
  return axios.get(`users/${username}/snippets`, axiosConfig);
}
/**
 * Get all tags stored in snippets database sub-document.
 *
 * `Tag` is not a database cluster/class/model but a listfield of the Snippet model.
 * The backend computes the retrieval from the database when we make this call.
 */
function getAllTags() {
  return axios.get(`tags`, axiosConfig);
}
/**
 * Get a user's favorite snipppets.
 *
 * MyFaveSnippetsApi, `/api/users/<id>/snippets/faves`
 * @param {string} username username stored in UserContext
 */
function getFaveSnippets(username: string) {
  return axios.get(`users/${username}/snippets/faves`, axiosConfig);
}
/**
 * Get one snippet from the database.
 *
 * @param {string} id database document `_id` of snippet
 */
function getSnippet(id: string) {
  return axios.get(`snippets/${id}`);
}
/**
 * Get one collection from the database.
 *
 * @param {string} id database document `_id` of collection
 */
function getCollection(id: string) {
  return axios.get(`collections/${id}`);
}
/**
 * Get all user snippets as options.
 *
 * Retrieves array in `{ label: <snippet.title>, value: <snippet.id> }` format for select input.
 *
 * MySnippetsOptionsApi, `/api/users/<user_id>/snippets/options`
 * @param {string} username username stored in UserContext
 */
function getSnippetsOptions(username: string) {
  return axios.get(`users/${username}/snippets/options`, axiosConfig);
}
/**
 * Get all user collections as options.
 *
 * Retrieves array in `{ label: <collection.name>, value: <collection.id> }` format for select input.
 *
 * MySnippetsOptionsApi, `/api/users/<user_id>/collections/options`
 * @param {string} username username stored in UserContext
 */
function getCollectionsOptions(username: string) {
  return axios.get(
    `users/${username}/collections/options`,
    axiosConfig
  );
}
/**
 * Get users from the database.
 *
 * UsersApi, `/api/users`
 * Currently unused fetcher.
 * To be implemented with user profile feature along with account deletion scrope.
 */
function getUsers() {
  return axios.get(`users`, axiosConfig);
}
/**
 * Get one user from the database.
 *
 * UserApi, `/api/users/<id>`
 * Currently unused fetcher.
 * To be implemented with user profile feature along with account deletion scrope.
 * @param {string} username username of user as the backend matches it with `_id` in databse
 */
function getUser(username: string) {
  return axios.get(`users/${username}`, axiosConfig);
}

export {
  getResultsData,
  getInitialData,
  getCollectionsProfile,
  getSnippetsProfile,
  getFaveSnippets,
  getCollectionsOptions,
  getSnippetsOptions,
  getSnippet,
  getCollection,
  getAllTags,
  getUsers,
  getUser,
};

// # Sign Up
// # Post, username, email and password (Token returned)
// api.add_resource(SignupApi, "/api/auth/signup")
// # Sign In
// # Post, email and password (Token returned)
// api.add_resource(LoginApi, "/api/auth/login")
// # Log Out
// # Post, (Token required, Token revoked)
// api.add_resource(LogoutApi, "/api/auth/logout")
// api.add_resource(ForgotPassword, "/api/auth/forgot")
// api.add_resource(ResetPassword, "/api/auth/reset")

// # LIKE SNIPPET
// # Post (Token required)
// api.add_resource(LikeSnippetApi, "/api/likesnippet/<id>")

// # USER PROFILE GET VIEWS
// # My Profile Snippets (Full)
// api.add_resource(MySnippetsApi, "/api/users/<id>/snippets")
// # My Profile Saved/Faved Snippets (Full)
// api.add_resource(MyFaveSnippetsApi, "/api/users/<id>/snippets/faves")
// # My Profile Collections (Preview)
// api.add_resource(MyCollectionsApi, "/api/users/<user_id>/collections")
// # My Profile Collection (Full with Snippets)
// api.add_resource(MyCollectionApi, "/api/users/<user_id>/collections/<id>")
