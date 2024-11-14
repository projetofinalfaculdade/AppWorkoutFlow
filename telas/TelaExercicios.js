import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const exercicios = [
  {
    id: '1',
    nome: 'Flexão de Braço',
    descricao: 'Um exercício que trabalha principalmente o peito, ombros e tríceps.',
    videoUrl: 'https://www.youtube.com/watch?v=xAiHrxk5XyU&pp=ygUfY29tbyBmYXplciBmbGV4w6NvIGNvcnJldGFtZW50ZQ%3D%3D',
    imagem: 'https://st4.depositphotos.com/4509995/24384/i/380/depositphotos_243849492-stock-photo-healthy-lifestyle-fitness-people-and.jpg',
  },
  {
    id: '2',
    nome: 'Agachamento',
    descricao: 'Um exercício fundamental para fortalecer as pernas e glúteos.',
    videoUrl: 'https://www.youtube.com/watch?v=Ufh39C5cMfU&pp=ygUjY29tbyBmYXplciBhZ2FjaGFtZW50byBjb3JyZXRhbWVudGU%3D',
    imagem: 'https://i.ytimg.com/vi/Ufh39C5cMfU/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA87Oq_Ifouiowz65NVLIzK9XPiyA',
  },
  {
    id: '3',
    nome: 'Abdominal',
    descricao: 'Um exercício clássico para fortalecer a região do core.',
    videoUrl: 'https://www.youtube.com/watch?v=_Zeku5F7IX8&pp=ygUiY29tbyBmYXplciBhYmRvbWluYWlzIGNvcnJldGFtZW50ZQ%3D%3D',
    imagem: 'https://st2.depositphotos.com/1001959/10532/i/600/depositphotos_105320328-stock-photo-man-doing-abs-workouts.jpg',
  },
  {
    id: '4',
    nome: 'Barra Fixa',
    descricao: 'Este exercício é excelente para fortalecer a parte superior do corpo, especialmente os músculos das costas, bíceps e ombros.',
    videoUrl: 'https://www.youtube.com/watch?v=thg6cGXSlvY&pp=ygUiY29tbyBmYXplciBiYXJyYSBmaXhhIGNvcnJldGFtZW50ZQ%3D%3D',
    imagem: 'https://st.depositphotos.com/3383955/59382/i/600/depositphotos_593829982-stock-photo-muscular-man-doing-pull-horizontal.jpg',
  },
];

export default function TelaExercicios({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorito = (id) => favoritos.includes(id);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exercícios</Text>
      
      <FlatList
        data={exercicios}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <TouchableOpacity
                style={styles.videoButton}
                onPress={() =>
                  navigation.navigate('VideoExercicio', {
                    nome: item.nome,
                    videoUrl: item.videoUrl,
                  })
                }
              >
                <Text style={styles.videoButtonText}>Assistir Vídeo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
                <Text style={styles.favoritoText}>
                  {isFavorito(item.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {favoritos.length > 0 && (
        <>
          <Text style={styles.favoritosTitulo}>Favoritos</Text>
          <FlatList
            data={exercicios.filter((item) => isFavorito(item.id))}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.imagem }} style={styles.imagem} />
                <View style={styles.infoContainer}>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.descricao}>{item.descricao}</Text>
                  <TouchableOpacity
                    style={styles.videoButton}
                    onPress={() =>
                      navigation.navigate('VideoExercicio', {
                        nome: item.nome,
                        videoUrl: item.videoUrl,
                      })
                    }
                  >
                    <Text style={styles.videoButtonText}>Assistir Vídeo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
                    <Text style={styles.favoritoText}>
                      Remover dos Favoritos
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#FF5733', textAlign: 'center', marginBottom: 20 },
  favoritosTitulo: { fontSize: 24, fontWeight: 'bold', color: '#FF5733', marginVertical: 20 },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imagem: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  infoContainer: { flex: 1 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  descricao: { fontSize: 14, color: '#777', marginBottom: 10 },
  videoButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  videoButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  favoritoText: { color: '#FF6347', fontSize: 16, textAlign: 'center', marginTop: 5 },
});