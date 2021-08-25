![](https://github.com/israelias/cheathub/blob/master/public/featurescreanshot.png?raw=true)
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
  - [User Testing](#user-testing)
  - [Code Testing](#code-testing)
- [Deployment](#deployment)
- [Cloning This Repository](#cloning-this-repository)
- [Credits](#credits)
  - [Code](#code)
  - [Content and Media](#content-and-media)
  - [Acknowledgements](#acknowledgements)

## UX
### User Stories
#### New Visitor Goals
- As a new vistor, I want to have a good understanding of what the website does.
- As a new visitor, I want to be able to register for an account.
#### Returning Visitor Goals
- As a Returning Visitor, I want to be able to log in securely.
- As a Returning Visitor, I want to be able to create a code snippet.
- As a Returning Visitor, I want to be able to see my code snippet.
- As a Returning Visitor, I want to be able to edit my code snippet.
- As a Returning Visitor, I want to be able to delete my code snippet(s).
- As a Returning Visitor, I want to be able to create a collection of my code snippets.
- As a Returning Visitor, I want to be able to see collections of my code snippets.
- As a Returning Visitor, I want to be able to edit collections of my code snippets.
- As a Returning Visitor, I want to be able to delete a collection of my code snippets.
#### Frequent Visitor Goals
- As a Frequent Visitor, I want to be able to search code snippets I have created.
- As a Frequent Visitor, I want to be able to search code snippets created by others.
- As a Frequent Visitor, I want to be able to like/fave code snippets created by others.
- As a Frequent Visitor, I want to be able to see my favorite code snippets created by others.
- As a Frequent Visitor, I want to be able to unlike/unfave code snippets created by others I have previously liked.
- As a Frequent Visitor, I want to be able to reference and copy code snippets to the the clipboard.
- As a Frequent Visitor, I want to  able to delete my account.
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
- Add query params to all resources
- Extend query parser to parse more than one query at a time
- Optimize performance by dereferencing database records
- User profile page
- Ability to add friends
- Ability to share snippets
## Technologies
### Frameworks and Libraries
  - ### [`cd frontend`](https://github.com/israelias/cheathub/tree/master/frontend)
    Please visit the [frontend](https://github.com/israelias/cheathub/tree/master/frontend) sub directory for details on ReactJS Typescript frameworks and libraries.\

[Go to frontend](https://github.com/israelias/cheathub/tree/master/frontend)
  - ### [`cd backend`](https://github.com/israelias/cheathub/tree/master/backend)
    Please visit the [backend](https://github.com/israelias/cheathub/tree/master/backend) root directory for details on Python Flask frameworks and libraries.


[Go to backend](https://github.com/israelias/cheathub/tree/master/backend)
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

#### Arrival
-  As a new vistor, I want to have a good understanding of what the website does
    - User arrives at home page.
      - The screen for `Cheathub` appears with a description of its functionality.
      - User reads description.
    - User continues.

[<div style="text-align:center"><img src="public/gifs/demo_landing.gif" width="500" alt="sign up landing"/></div>](public/gifs/demo_landing.gif)

#### Sign Up
- As a new visitor, I want to be able to register for an account.
    - User is clicks `Switch to sign up `
        - The sign up form appears
            - The username field is in focus
            - User types types a username, email and password.
              - The username is taken.
              - An error toast alert appears.
            - User modifies username
        - User is redirected to his/her `collections` profile.
    - User continues
    - Review:
    - A user is able to securely create an account.
 
[<div style="text-align:center"><img src="public/gifs/demo_signup.gif" width="500" alt="sign up"/></div>](public/gifs/demo_signinup.gif)

#### Sign In

- As a Returning Visitor, I want to be able to log in securely.
    - User clicks `Switch to sign in`
      - The sign in form appears
            - The email field is in focus
            - User types types email and password.
            - User hits enter.
            - A success toast alert appears.
        - User is redirected to his/her `collections` profile.
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_login.gif" width="500" alt="sign in"/></div>](public/gifs/demo_login.gif)

#### Add and View Snippet

- As a Returning Visitor, I want to be able to create a code snippet.
    - User clicks `Add new snippet`
      - A form appears.
        - The title field is in focus.
          - User inputs `title`, `description`, `language`
          - User pastes a code snippet.
        - User clicks submit.
          - A success toast alert appears.
      - User is redirected to his/her `collections` profile.
    - User continues

- As a Returning Visitor, I want to be able to see my code snippet.
    - User arrives at `Collections` profile.
      - A snippet card appears.
        - User sees code snippet interface with his/her 
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_addsnippet.gif" width="500" alt="add snippet"/></div>](public/gifs/demo_addsnippet.gif)

<details><summary><em>Add Another Snippet</em></summary>
<br>

[<div style="text-align:center"><img src="public/gifs/demo_addnewsnippet.gif" width="500" alt="add another snippet"/></div>](public/gifs/demo_addnewsnippet.gif)
<br>
</details>
<br>

#### Add Collection

- As a Returning Visitor, I want to be able to create a collection of my code snippets.
    - User clicks `Add New Collection`
      - A form appears.
        - The `name` field is in focus.
          - User inputs names collection
          - User selects existing code snippets to add.
        - User clicks submit.
          - A success toast alert appears.
      - User is redirected to his/her `collections` profile.
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_addcollection.gif" width="500" alt="add collection"/></div>](public/gifs/demo_addcollection.gif)

#### View Collection

- As a Returning Visitor, I want to be able to see collections of my code snippets.
    - User arrives at `Collections` profile.
      - A `collections` card appears.
        - User sees `collection` interface that includes snippets added.
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_viewcollection.gif" width="500" alt="view collection"/></div>](public/gifs/demo_viewcollection.gif)

#### Edit Collection Details

- As a Returning Visitor, I want to be able to edit collections of my code snippets.
    - User clicks `Edit this Collection`
      - A form appears.
        - The `name` field is in focus.
          - User renames collection.
          - User uses `select` input add more snippets.
          - User uses `select` input to remove previous snippets.
        - User clicks submit.
          - A success toast alert appears.
      - User is redirected to his/her `collections` profile.
      - An updated `collection` appears.
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_editcollectionname.gif" width="500" alt="edit collection name"/></div>](public/gifs/demo_editcollectionname.gif)
#### Edit and View Snippet

- As a Returning Visitor, I want to be able to edit my code snippet.
    - User clicks `Edit this snippet`
      - A form appears.
        - The title field is in focus.
          - User modifies `description`
          - User updates code snippet.
          - User adds optional `source` url.
          - User adds optional `tags`
        - User clicks submit.
          - A success toast alert appears.
      - User is redirected to his/her `collections` profile.
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_editfirstsnippet.gif" width="500" alt="edit first snippet"/></div>](public/gifs/demo_editfirstsnippet.gif)

<details><summary><em>Edit Another Snippet</em></summary>
<br>

[<div style="text-align:center"><img src="public/gifs/demo_editsnippet.gif" width="500" alt="edit another snippet"/></div>](public/gifs/demo_editsnippet.gif)
<br>
</details>
<br>

#### Delete Snippet

- As a Returning Visitor, I want to be able to delete my code snippet(s).
    - User clicks `Edit this snippet`
      - A form appears.
        - The title field is in focus.
          - User clicks `Delete`
            - Modal appears
            - The cancel button is in focus
            - User confirms
          - The modal is closed
          - A success toast alert appears.
      - User is redirected to his/her `collections` profile.
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_deletefirstsnippet.gif" width="500" alt="delete first snippet"/></div>](public/gifs/demo_deletefirstsnippet.gif)

<details><summary><em>Delete Another Snippet</em></summary>
<br>

[<div style="text-align:center"><img src="public/gifs/demo_deletelastsnippet.gif" width="500" alt="delete another snippet"/></div>](public/gifs/demo_deletelastsnippet.gif)
<br>
</details>
<br>

#### Delete Collection

- As a Returning Visitor, I want to be able to delete a collection of my code snippet(s).
    - User clicks `Edit this Collection`
      - A form appears.
        - The name field is in focus.
          - User clicks `Delete`
            - Modal appears
            - The cancel button is in focus
            - User confirms
          - The modal is closed
          - A success toast alert appears.
      - User is redirected to his/her `collections` profile.
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_deletecollection.gif" width="500" alt="delete collection"/></div>](public/gifs/demo_deletecollection.gif)

#### Search Snippets

- As a Frequent Visitor, I want to be able to search code snippets I have created.
    - User clicks `Snippets`
      - User is rerouted to `Snippets` page.
      - A feed of all public snippet cards appear.
      - The `Snippets Search` input appears.   
      - The `search` field is in focus.
        - User types a `search text`
          - The snippet cards return snippets that match `search text`
        - User uses `select` input to query by `language`
          - The snippet cards return snippets written in `language`
        - User uses `select` input to query by `tags`
          - The snippet cards return snippets that include input `tag`
        - User clickes `Show All`
          - The snippet cards return most recent snippets posted.
        - User scrolls to end of page 
          - The `pagination` buttons appear
          - User clicks `Next`
            - Snippet cards for next page appear.
      - User continues

[<div style="text-align:center"><img src="public/gifs/demo_search.gif" width="500" alt="search"/></div>](public/gifs/demo_search.gif)

#### Fave/Unfave Snippet and View Faved/Unfaved Snippets

- As a Frequent Visitor,  I want to be able to like/fave code snippets created by others.
    - User is in `Snippets` page.
      - A feed of all public snippet cards appear.
        - User finds a snippet card.
        - User clicks `Fave`  
          - A success toast appears 
    - User continues
- As a Frequent Visitor, I want to be able to unlike/unfave code snippets created by others.
    - User is in `Snippets` page.
      - A feed of all public snippet cards appear.
        - User finds a snippet card.
        - User clicks `Unfave`  
          - A success toast appears 
        - User clicks `Collections`
        - The faves collection appears.
        - User sees updated Faves.
    - User continues
- As a Frequent Visitor, I want to be able to see my favorite code snippets created by others.
    - User is in `Collections` page.
      - A collection named `Faves` appears.
        - User finds all favorite snippts as a collection.
    - User continues

[<div style="text-align:center"><img src="public/gifs/demo_addfave.gif" width="500" alt="add fave and view faves"/></div>](public/gifs/demo_addfave.gif)

#### Copy Snippet to Clipboard

- I want to be able to reference and copy code snippets to the clipboard.
    - User is in `Search` page.
      - A feed of all public snippet cards appear.
        - User finds a snippet card.
        - User clicks `Copy` button
          - The copy button changes to a success icon.
          - The code snippet is copied to the clipboard.
    - User continues

#### Delete Account
- As a Frequent Visitor, I want to be able to delete my account.
    - User is clicks `Delete my account`
      - Modal appears
          - The cancel button is in focus
            - User confirms
          - The modal is closed
        - Page is redirected to `/`
        - User is no longer able to log in with credentials
    - User continues
    - Review:
    - A user is able to securely remove his/her history from the database.

[<div style="text-align:center"><img src="public/gifs/demo_deleteaccount.gif" width="500" alt="delete account"/></div>](public/gifs/demo_deleteaccount.gif)

#### Switch Theme

[<div style="text-align:center"><img src="public/gifs/demo_lightmodes.gif" width="500" alt="search"/></div>](public/gifs/demo_lightmodes.gif)

Note: All screen shots  of expected results of User testing can be viewed in the public docs directory.
Please view them [here](https://github.com/israelias/cheathub/tree/master/public)
### Code Testing
#### Frontend
##### Performance, Accessibility, Best Practices, SEO, PWA
[View Latest Results](https://lighthouse-vercel-lighthouse-integration.vercel.app/reports/cheathub-1rxs3u78h-israelias.vercel.app)
- Lighthouse via Vercel is used to test performace, which produces unique results on every `git push`. [lighthouse-badges](https://github.com/emazzotta/lighthouse-badges) is used to generate new badges for every deployment by installing ```npm i -g lighthouse-badges``` and pushing the new hashed url to the array of urls:
    ```
    lighthouse-badges 
    -o docs/badges -r 
    -u https://cheathub.vercel.app/ [... all other urls]
                       
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
## Deployment

- The project frontend is written in [Typescript]() developed with [React](https://reactjs.org/), bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and deployed with [Vercel](https://nextjs.org/docs/deployment). The backend is written in [Python](), developed with [Flask]() to serve a restful database via [Mongo DB](). 
  ### [`cd frontend`](https://github.com/israelias/cheathub/tree/master/frontend)
  Please visit the [frontend](https://github.com/israelias/cheathub/tree/master/frontend) root directory for details on deployment steps.
  ### [`cd backend`](https://github.com/israelias/cheathub/tree/master/backend)
  Please visit the [backend](https://github.com/israelias/cheathub/tree/master/backend) root directory for details on deployment steps.

## Cloning This Repo
- Clone this repo by running `git clone httpsL//github.com/israelias/cheathub`
- at the jump, `cd` to the name of this repo:
`cd cheathub`
  ### [`cd frontend`](https://github.com/israelias/cheathub/tree/master/frontend)
  Please visit the [frontend](https://github.com/israelias/cheathub/tree/master/frontend) root directory for details on required modules via `yarn install` and to start the frontend development server on `localhost:3000`.
  ### [`cd backend`](https://github.com/israelias/cheathub/tree/master/backend)
  Please visit the [backend](https://github.com/israelias/cheathub/tree/master/backend) root directory for details on required modules via `requirements.txt` and to start the backend development server on `localhost:5000`.

[Go to frontend](https://github.com/israelias/cheathub/tree/master/frontend)\
[Go to backend](https://github.com/israelias/cheathub/tree/master/backend)
## Credits

### Content and Media
- Code snippets used to fill the database are public cheat sheets gathered throughout the development of the project include url references in the snippet cards. The `hello world` feature collection is references from [Say `hello world` in 28 different languages](https://excelwithbusiness.com/blog/say-hello-world-in-28-different-programming-languages/)

### Acknowledgments
#### ESLint and Typescript Configuration
- [ESlint Typescript with Prettier](https://dev.to/benweiser/how-to-set-up-eslint-typescript-prettier-with-create-react-app-3675) 
- [Create-React-App: Typescript, ESLint & Prettier with Airbnb style guides on VSCode](https://medium.com/react-courses/react-create-react-app-v3-4-1-a55f3e7a8d6d)
- [Airbnb Javascript style guide — Key takeaway](https://medium.com/docon/airbnb-javascript-style-guide-key-takeaways-ffd0370c053)
-[Config ESLint, Prettier in Typescript React App](https://rajduraisamy.medium.com/config-eslint-prettier-in-typescript-react-app-c92ebf14a896)
#### ReactJS and Typescript References
- [ReactJS Typescript components](https://medium.com/react-courses/instant-write-reactjs-typescript-components-complete-beginners-guide-with-a-cheatsheet-e32a76022a44)

#### Flask backend with React frontend References
- [Subdirectory Heroku Deployment](https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku)
- [Deploying Flask Restful Backend](https://medium.com/analytics-vidhya/flask-restful-api-with-heroku-da1ecf3e04b)

### Mentoring
- Aaron Sinnott
- Code Institute tutors
- Fellow Code Institute students