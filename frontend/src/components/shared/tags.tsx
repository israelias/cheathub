import React from 'react'
import { useHistory } from 'react-router-dom';

type Tag = string

interface Props {
  tags: Tag[]
}

export const Tags: React.FC<Props> = ({
  tags
}) => {
  const history = useHistory();
  return (
    <section id="snippet-tags">
      <p>
        { tags.map(( tag ) => (
          <button
            id="tag"
            onClick={
              () => history.push(`/tags/${tag}`)
            }
          >
            {tag}
          </button>
        ))}
      </p>
    </section>
  );
}