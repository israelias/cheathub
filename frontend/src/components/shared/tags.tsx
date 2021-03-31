import React from 'react'

type Tag = string

interface Props {
  tags: Tag[]
}

export const Tags: React.FC<Props> = ({
  tags
}) => {
    return (
      <section id="snippet-tags">
        <p>
          { tags.map(( tag ) => (
            <button
              id="tag"
              onClick={
                () => {`/tags/${tag}`}
              }
            >
              {tag}
            </button>
          ))}
        </p>
      </section>
    );
}