import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (isTestMode && username === 'admin' && password === '123') {
      Alert.alert('Test Login Success');
      navigation.navigate('Dashboard');
      return;
    }

    try {
      const response = await api.post('/login', { username, password });
      if (response.data) {
        Alert.alert('Login Success');
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topRow}>
          <Text style={styles.switchLabel}>Add Test User</Text>
          <Switch
            value={isTestMode}
            onValueChange={setIsTestMode}
            thumbColor="#ffffff"
            trackColor={{ false: '#ccc', true: '#ffffff' }}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Welcome Back 👋</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#999"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
              secureTextEntry
            />

            {isTestMode && (
              <View style={styles.testNote}>
                <Text style={styles.testNoteText}>⚠️ Admin Credentials:</Text>
                <Text style={styles.testNoteText}>
                  Username: <Text style={{ fontWeight: 'bold' }}>admin</Text>
                </Text>
                <Text style={styles.testNoteText}>
                  Password: <Text style={{ fontWeight: 'bold' }}>123</Text>
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00dbc0',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  switchLabel: {
    color: '#ffffff',
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  innerContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  testNote: {
    backgroundColor: '#e6fdfb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  testNoteText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  loginButton: {
    backgroundColor: '#00dbc0',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#00dbc0',
    fontSize: 15,
    fontWeight: '500',
  },
});
