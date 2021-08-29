[Back to root](https://github.com/israelias/cheathub#contents)\
[Go to backend](https://github.com/israelias/cheathub/tree/master/backend)

# MS3 Cheat-Hub Frontend

## Running Frontend Locally
The frontend directory can developed on its own as a standalone React App attached to the live backend API. The ORM spec is defined as types in `globals.d.ts`. All fetch handlers that communicate with the backend are in the `src/services` subdirectory. Please see `src/context` for their implementation in context providers via Hooks and Context API.

> Note: Please `cd` to this directory from root until workspaces is implemented. 

- `yarn install`
- `yarn start`
## Frameworks and Libraries

- [Typescript 4.2.3]()
- [React 17.0.2:](https://reactjs.org/) JavaScript Library for building user interfaces.
- [React Router]()
- [Framer Motion]()
- [React Syntax Highligher]()
- [Chakra-ui](https://chakra-ui.com/) React component for faster and easier web development. Includes [Chakra UI Icons]()
- [React-Icons:]() 
- [Axios:](https://github.com/axios/axios) The promise-based HTTP client for the browser and node.js that handles calls to Thesaurus API.
- [isomorphic-unfetch]()
- [dayjs]()
- [classnames:](https://developer.aliyun.com/mirror/npm/package/clsx):Tiny utility for constructing classnames conditionally


## Frontend Deployment
Production and Development/Preview deployments are on Vercel.

- `commit` and `push` the code from my local IDE to Github via Git and my MacBook Pro's iTerm terminal.
- Log in to Vercel and click the [New Project](https://vercel.com/new) CTA.
- Access "Import Git Repository" via the `select` input, located at the top-left of the immediate prompt.
- Click "Import" on the repository named "cheathub"
- Select the default "Personal Account"
- Select the "frontend" sub-directory.
- Click "Deploy"
- Barring errors, await the prompt for:
> ##### "Your project has been successfully deployed."

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
