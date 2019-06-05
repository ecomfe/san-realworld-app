const ID_TOKEN_KEY = "id_token";

function getToken() {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

function setToken(token) {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

function clearToken(){
  window.localStorage.removeItem(ID_TOKEN_KEY);
}

export default { getToken, setToken, clearToken };