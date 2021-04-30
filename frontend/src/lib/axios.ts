import axios from 'axios';

// const { API } = process.env;
const API = 'http://localhost:5000';

const axiosConfig = {
  baseURL: 'http://localhost:5000/api/',
};
interface FetchProps {
  // url: string;
  // accessToken: string;
  page?: number;
  tag?: string;
}

export const fetchSnippets = async ({}: // page = 1,
// tag = 'python',
FetchProps) => {
  const { data } = await axios.get(
    // `${API}/api/snippets?tags=${tag}&page=${page}`
    `${API}/api/snippets?`
  );
  return data;
};

interface SearchProps {
  searchText: string;
  language: string;
  tags: string;
  page?: number;
  perPage?: number;
}

export const searchSnippets = async ({
  searchText,
  language,
  tags,
  page = 1,
  perPage = 10,
}: SearchProps) => {
  const { data } = await axios.get(
    `search?query=${searchText}&language=${language}&tags=${tags}&page=${page}&per_page=${perPage}`,
    axiosConfig
  );
  return data;
};

interface InitialProps {
  tags?: string;
  page?: number;
  perPage?: number;
}

export const setInitialData = async ({
  tags,
  page = 1,
  perPage = 10,
}: InitialProps) => {
  const { data } = await axios.get(
    `snippets?&ags=${tags}&page=${page}&per_page=${perPage}`,
    axiosConfig
  );
  return data;
};

// export function useSnippetsInfinite(tag: string) {
//   const { data, ...rest } = useInfiniteQuery(
//     'snips',
//     ({ pageParam = 1 }) => fetchSnippets(pageParam),
//     {
//       getNextPageParam: (res) => {
//         if (res.meta.has_next) {
//           return res.page + 1;
//         }
//         return false;
//       },
//     }
//   );

//   const snips = data?.pages.flatMap((page) => page.items);

//   return {
//     ...rest,
//     snips,
//   };
// }
