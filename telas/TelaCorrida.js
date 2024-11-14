import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import * as Location from 'expo-location';

export default function TelaCorrida() {
  const [correndo, setCorrendo] = useState(false);
  const [distancia, setDistancia] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [ultimaPosicao, setUltimaPosicao] = useState(null);

  useEffect(() => {
    let timer;
    if (correndo) {
      timer = setInterval(() => setTempo((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [correndo]);

  const iniciarCorrida = async () => {
    setCorrendo(true);
    setLoading(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 1 },
        (position) => {
          calcularDistancia(position.coords);
          setUltimaPosicao(position.coords);
        }
      );
    } else {
      console.log("Permissão de localização negada");
      setLoading(false);
    }
  };

  const calcularDistancia = (novaPosicao) => {
    if (ultimaPosicao) {
      const novaDistancia = haversineDistance(ultimaPosicao, novaPosicao);
      setDistancia((prev) => prev + novaDistancia);
    }
  };

  const haversineDistance = (coord1, coord2) => {
    const R = 6371000;
    const lat1 = coord1.latitude * (Math.PI / 180);
    const lat2 = coord2.latitude * (Math.PI / 180);
    const deltaLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
    const deltaLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);

    const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const pararCorrida = () => {
    setCorrendo(false);
    setLoading(false);
    setHistorico((prev) => [...prev, { distancia: (distancia / 1000).toFixed(2), tempo }]);
    setDistancia(0);
    setTempo(0);
    setUltimaPosicao(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corrida</Text>
      {loading && <ActivityIndicator size="large" color="#FF5733" />}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Distância: <Text style={styles.statValue}>{(distancia / 1000).toFixed(2)} km</Text></Text>
        <Text style={styles.statText}>Tempo: <Text style={styles.statValue}>{Math.floor(tempo / 60)}:{(tempo % 60).toString().padStart(2, '0')}</Text></Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={correndo ? pararCorrida : iniciarCorrida}>
        <Text style={styles.buttonText}>{correndo ? 'Parar Corrida' : 'Iniciar Corrida'}</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Histórico de Corridas</Text>
      <FlatList
        data={historico}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>Distância: {item.distancia} km</Text>
            <Text style={styles.historyText}>Tempo: {Math.floor(item.tempo / 60)}:{(item.tempo % 60).toString().padStart(2, '0')}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FF5733', marginBottom: 20 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statText: { fontSize: 18, fontWeight: '600', color: '#333' },
  statValue: { fontSize: 22, color: '#FF5733', fontWeight: 'bold' },
  button: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  historyTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 30, marginBottom: 10 },
  historyItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  historyText: { fontSize: 16, color: '#333' },
});