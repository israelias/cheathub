import React from 'react'
import { ToUserButton} from '../shared/special-button'


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
          <ToUserButton user={username} label={username} />
          // <button
          //   id="avatar"
          //   onClick={
          //     () => {`/users/${username}`}
          //   }
          // >
          //   {username}
          // </button>
        ))}
      </p>
    </section>
  );
}