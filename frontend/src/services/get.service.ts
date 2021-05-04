import axios from 'axios';

const axiosConfig = {
  // baseURL: 'http://localhost:5000/api/',
  baseURL: 'https://cheathub-backend.herokuapp.com/api',
};

// http://localhost:5000/api/search?query=hello%20world&tags=javascript&tags=jquery

// # SEARCH endpoint
// api.add_resource(SearchApi, "/api/search")
function searchSnippets(
  searchText: string,
  language: string,
  tags: string,
  page = 1,
  perPage = 10
) {
  return axios.get(
    `search?query=${searchText}&language=${language}&tags=${tags}&page=${page}&per_page=${perPage}`,
    axiosConfig
  );
}

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

function getInitialData() {
  return axios.get(`snippets`, axiosConfig);
}

function getCollectionsProfile(username: string) {
  return axios.get(`users/${username}/collections`, axiosConfig);
}

function getSnippetsProfile(username: string) {
  return axios.get(`users/${username}/snippets`, axiosConfig);
}

function getAllTags() {
  return axios.get(`tags`, axiosConfig);
}

function getFaveSnippets(username: string) {
  return axios.get(`users/${username}/snippets/faves`, axiosConfig);
}

// # Get, Post
// api.add_resource(SnippetsApi, "/api/snippets")
// # Get (Auth)
// api.add_resource(MySnippetsApi, "/api/users/<id>/snippets")
// # GET (Auth)
// api.add_resource(MyFaveSnippetsApi, "/api/users/<id>/snippets/faves")
function getSnippets(tags?: string, page = 1, perPage = 10) {
  return axios.get(
    `snippets?tags=${tags}&page=${page}&per_page=${perPage}`,
    axiosConfig
  );
}

// # Get, Put, Delete
// api.add_resource(SnippetApi, "/api/snippets/<id>")
function getSnippet(id: string) {
  return axios.get(`snippets/${id}`, axiosConfig);
}

// api.add_resource(CollectionsApi, "/api/collections")
// api.add_resource(MyCollectionsApi, "/api/users/<user_id>/collections")
function getCollections(username: string) {
  return axios.get(`users/${username}/collections`, axiosConfig);
}

// api.add_resource(CollectionApi, "/api/collections/<id>")
// api.add_resource(MyCollectionApi, "/api/users/<user_id>/collections/<id>")
function getCollection(username: string, id: string) {
  return axios.get(
    `users/${username}/collections/${id}`,
    axiosConfig
  );
}

// # Get, Post
// api.add_resource(UsersApi, "/api/users")
function getUsers() {
  return axios.get(`users`, axiosConfig);
}

// # Get, Put, Delete
// api.add_resource(UserApi, "/api/users/<id>")
function getUser(username: string) {
  return axios.get(`users/${username}`, axiosConfig);
}

export {
  searchSnippets,
  getResultsData,
  getInitialData,
  getCollectionsProfile,
  getSnippetsProfile,
  getFaveSnippets,
  getSnippet,
  getSnippets,
  getCollections,
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

// const onLanguageChange = (lang: string) => {
//   setLanguage(lang);
//   loadSnippets(searchText, lang, tags, page);
// };

// const onTagsChange = (tag: string) => {
//   setTags(tag);
//   loadSnippets(searchText, language, tag, page);
// };

// const onPageParamChange = (nextPage: number) => {
//   setPage(nextPage);
//   loadSnippets(searchText, language, tags, nextPage);
// };

// const loadSnippets = async (
//   searchText: string,
//   language: string,
//   tags: string,
//   page?: number
// ) => {
//   setLoading(true);
//   const res = await searchSnippets({
//     searchText,
//     language,
//     tags,
//     page,
//   });
//   if (res && res.data) {
//     setLoading(false);
//     setSnippets(res.data.items);
//   }
// };
