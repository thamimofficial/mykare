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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password');
      return;
    }

    if (isTestMode) {
      if (username !== 'admin' || password !== '123') {
        Alert.alert('Invalid Test Credentials', 'Use admin / 123 to test');
        return;
      }

      const existing = await AsyncStorage.getItem('users');
      const users = existing ? JSON.parse(existing) : [];

      if (users.includes(username)) {
        Alert.alert('User already exists');
        return;
      }

      users.push(username);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Success', 'Test user registered successfully');
      setUsername('');
      setPassword('');
      navigation.navigate('Dashboard');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:8080/api/register', {
        username,
        password,
      });

      const message =
        typeof response.data === 'string'
          ? response.data
          : response.data.message || 'Registered Successfully';

      Alert.alert('Success', message);
      setUsername('');
      setPassword('');
      navigation.navigate('Dashboard');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Registration failed';
      Alert.alert('Error', errorMessage.toString());
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.switchRow}>
              <Text style={styles.label}>Use Test Credentials</Text>
              <Switch
                value={isTestMode}
                onValueChange={setIsTestMode}
                thumbColor={isTestMode ? '#00dbc0' : '#ccc'}
              />
            </View>

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00dbc0',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    color: '#000',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00dbc0',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 15,
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
