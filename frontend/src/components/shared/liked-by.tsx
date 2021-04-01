import React from 'react'

type Username = string

interface Props {
  usernames: Username[]
}

export const Likes: React.FC<Props> = ({
  usernames
}) => {
  return (
    <section id="liked-by">
      <p>
        { usernames.map(( username ) => (
          <button
            id="avatar"
            onClick={
              () => {`/users/${username}`}
            }
          >
            {username}
          </button>
        ))}
      </p>
    </section>
  );
}