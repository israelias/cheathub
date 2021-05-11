# MS3 Cheat-Hub
A cheatsheet hub.

An app that organizes your code snippets into collections of cheat sheets and allows you to view, like and save others'.

The project is developed as part of MS3 Data Centric module at Code Institute. It is written with a Flask/Python restful backend API, and a React/Typescript CRA frontend. 

Please visit the project at [cheathub.vercel.app](https://cheathub.vercel.app).

Additionally, the restful backend API can be viwed at [cheathub-backend.herokuapp.com](https://cheathub-backend.herokuapp.com/). For a sample response, please visit the [/api/snippets](https://cheathub-backend.herokuapp.com/api/snippets) endpoint.

[TOC levels=3]: # "## Contents"
## Contents
- [UX](#ux)
  - [User Stories](#user-stories)
  - [Wireframes](#wireframes)
  - [Design](#design)
- [Features](#features)
  - [Existing Features](#existing-features)
  - [Features Left to Implement](#features-left-to-implement)
- [Technologies](#technologies)
  - [Frameworks and Libraries](#frameworks-and-libraries)
  - [Programs and Software](#programs-and-software)
- [Notes](#notes)
- [Testing](#testing)
- [Deployment](#deployment)
- [Cloning This Repository](#cloning-this-repository)
- [Credits](#credits)
  - [Code](#code)
  - [Content and Media](#content-and-media)
  - [Acknowledgements](#acknowledgements)

## UX
### User Stories
#### New Visitor Goals
- As a new vistor, I want to have a good understanding of what the website does within a few seconds.
- As a new visitor, I want to be able to register for an account.
#### Returning Visitor Goals
- As a Returning Visitor, I want to be able to log in securely.
- As a Returning Visitor, I want to be able to create and save a code snippet.
- As a Returning Visitor, I want to be able to create collections of code snippets I have created.
#### Frequent Visitor Goals
- As a Frequent Visitor, I want to be able to delete code snippets and collections I have created.
- As a Frequent Visitor, I want to be able to search and like code snippets created by others.
- As a Frequent Visitor, I want to be able to reference and copy code snippets to the the clipboard.

### Wireframes
#### Concept

The project can be understood as a library of user-created <em><b>Albums</b></em> or <em><b>Playlists</b></em> with the ability to organize, query and add <em><b>items</b></em> or <em><b>tracks</b></em> to those collections

<hr>

<details><summary><em><b>Code Snippet </b></em> (item)    </summary>
<br>

[<div style="text-align:center"><img src="https://github.com/israelias/cheathub/blob/master/public/MS3_Wireframes_01.jpg?raw=true" width="600px"></div>](https://github.com/israelias/cheathub/blob/master/public/MS3_Wireframes_01.jpg?raw=true)
<br>
</details>
<hr>


<details><summary><em><b>Collection</b></em> (playlist)   </summary>
<br>

[<div style="text-align:center"><img src="https://github.com/israelias/cheathub/blob/master/public/MS3_Wireframes_02.jpg?raw=true" width="600px"></div>](https://github.com/israelias/cheathub/blob/master/public/MS3_Wireframes_02.jpg?raw=true)

<br>
</details>
<hr>


<details><summary><em><b>Search</b></em> (filter)    </summary>
<br>

[<div style="text-align:center"><img src="https://github.com/israelias/cheathub/blob/master/public/MS3_Wireframes_03.jpg?raw=true" width="600px"></div>](https://github.com/israelias/cheathub/blob/master/public/MS3_Wireframes_03.jpg?raw=true)

<br>
</details>
<hr>

### Design
#### Accordion Cards

- A consistent border is applied to all nodes with dynamic content. These discrete borders are designed to convey the scale of snippet item relative to a collection. These containers only vary in spacing and height and are responsible for visually conveying open and closed states of ***snippets in collections of snippets***.
#### Theme

- Chakra-UI's `ThemeProvider` wraps the app in order to pass styles down the component tree. See [Chakra-UI](https://chakra-ui.com/docs/theming/theme).

#### Colors
- The app features two sets of neutral tones for light mode and dark mode. Tones are applied to backgrounds while borders are rendered to highlight items and convey feedback. Tones are minimally set to three values within `#fafafa` and `#010f08` in order to reserve state-changes to border sizes and scales.
## Features
### Existing Features

#### User Registration
- The website features the ability to `sign up`, `sign in` and `sign out` in order to conditionally access existing features. A user is based on the `user` model, which requires `username`, `email` and `password` for new users and only the latter two for existing users. For security, only usernames are stored in `local storage` while `tokens` are stored in memory. To ensure `sign out` across multiple open windows, a logout event triggers a `storage event listener` which clears tokens and usernames in the memory of the current window. 
- ##### Actions:
-  Ability to create an account. *(any User)*
-  Ability to sign in to an account. *(Registered Owner)*
-  Ability to sign out of an account. *(Registed Owner)*
#### Code Snippets
- The website features the ability to create, update and delete a code snippet. A snippet is based on the `snippet` model and each field is represented as either a `form` field or a `section` in an `article` depending on whether a code snippet is being edited or being featured. 
- ##### Actions:
-  Ability to create, edit and delete a code snippet. *(Registered Owner)*
- Ability to `fave` and `unfave` a code snippet. *(Registered User)*

#### Collections
- The website features the ability to group any and all existing code snippets into named collections aka `cheat sheets`. A collection is based on the `collection` model, which is a name and a list of snippets. Each field is represented as either a `form` field or a `header` followed by a `ul` depending on whether a collection is in edit or display mode. 
- ##### Actions:
-  Ability to create, edit and delete a named collection. *(Registered Owner)*
-  Ability to add and remove snippets to/from a collection. *(Registered Owner)*

#### Search
- `search_text` indices are attached to the title and description fields of the `snippets` cluster. The frontend UI of the search feature is designed to return snippet cards that match a query. Additionally, the ability to query by `tags` and `language` is enabled by filtering these existing fields in the database.
- ##### Actions:
 -  Ability to search code snippets created by others. *(any User)*
 - Ability to filter snippets by language. *(any User)*
 - Ability to filter snippets by tags. *(any User)*
  - Ability to copy snippets to the clipboard. *(any User)*
 -  Ability to `fave` or `unfave` snippet results from search. *(Registered User)*
 -  Ability to perform `crud` operations on snippet results from search. *(Registered Owner)*
### Features Left to Implement
- Ability to delete an account. 
- Add query params to all resources
- Extend query parser to parse more than one query at a time
- Optimize performance by dereferencing database records
- User profile page
- Ability to add friends
- Ability to share snippets
## Technologies
### Frameworks and Libraries
#### Frontend
- [Node.js:](https://nodejs.org/en/) The runtime environment that allows the app to run asynchronous server-side scripts and events.(Bootstrapped with Nextjs)
- [Webpack:](https://webpack.js.org/) The static module bundler that builds a dependency graph mapping every module the project requires. (Bootstrapped with Nextjs)
- [Typescript]()
- [React 17.0:](https://reactjs.org/) JavaScript Library for building user interfaces.
- [React Router]()
- [Framer Motion]()
- [React Syntax Highligher]()
- [Chakra-ui](https://chakra-ui.com/) React component for faster and easier web development. Includes [Chakra UI Icons]()
- [React-Icons:]() 
- [Axios:](https://github.com/axios/axios) The promise-based HTTP client for the browser and node.js that handles calls to Thesaurus API.
- [isomorphic-unfetch]()
- [classnames:](https://developer.aliyun.com/mirror/npm/package/clsx):Tiny utility for constructing classnames conditionally
#### Backend
- [Flask Mongo Engine](http://docs.mongoengine.org/projects/flask-mongoengine/en/latest/)
- [Flask CORS](https://flask-cors.readthedocs.io/en/latest/)
- [Flask JWT Extended](https://flask-jwt-extended.readthedocs.io/en/latest/)
- [Flask Admin](https://flask-admin.readthedocs.io/en/latest/)
- [Flask Session](https://flask-session.readthedocs.io/en/latest/)
- [Flask Restful](https://flask-restful.readthedocs.io/en/latest/)

### Programs and Software
- [VSCode:](https://www.vscode.com/) Visual Studiio Code 2020.3.2 by [Microsoft](https://www.microsoft.com/) is the IDE used to locally construct the project
- [Git:](https://git-scm.com/) Git is used as the version control system and is utilized via the WebStorm terminal to `commit` to Git and `push` to GitHub.
- [GitHub:](https://github.com/) GitHub is used to store the project's code and directory upon concurrent `push`es via Git.
- [Adobe InDesign:](https://www.adobe.com/sea/products/xd.html) Adobe InDesign is used to mock wireframes.

## Notes
- Styles are written in-component and merge both Chakra-format and Framer-motion-format to achieve desired UI results. This is done by declaring motion boxes in Typescript to accespt Motion-Framer's HTML style props and Chakra's.
- Pagination is only for search endpoint.
- Access Token is stored in memory. Only usernames are stored in local storage, along with storage event listener for key `app-logout` which is triggered on logout and ensures all windows are logged out while the tokens are stored in a `token blocklist` cluster. 

## Testing
### User Testing
- A user expects...
  - Describe:
  - Review:

### Code Testing
#### Frontend
##### Performance, Accessibility, Best Practices, SEO, PWA
[View Latest Results](https://lighthouse-vercel-lighthouse-integration.vercel.app/reports/cheathub-1rxs3u78h-israelias.vercel.app)
- Lighthouse via Vercel is used to test performace, which produces unique results on every `git push`. [lighthouse-badges](https://github.com/emazzotta/lighthouse-badges) is used to generate new badges for every deployment by installing ```npm i -g lighthouse-badges``` and pushing the new hashed url to the array of urls:


    ```
    lighthouse-badges 
    -o docs/badges -r 
    -u https://synonyms.vercel.app/ [... all other urls]
                       
   # Output to docs/badges
   # Badges will contain the respective
      average score(s) of all the urls 
      supplied, combined
    ```
- Lighthouse's metrics, namely Accessibility and Performance generate specific flags on each audit. Adjustments are made on each push that specifically address any issues. 

##### Accessibility Testing
- [ChromeVox Extension](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) was used to ensure that screen-reader accessibility standards are met. This was done by walking through the entire project with the screen-reader plugin enabled. Various adjustments were made following these tests. Notably, the tab-index order of nav elements, and changing refining HTML5 semantic elements for `role` clarity.

##### Browser Testing

- Throughout the development of the project, in-browser dev tools were used to test for consistency across browsers. The browsers themselves were equally used for general use-case testing. The following browsers' per-device applications were accessed with an iPhone 11 Pro, MacBook Pro 15" and iPad Pro 12.9":
- Chrome Version: 83
- Firefox 82
- Opera 72
- Safari 14
#### Backend


## Deployment

- The project is written in [Typescript]() developed with [React](https://reactjs.org/), bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and deployed with [Vercel](https://nextjs.org/docs/deployment). The backend is written in [Python](), developed with [Flask]() to serve a restful database via [Mongo DB](). 

### [`cd frontend`](https://github.com/israelias/cheathub/tree/master/frontend)
- Please visit the [frontend](https://github.com/israelias/cheathub/tree/master/frontend) root directory for details on deployment steps.

### [`cd backend`](https://github.com/israelias/cheathub/tree/master/backend)
- Please visit the [backend](https://github.com/israelias/cheathub/tree/master/backend) root directory for details on deployment steps.
## Cloning This Repo
- Clone this repo by running `git clone httpsL//github.com/israelias/cheathub`
- at the jump, `cd` to the name of this repo:
`cd cheathub`
### [`cd frontend`](https://github.com/israelias/cheathub/tree/master/frontend)
- configure frontend: `cd frontend` and install the frontend package and deps: `yarn install`, then run the development server: `yarn dev`, open browser to `localhost:3000`
- Please visit the [frontend](https://github.com/israelias/cheathub/tree/master/frontend) root directory for details on required modules.

### [`cd backend`](https://github.com/israelias/cheathub/tree/master/backend)
- configure backend: `cd backend`, and install modules from `requirements.txt` (via virtual enb) and run `python run.py`, open browser to `localhost:5000/admin`
- Please visit the [backend](https://github.com/israelias/cheathub/tree/master/backend) root directory for details on required modules.

## Credits
### Code
- TS Configs
- Framer Motion Configs
- Frontend/Backend Configs

### Content and Media
- All content attribution

### Acknowledgments
- [ESlint](https://dev.to/benweiser/how-to-set-up-eslint-typescript-prettier-with-create-react-app-3675)
- [React create-react-app v3.4.1 typescript: ESLint & Prettier with Airbnb style guides and VSCode WebStorm setup 2020](https://medium.com/react-courses/react-create-react-app-v3-4-1-a55f3e7a8d6d)
- [Instant write ReactJS Typescript components — complete beginners guide with a cheatsheet 2020 React](https://medium.com/react-courses/instant-write-reactjs-typescript-components-complete-beginners-guide-with-a-cheatsheet-e32a76022a44)
- [Airbnb Javascript style guide — Key takeaway](https://medium.com/docon/airbnb-javascript-style-guide-key-takeaways-ffd0370c053)
-[Config ESLint, Prettier in Typescript React App](https://rajduraisamy.medium.com/config-eslint-prettier-in-typescript-react-app-c92ebf14a896)