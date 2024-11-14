import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaLogin({ navigation }) {
  const [usuario, setUsuario] = useState('');

  const handleLogin = async () => {
    // Simula o login e salva o usuário
    await AsyncStorage.setItem('usuario', usuario);
    // Redireciona para o Tab Navigator (que tem as telas principais)
    navigation.navigate('TabsApp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  titulo: { 
    fontSize: 32, 
    marginBottom: 30, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: '#FF5733' 
  },
  input: { 
    borderWidth: 1, 
    padding: 15, 
    marginBottom: 20, 
    borderRadius: 8, 
    borderColor: '#ddd', 
    fontSize: 18,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});