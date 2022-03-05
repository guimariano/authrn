import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../contexts/auth';
import { View, ActivityIndicator } from 'react-native';

const Routes: React.FC = () => {
  const { isLoading, signed } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
