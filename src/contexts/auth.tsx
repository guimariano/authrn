import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import * as auth from '../services/auth';

interface User {
  name: string;
  email: string;
  cpf: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const stores = await getAsyncStorageProps(['@RnAuth:token', '@RnAuth:user']);
      const storagedToken = stores[0]['@RnAuth:token'];
      const storagedUser = parseResponse(stores[1]['@RnAuth:user']);

      if (storagedToken && storagedUser) {
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
        setUser(storagedUser);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const parseResponse = (response: string | null) => JSON.parse(JSON.stringify(response));

  const getAsyncStorageProps = async (asyncStorageKeys: Array<string>) => {
    return await AsyncStorage.multiGet(asyncStorageKeys)
      .then((response) => response.map(([key, value]) => (
        { [key]: value }
      )));
  }

  async function signIn() {
    const response = await auth.signInService();

    setUser(response.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    await AsyncStorage.multiSet([
      ['@RnAuth:user', JSON.stringify(response.user)],
      ['@RnAuth:token', response.token]
    ]);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      signIn,
      signOut,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}