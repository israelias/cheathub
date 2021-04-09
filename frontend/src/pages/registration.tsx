import * as React from 'react'
import { RouteComponentProps } from 'react-router'
// import {
//   loginRequest,
//   signUpRequest,
// } from '../lib/fetcher';
// import { useUserContext } from '../context/user.context';

interface Props
  extends RouteComponentProps<{ id: string }> {}

export const Registration: React.FC<Props> = ({
  match,
}) => {
  // const user = useUserContext();
  // const router = useHistory()
  // const [error, setError] = React.useState(null);
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const signin = match.params.id === 'signin'
  const signup = match.params.id === 'signup'
  // const [signin, setSignin] = React.useState(false)
  // React.useEffect(() => {
  //   match.params.id === 'signin' ? setSignin(true) : setSignin(!signin)
  // }, [match.params.id])

  // React.useEffect(() => {
  //   fetch(`api.example.com/posts/${match.params.id}`)
  // }, [match.params.id])

  return (
    <div>
      {signin && 'Sign In'}
      {signup && 'Login In'}
    </div>
  )
}
