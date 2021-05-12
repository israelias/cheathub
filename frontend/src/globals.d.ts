interface User {
  [id: string]: string;
  username: string;
  online: boolean;
  snippetsCreated: Array<Snippet>;
  snippetsLiked: Array<Snippet>;
  collections: Array<Collection>;
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
  private: boolean;
  filename: string;
  source: string;
  score: number;
  url: string;
}

interface Collection {
  [id: string]: string;
  index?: number;
  name: string;
  private?: boolean;
  owner: User['username'];
  url: string;
  snippets_id?: Options[];
  snippets: Array<Snippet>;
}

interface Options {
  value: string;
  label: string;
}
