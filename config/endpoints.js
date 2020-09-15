const production = {
  CLIENT_BASE_URL: "https://top-links.surge.sh",
  CLIENT_HOME_PAGE_URL: "https://top-links.surge.sh/home",
  CLIENT_LOGIN_PAGE_URL: "https://top-links.surge.sh",
};

const dev = {
  CLIENT_BASE_URL: "http://localhost:3000",
  CLIENT_HOME_PAGE_URL: "http://localhost:3000/home",
  CLIENT_LOGIN_PAGE_URL: "http://localhost:3000",
};

const ENDPOINTS = process.NODE_ENV === "production" ? production : dev;

module.exports = ENDPOINTS;
