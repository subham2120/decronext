export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  return Boolean(localStorage.getItem("token"));
};