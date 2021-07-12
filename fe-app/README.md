# React Typescript template project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Coding Convention

### File/Folder Naming Convention

- Inside `src/components/*` use <strong>PascalCase</strong> for folder name.  e.g `scr/components/HeaderComponent/*`

- Inside `src/page/*` use <strong>kebab-case</strong> for folder name.  e.g `scr/pages/new-page/`

- Component tsx file and sass/scss stylesheet file inside same `component or pages` folder
 should be use <strong>PascalCase</strong> for filename.  e.g `Home.tsx` and `HomeStyles.scss`

### Variables/Functions Naming Convention

- Use <strong>camelCase</strong> when naming objects, functions, and instances

- Use <strong>PascalCase</strong> only when naming constructors or classes

- Use <strong>UPPER_CASE</strong> for constant only if it is exported, is a const (it can not be reassigned), and the programmer can trust it (and its nested properties) to never change