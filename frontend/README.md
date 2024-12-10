# E-Commerce App

This project is a modern e-commerce web application developed using React, Redux, and integrated with PayPal for payment processing. It includes both public and private routes, an admin panel for managing orders and products, and user authentication features.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run the following commands:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
For more information about testing with React, check the [Create React App testing documentation](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include hashes.\
Your app is ready to be deployed!

For more details, check the [deployment documentation](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you're not satisfied with the build tool and configuration choices, you can `eject` at any time. This will remove the single build dependency and copy all configuration files and transitive dependencies (Webpack, Babel, ESLint, etc.) into your project, giving you full control.

You don't have to eject. The default configuration is suitable for most applications. If you need to tweak the configuration, you can eject when you're ready.

## Project Structure

- **`src/index.js`** - The main entry point where the app is rendered. This file includes React Router setup, Redux store integration, and PayPal script provider.
- **`src/store.js`** - Redux store configuration, which integrates slices like `cartSlice`, `authSlice`, and `apiSlice`.
- **`src/components/PrivateRoute.jsx`** - Custom route component that checks if the user is authenticated before rendering private routes.
- **`src/components/AdminRoute.jsx`** - Custom route component that restricts access to admin pages based on the user's role.
- **`src/screens/`** - Contains the various screens for the public and private routes, such as the home page, product page, cart, login, register, etc.
- **`src/screens/admin/`** - Contains the admin panel screens for managing products, orders, and users.
- **`src/assets/styles/`** - Contains custom CSS styles, including a Bootstrap custom stylesheet and index.css for global styling.

## Redux Integration

This project uses Redux to manage global state. The store is configured with the following slices:

- **`cartSlice`** - Manages the shopping cart state.
- **`authSlice`** - Manages authentication state.
- **`apiSlice`** - Handles API interactions for data fetching.

### `store.js`

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import cartSliceReducer from "./slices/cartSlice.js";
import authSliceReducer from "./slices/authSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
```
