import * as React from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

//  subject root
export const TreeRoot = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;

  ul {
    margin-left: 0;
    padding-left: 0;
  }

  ul ul {
    margin-left: 20px;
  }

  li {
    list-style: none;
  }
`;

// content root
export const TreeContent = styled(motion.div)`
  margin-left: 30px;
  padding-left: 30px;
  border-left: 2px solid var(--primary-4);
  @media (max-width: 1000px) {
    margin-left: 10px;
    padding-left: 10px;
  }
`;

// subjectrow div
export const TreeLabel = styled.div`
  padding-left: 0;
  margin-left: 0;

  & > div {
    padding-left: 0;
  }
`;

// subject list ul
export const TreeList = styled(motion.ul)``;

// subject re list
export const TreeBranch = styled(motion.div)``;

export const treeVariants = {
  expanded: {
    height: "auto",
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    y: -20,
    x: 20,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

export const TreeListItem = styled.li`
  padding-top: 0;
  padding-bottom: 0;
`;

export const TreeListItemRow = styled.div`
  padding-bottom: 20px;
  padding-left: 0;
  margin-left: 0;
`;

export const TreeListItemDisplay = styled.span`
  background-color: var(--neutral-background);
  color: white;
  font-size: 14px;
  padding: 3px 6px;
  border-radius: 3px;
  font-weight: bold;
  white-space: nowrap;
  display: inline;

  a {
    cursor: pointer;
    margin-right: 5px;
    padding-right: 5px;

    &.expanded {
      i {
        transform: rotate(90deg);
      }
    }
  }
`;

export const TreeListItemDisplayLink = styled.a`
  cursor: pointer;
  margin-right: 5px;
  padding-right: 5px;
  color: white;
  border-right: 1px solid;

  &.expanded {
    i {
      transform: rotate(90deg);
    }
  }
`;

interface CollectionProps {
  data: Array<Collection>;
}

export const CollectionList: React.FC<CollectionProps> = ({ data }) => {
  const [expandCollection, setExpandCollection] = React.useState(true);
  const [expandSnippet, setExpandSnippet] = React.useState(true);
  const [expandTags, setExpandTags] = React.useState(true);
  const [collectionId, setCollectionId] = React.useState(null);
  const [snippetId, setSnippetId] = React.useState(0);
  const [tagId, setTagId] = React.useState(0);

  return (
    <TreeRoot>
      <TreeContent initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* FIRST: Collections */}
        <TreeList exit={{ opacity: 0 }}>
          {data.map((data) => (
            <TreeListItem key={data._id}>
              <TreeListItemRow>
                <TreeListItemDisplay>
                  {data.snippets?.length ? (
                    <TreeListItemDisplayLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // setExpandCollection((val: boolean) => !val);
                        setCollectionId(data._id);
                      }}
                    >
                      {expandCollection && collectionId === data._id
                        ? "\\/"
                        : ">"}
                    </TreeListItemDisplayLink>
                  ) : null}
                  {data.children || data.name}
                </TreeListItemDisplay>
              </TreeListItemRow>

              <AnimateSharedLayout type="crossfade">
                <TreeBranch
                  layout
                  animate={
                    expandCollection && collectionId === data._id
                      ? "expanded"
                      : "collapsed"
                  }
                  variants={treeVariants}
                >
                  {/* SECOND: Snippets */}
                  <AnimatePresence>
                    <TreeList layout exit={{ opacity: 0 }}>
                      {data.snippets.map((snippet, index) => (
                        <TreeListItem key={snippet._id}>
                          <TreeListItemRow>
                            <TreeListItemDisplay>
                              {snippet.tags?.length ? (
                                <TreeListItemDisplayLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSnippetId(index);
                                    // setExpandSnippet((val: boolean) => !val);
                                  }}
                                >
                                  {expandSnippet &&
                                  // collectionId === data._id
                                  // &&
                                  snippetId === index
                                    ? "\\/"
                                    : ">"}
                                </TreeListItemDisplayLink>
                              ) : null}
                              {snippet.children || snippet.title}
                            </TreeListItemDisplay>
                          </TreeListItemRow>
                          <AnimateSharedLayout type="crossfade">
                            <TreeBranch
                              layout
                              animate={
                                expandSnippet &&
                                // collectionId === data._id
                                // &&
                                snippetId === index
                                  ? "expanded"
                                  : "collapsed"
                              }
                              variants={treeVariants}
                            >
                              {/* THIRD: Likes */}
                              <AnimatePresence>
                                <TreeList layout exit={{ opacity: 0 }}>
                                  {snippet.tags.map((tag, index) => (
                                    <TreeListItem key={tag}>
                                      <TreeListItemRow>
                                        <TreeListItemDisplay>
                                          {snippet.tag ? (
                                            <TreeListItemDisplayLink
                                              href="#"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                setExpandTags(
                                                  (val: boolean) => !val
                                                );
                                                setTagId(index);
                                              }}
                                            >
                                              {expandTags && tagId === index
                                                ? "\\/"
                                                : ">"}
                                            </TreeListItemDisplayLink>
                                          ) : null}
                                          {tag || tag}
                                        </TreeListItemDisplay>
                                      </TreeListItemRow>
                                      <TreeBranch
                                        animate={
                                          expandTags && tagId === index
                                            ? "expanded"
                                            : "collapsed"
                                        }
                                        variants={treeVariants}
                                      >
                                        {/* NEXT */}
                                        {/* <SubjectList
                                  data={snippets}
                                  /> */}
                                      </TreeBranch>
                                    </TreeListItem>
                                  ))}

                                  {/* <TreeListItem>
                            <TreeListItemRow>
                              <TreeListItemDisplay>
                                {snippet.language}
                              </TreeListItemDisplay>
                            </TreeListItemRow>
                          </TreeListItem>

                          <TreeListItem>
                            <TreeListItemRow>
                              <TreeListItemDisplay>
                                {snippet.updatedOn}
                              </TreeListItemDisplay>
                            </TreeListItemRow>
                          </TreeListItem>
                          <TreeListItem>
                            <TreeListItemRow>
                              <TreeListItemDisplay>
                                {snippet.source}
                              </TreeListItemDisplay>
                            </TreeListItemRow>
                          </TreeListItem>
                          <TreeListItem>
                            <TreeListItemRow>
                              <TreeListItemDisplay>
                                {snippet.description}
                              </TreeListItemDisplay>
                            </TreeListItemRow>
                          </TreeListItem> */}
                                </TreeList>
                              </AnimatePresence>
                            </TreeBranch>
                          </AnimateSharedLayout>
                        </TreeListItem>
                      ))}
                    </TreeList>
                  </AnimatePresence>
                </TreeBranch>
              </AnimateSharedLayout>
            </TreeListItem>
          ))}
        </TreeList>
      </TreeContent>
    </TreeRoot>
  );
};

// export const AccWrapper = (data: Collection[]) => {
//   return (
//     <TreeRoot>
//       <TreeContent
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <SubjectList data={data} />
//       </TreeContent>
//     </TreeRoot>
//   );
// };

// interface AccProps  {
//   data: Collection[];
// }

// export const SubjectList: React.FC <AccProps> = ({
//   data
// }) => {
//   return(
//     <motion.ul
//       exit={{ opacity: 0}}>
//         {data.map((data) => (
//           <SubjectDisplay
//             key={data._id}
//             data={data}
//             />
//         ))}
//     </motion.ul>
//   )
// }

// interface BccProps  {
//   props: { data: Collection};
// }

// export const SubjectDisplay = React.memo((props) => {
//   const { data } = props;
//   const { _id, snippets } = data;
//   const [expanded, setExpanded] = React.useState(true);

//   return (
//     <TreeListItem key={_id}>
//       <TreeListItemRow>
//         <LabelDisplay
//           {...{ snippets, expanded, setExpanded }}
//           data={data}

//         />
//       </TreeListItemRow>
//       <motion.div
//         animate={expanded ? 'expanded' : 'collapsed'}
//         variants={treeVariants}
//       >
//         <SubjectList
//           data={snippets}
//           />
//       </motion.div>
//     </TreeListItem>
//   )
// })

// interface CccProps  {
//   data: Collection;
//   snippets: Snippet[];
//   expanded: boolean;
//   setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
//   props?: any;
// }

// export const LabelDisplay: React.FC <CccProps> = ({
//   data,
//   expanded,
//   setExpanded,
//   snippets = [],
//   props
// }) => {
//   return(
//     <TreeListItemDisplay>
//       {
//         snippets?.length ?
//         (
//           <TreeListItemDisplayLink
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               setExpanded((val: boolean) => !val);
//             }}
//           >
//               {expanded ? "\\/" : ">" }

//           </TreeListItemDisplayLink>
//         ) : null
//       }
//       {props.children || data.name}
//     </TreeListItemDisplay>
//   )
// }
