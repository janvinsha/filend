const clearLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("hemba.store");
};
export default clearLocalStorage;
