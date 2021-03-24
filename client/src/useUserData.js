import { createContext, useContext } from 'react';

export const UserContext = createContext({});
UserContext.displayName = 'UserContext';

const useUserData = () => useContext(UserContext);

export default useUserData;
