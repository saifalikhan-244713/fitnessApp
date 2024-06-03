export const logout = () => {
    localStorage.removeItem('token'); // or whatever key you're using to store the token
  };