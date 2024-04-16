const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};

const removeCookie = () => {
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};

export { setCookie, getCookie, removeCookie };
