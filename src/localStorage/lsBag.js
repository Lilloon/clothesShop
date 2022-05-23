export const setBagLS = (bagId) => {
  localStorage.setItem("bag", bagId);
  return;
};

export const removeBagLS = () => {
  localStorage.removeItem("bag");
  return;
};

export const getBagIdLS = () => {
  return localStorage.getItem("bag");
};
