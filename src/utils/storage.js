export const saveItem = (key, value) => {
  sessionStorage.setItem(key, value);
};

export const loadItem = (key) => {
  return sessionStorage.getItem(key);
};
