import React from 'react';

type Tag = string;

interface Props {
  tags: Tag[];
  setTagId: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const Tags: React.FC<Props> = ({
  tags,
  setTagId,
}) => (
  <section id="snippet-tags">
    <p>
      {tags.map((tag) => (
        <>
          <button
            key={tag}
            type="button"
            id="tag"
            value={tag}
            // onClick={(e) => setTagId(e.target.value)}
          >
            {tag}
          </button>
          <input onChange={setTagId} />
        </>
      ))}
    </p>
  </section>
);
