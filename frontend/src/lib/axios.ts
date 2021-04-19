import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

// const { API } = process.env;
const API = 'http://localhost:5000';

interface FetchProps {
  // url: string;
  // accessToken: string;
  page: number;
  tag: string;
}

export const fetchSnippets = async ({
  page = 1,
  tag = '',
}: FetchProps) => {
  const { data } = await axios.get(
    `${API}/api/snippets?page=${page}&tags=${tag}`
  );
  return data;
};

export function useSnippetsInfinite(tag: string) {
  const { data, ...rest } = useInfiniteQuery(
    'snips',
    ({ pageParam = 1 }) => fetchSnippets(pageParam),
    {
      getNextPageParam: (res) => {
        if (res.meta.has_next) {
          return res.page + 1;
        }
        return false;
      },
    }
  );

  const snips = data?.pages.flatMap((page) => page.items);

  return {
    ...rest,
    snips,
  };
}
