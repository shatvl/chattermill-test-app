/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

/* eslint-disable */

const React = require('react');
const { AppThemeProvider } = require('./src/context/AppThemeContext');
const { AuthProvider } = require('./src/context/AuthContext');

// You can delete this file if you're not using it

// Wrap pages in our base contexts
exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <AuthProvider>
      <AppThemeProvider>{element}</AppThemeProvider>
    </AuthProvider>
  );
};

exports.onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
};
