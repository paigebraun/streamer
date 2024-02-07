// Create a React context for user data
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const updateUser = (userObject) => {
    setLoggedIn(userObject.loggedIn);
    setUsername(userObject.username);
    setWatchlist(userObject.watchlist || []);
  };

  return (
    <UserContext.Provider value={{ loggedIn, username, watchlist, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
