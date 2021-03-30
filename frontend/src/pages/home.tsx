import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { SpecialButton } from "../components/special-button";

interface Props extends RouteComponentProps {}

export const Home: React.FC<Props> = ({ history, location, match }) => {
  console.log(match, location);
  return (
    <div>
      <div>home</div>
      <Link to="/about">go to about</Link>
      <button
        onClick={() => {
          // api call
          // change to the about page
          history.push("/about");
        }}
      >
        click me to go to about
      </button>
      <SpecialButton />
    </div>
  );
};
