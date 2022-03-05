import React from 'react';
import { View, Button, Text } from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>
          Olá, {user?.name}. {"\n"}
          Seu email é {user?.email}. {"\n"}
          Seu CPF é {user?.cpf} {"\n"}
        </Text>
      </View>
      <Button
        title="Logout"
        onPress={handleSignOut}
      />
    </View>
  );
}

export default Dashboard;