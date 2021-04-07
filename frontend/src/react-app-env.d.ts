/// <reference types="react-scripts" />

interface Snippet {
  [id: string]: any,
  title: string;
  addedBy: User['username'];
  language: string;
  description: string;
  value: string;
  tags: Array<string>;
  likedBy: Array<User['username']>;
  addedOn: string;
  updatedOn: string;
  collection: Array<Collection>;
  private: boolean;
}

type searchBy = "title" | "language" | "tags" ;
type searchTerm = string;

type test = keyof typeof Snippet;
type test2 = typeof Snippet[test];

interface Options {
  value: string;
  label: string;
}

interface User {
  [id: string]: any,
  username: string;
  online: boolean;
  snippetsCreated: Array<Snippet>;
  snippetsLiked: Array<Snippet>;
  collections: Array<Collection>;
}

interface AppProps {
  children: React.ReactNode;
}

interface UserContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  // setLoggedIn: (loggedIn: boolean) => void;
  loading: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Collection {
  [id: string]: any,
  name: string;
  private: boolean;
  owner: User['username'];
  snippets: Array<Snippet>;
}