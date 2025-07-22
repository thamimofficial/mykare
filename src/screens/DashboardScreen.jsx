import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [ip, setIp] = useState(null);
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const ipRes = await fetch('https://api.ipify.org/?format=json');
        const ipJson = await ipRes.json();

        const token = '6f2128aeeedc5c'; // Replace with your real token
        const locRes = await fetch(`https://ipinfo.io/${ipJson.ip}?token=${token}`);
        const locJson = await locRes.json();

        setIp(ipJson.ip);
        setCountry(locJson.country || 'N/A');
        setCountryCode(locJson.country || 'N/A');
      } catch (error) {
        console.error('FETCH ERROR:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={require('../assets/mykareLogo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome to Dashboard</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#00dbc0" style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={styles.infoCard}>
              <Text style={styles.label}>IP Address</Text>
              <Text style={styles.info}>{ip || 'N/A'}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.label}>Country</Text>
              <Text style={styles.info}>{country || 'India'}</Text>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00dbc0',
    marginVertical: 20,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#f0f9f9',
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    fontWeight: '600',
  },
  info: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: '#00dbc0',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
