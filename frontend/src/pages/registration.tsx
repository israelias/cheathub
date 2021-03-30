import * as React from 'react'
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{ id: string }> {}

export const Registration: React.FC<Props> = ({ match }) => {
  const [signin, setSignin] = React.useState(false)
  React.useEffect(() => {
    match.params.id === 'signin' ? setSignin(true) : setSignin(!signin)
  }, [match.params.id])

    return (
      <div>
        Sign in/ Sign up
      </div>

    );
}