/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_HASH: string;
    REACT_APP_API_URI: string;
    REACT_APP_WS_URI: string;
    PUBLIC_API: string;
  }
}
interface Window {
  Stripe: any;
}
interface Snippet {
  [id: string]: string;
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
  filename: string;
  source: string;
  score: number;
  url: string;
}

type SearchBy = 'title' | 'language' | 'tags';
type SearchTerm = string;

type Test1 = keyof typeof Snippet;
type Test2 = typeof Snippet[Test1];

interface Options {
  value: string;
  label: string;
}

interface User {
  [id: string]: string;
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
  [id: string]: string;
  name: string;
  private: boolean;
  owner: User['username'];
  url: string;
  snippets: Array<Snippet>;
}

interface SnippetProps {
  snippets: Array<Snippet>;
  onTagClick?: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTag?: React.Dispatch<React.SetStateAction<string>>;
  setTagId?: React.Dispatch<React.SetStateAction<string>>;
  tags?: Array<string>;
}

interface TagProps {
  tags: Array<string>;
  setCurrentTag: React.Dispatch<React.SetStateAction<string>>;
  setTagId: React.Dispatch<React.SetStateAction<string>>;
}

interface LayoutProps {
  children: React.ReactNode;
}
