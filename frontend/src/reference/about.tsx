import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export const About: React.FC<Props> = () => {
  const postId = 5;
  return (
    <div>
      <div>about</div>
      <Link to={`/posts/${postId}`}>go to post 1</Link>
    </div>
  );
};

// import * as React from 'react';
// import { RouteComponentProps } from 'react-router';
// import {
//   useQuery,
//   useInfiniteQuery,
//   // useMutation,
//   // useQueryClient,
// } from 'react-query';
// import { LoggedinHeader } from '../components/shared/header';
// import { Search } from '../components/snippet_crud/search-form';
// // import { ToUserButton } from '../components/shared/special-button'
// import { getRequest } from '../lib/fetcher';
// import { useUserContext } from '../context/user.context';
// import { isError } from '../lib/isError';
// import { FormPage } from '../components/layout/comonForm';
// import {
//   MainFeed,
//   Container as MainContainer,
// } from '../components/layout/commonCard';
// import useIntersectionObserver from '../lib/useIntersect';

// interface ExploreProps
//   extends RouteComponentProps<{ id: string }> {
//   snippets: Snippet[];
// }

// export const Explore: React.FC<ExploreProps> = ({
//   snippets,
//   history,
//   match,
// }) => {
//   const [searchTerm, setSearchTerm] = React.useState('');
//   const [searchBy, setSearchBy] = React.useState<SearchBy>(
//     'title'
//   );
//   const [tagId, setTagId] = React.useState('');
//   const [usernameId, setUsernameId] = React.useState('');
//   // const [allSnippets, setAllSnippets] = React.useState([]);
//   const user = useUserContext();
//   const username = user!.username ? user!.username : 'joem';

//   const onTagIdClick = () => setTagId(tagId);
//   const onUsernameIdClick = () => setUsernameId(usernameId);

//   const [tagParam, setTagParam] = React.useState('');

//   const [pageParam, setPageParam] = React.useState(1);
//   const [currentTag, setCurrentTag] = React.useState('');
//   const onTagParamClick = (tag: string) => setTagParam(tag);

//   const {
//     isLoading,
//     error,
//     status,
//     data,
//     isFetching,
//     fetchNextPage,
//     fetchPreviousPage,
//     isFetchingNextPage,
//     isFetchingPreviousPage,
//     hasNextPage,
//     hasPreviousPage,
//   } = useInfiniteQuery(
//     'items',
//     async () => {
//       const res = await fetch(
//         `http://localhost:5000/api/snippets?page=${pageParam}&tags=${tagParam}`
//       );
//       const mydata = await res.json();
//       return mydata;
//     },
//     {
//       keepPreviousData: true,
//       // getNextPageParam: ({ total_items }, pages) => {
//       //   const totalItems = pages?.reduce(
//       //     (count, curr) => count + curr.meta.total_items
//       //   );
//       //   return totalItems >= total_items
//       //     ? undefined
//       //     : pages.length + 1;
//       // },
//       getNextPageParam: (thisPage, pages) => {
//         const current = thisPage.meta.page;
//         return current >= thisPage.meta.total_pages
//           ? undefined
//           : pages.length + 1;
//       },
//       getPreviousPageParam: (firstPage, pages) =>
//         // firstPage.meta.has_prev ?? false
//         {
//           const previous = firstPage.meta.page;
//           return previous <= 1
//             ? undefined
//             : pages.length - 1;
//         },
//     }
//   );

//   // if (status === 'loading') return <p>Loading</p>;
//   // if (status === 'error' && isError(error))
//   //   return (
//   //     <p>{`An error has occurred: ${error.message}`}</p>
//   //   );

//   const loadMoreButtonRef = React.useRef<HTMLButtonElement>(
//     null
//   );
//   const entry = useIntersectionObserver(loadMoreButtonRef, {
//     enabled: hasNextPage,
//     // onIntersect: fetchNextPage,
//     onIntersect: () => {
//       setPageParam((p) => p + 1);
//       fetchNextPage();
//     },
//   });
//   const isVisible = !!entry?.isIntersecting;

//   // React.useEffect(() => {
//   //   if (currentTag) {
//   //     setTagParam(currentTag);
//   //   }
//   // }, [currentTag]);

//   // React.useEffect(() => {
//   //   if (pageParam && hasNextPage) {
//   //     fetchNextPage({ pageParam });
//   //   }
//   // }, [pageParam, hasNextPage, fetchNextPage]);

//   return status === 'loading' ? (
//     <p>Loading...</p>
//   ) : status === 'error' && isError(error) ? (
//     <p>Error: {error.message}</p>
//   ) : (
//     <div>
//       <div>
//         <button
//           type="button"
//           onClick={() => fetchPreviousPage()}
//           disabled={
//             !hasPreviousPage || isFetchingPreviousPage
//           }
//         >
//           {isFetchingPreviousPage
//             ? 'Loading more...'
//             : hasPreviousPage
//             ? 'Load Older'
//             : 'Nothing more to load'}
//         </button>

//         <div>
//           {isFetching && !isFetchingNextPage
//             ? 'Fetching...'
//             : null}
//         </div>
//       </div>

//       {data?.pages?.map(
//         (page, i) => (
//           // <FormPage
//           //   key={i}
//           //   snippets={page?.items}
//           //   setCurrentTag={setCurrentTag}
//           // />
//           <MainContainer key={i}>
//             <MainFeed snippets={page?.items} />
//           </MainContainer>
//         )
//         // page?.items?.map(
//         //   (
//         //     item: { title: {} | null | undefined },
//         //     i: number
//         //   ) => <p key={i}>{item.title}</p>
//         // )
//       )}

//       <div>
//         <button
//           type="button"
//           ref={loadMoreButtonRef}
//           // onClick={() => setPageParam((p) => p + 1)}
//           onClick={() => fetchNextPage()}
//           disabled={!hasNextPage || isFetchingNextPage}
//         >
//           {isFetchingNextPage
//             ? 'Loading more...'
//             : hasNextPage
//             ? 'Load More'
//             : 'Nothing more to load'}
//         </button>

//         <div>
//           {isFetching && !isFetchingNextPage
//             ? 'Fetching...'
//             : null}
//         </div>
//       </div>
//     </div>
//   );
// };
