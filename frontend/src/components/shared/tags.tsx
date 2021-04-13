/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// type Tag = string;
// interface Props {
//   tags: Tag[];
//   setCurrentTag: React.Dispatch<React.SetStateAction<Tag>>;
//   setTagId: React.Dispatch<React.SetStateAction<string>>;
// }

export const Tags: React.FC<TagProps> = ({
  tags,
  setTagId,
  setCurrentTag,
}) => {
  // const [currentTag, setCurrentTag] = React.useState('');
  // const [tagsArray, setTagsArray] = React.useState(tags);
  const handleClick = (tag: string) => {
    setCurrentTag(tag);
    setTagId(tag);
  };
  return (
    <section id="snippet-tags">
      <p>
        {tags.map((tag) => (
          <>
            <button
              key={tag}
              type="button"
              id="tag"
              value={tag}
              onClick={() => handleClick(tag)}
              // onClick={(event: TagClickEvent) => {
              //   setTagId(tag, event.target.value);
              // }}
              // onClick={(
              //   event: React.MouseEvent<HTMLButtonElement>
              // ) => {
              //   setTagId(tag, (event.target as any).value);
              // }}
              // onClick={(e: React.SyntheticEvent) => {
              //   e.preventDefault();
              //   const target = e.target as typeof e.target & {
              //     tag: { value: string };
              //   };
              //   const tagId = target.tag.value;
              //   setTagId(tagId);
              // }}
            >
              {tag}
            </button>
            {/* <input onChange={setTagId} /> */}
          </>
        ))}
      </p>
    </section>
  );
};
