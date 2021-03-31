/// <reference types="react-scripts" />

interface Snippet {
  [id: string]: any,
  title: string;
  language: string;
  addedBy: string;
  likedBy: string[];
  addedOn: string;
  updatedOn: string;
  description: string;
  value: string;
  tags: string[];
  collection: string[];
}

type searchBy = "title" | "language" | "tags" ;
type searchTerm = string;

type test = keyof typeof Snippet;
type test2 = typeof Snippet[test];

interface Options {
  value: string;
  label: string;
}
