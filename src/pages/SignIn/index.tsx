import React from 'react';
import { View, Button } from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../contexts/auth';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  function handleSignIn() {
    signIn();
  }

  return (
    <View style={styles.container}>
      <Button
        title="Login In"
        onPress={handleSignIn}
      />
    </View>
  );
}

export default SignIn;