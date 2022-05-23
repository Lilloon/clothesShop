export const setUserLS = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearUserLS = () => {
  localStorage.removeItem("user");
};

export const getUserLS = () => {
  const user = localStorage.getItem("user");
  return JSON.parse(user);
};
