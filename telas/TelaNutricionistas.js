import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const nutricionistas = [
  {
    id: '1',
    nome: 'Dr. João Silva',
    especialidade: 'Nutrição Esportiva',
    telefone: '1234-5678',
    email: 'joao@gmail.com',
    imagem: 'https://st3.depositphotos.com/13194036/19302/i/450/depositphotos_193027580-stock-photo-nutritionist-white-coat-fresh-vegetables.jpg',
    perfil: 'https://www.youtube.com',
  },
  {
    id: '2',
    nome: 'Dra. Maria Oliveira',
    especialidade: 'Dietas Especiais',
    telefone: '8765-4321',
    email: 'maria@gmail.com',
    imagem: 'https://st3.depositphotos.com/1010550/18971/i/450/depositphotos_189719020-stock-photo-young-smiling-female-nutritionist-looking.jpg',
    perfil: 'https://www.youtube.com',
  },
];

export default function TelaNutricionistas() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nutricionistas</Text>
      <FlatList
        data={nutricionistas}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(item.perfil)}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.especialidade}>{item.especialidade}</Text>
              <Text style={styles.contato}>Telefone: {item.telefone}</Text>
              <Text style={styles.contato}>Email: {item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  titulo: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#FF5733' 
  },
  card: { 
    flexDirection: 'row', 
    marginBottom: 15, 
    padding: 15, 
    backgroundColor: '#ffffff', 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 5,
  },
  imagem: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    marginRight: 15 
  },
  infoContainer: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  nome: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  especialidade: { 
    fontSize: 16, 
    color: '#555', 
    marginVertical: 5 
  },
  contato: { 
    fontSize: 14, 
    color: '#777' 
  },
});