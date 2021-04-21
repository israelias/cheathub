/* eslint-disable no-console */
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import FormElement from '../components/form';
import { SpecialButton } from './special-button';

interface Props extends RouteComponentProps {}

export const OldHome: React.FC<Props> = ({
  history,
  location,
  match,
}) => {
  console.log(match, location);
  return (
    <div>
      <div>home</div>
      <Link to="/about">go to about</Link>
      <button
        type="button"
        onClick={() => {
          // api call
          // change to the about page
          history.push('/about');
        }}
      >
        click me to go to about
      </button>
      <SpecialButton />
      <FormElement />
    </div>
  );
};
