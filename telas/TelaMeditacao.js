import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, TouchableOpacity } from 'react-native';

const dicas = [
  {
    titulo: 'Mindfulness',
    conteudo: 'Mindfulness é a prática de estar presente no momento, reconhecendo e aceitando seus pensamentos, sentimentos e sensações sem julgamento.',
    recomendacoes: [
      {
        nome: 'Vídeo: Meditação Guiada Mindfulness | Acalme a mente e relaxe',
        url: 'https://www.youtube.com/watch?v=gPT0R4DNjE4',
      },
      {
        nome: 'Canal: Yoga Mudra Raissa Zoccal',
        url: 'https://www.youtube.com/@YogaMudrabr',
      },
    ],
  },
  {
    titulo: 'Meditação',
    conteudo: 'Meditação é uma prática que envolve focar a mente e eliminar distrações. Pode ajudar a reduzir o estresse e a ansiedade.',
    recomendacoes: [
      {
        nome: 'Vídeo: Meditação para Dormir e Relaxar',
        url: 'https://www.youtube.com/watch?v=wOU0a93a4NY&list=PLJrVwnnn3RFTtUBaC65tuhwh3hz4QFOWD&index=15',
      },
      {
        nome: 'Canal: Yoga Mudra Raissa Zoccal',
        url: 'https://www.youtube.com/@YogaMudrabr',
      },
    ],
  },
  {
    titulo: 'Yoga',
    conteudo: 'Yoga é uma prática que combina posturas físicas, respiração e meditação. É excelente para aumentar a flexibilidade e promover o bem-estar.',
    recomendacoes: [
      {
        nome: 'Vídeo: Yoga para INICIANTES | Matinal',
        url: 'https://www.youtube.com/watch?v=f1WrHov2hlY&list=PLJrVwnnn3RFQMew6Lbap2oF1o13bcHXMw&index=1',
      },
      {
        nome: 'Canal: Yoga Mudra Raissa Zoccal',
        url: 'https://www.youtube.com/@YogaMudrabr',
      },
    ],
  },
];

export default function TelaMeditacao() {
  return (
    <ScrollView style={styles.container}>
      {dicas.map((dica, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.titulo}>{dica.titulo}</Text>
          <Text style={styles.conteudo}>{dica.conteudo}</Text>
          <Text style={styles.recomendacaoTitulo}>Recomendações:</Text>
          {dica.recomendacoes.map((recomendacao, index) => (
            <TouchableOpacity
              key={index}
              style={styles.linkContainer}
              onPress={() => Linking.openURL(recomendacao.url)}
            >
              <Text style={styles.link}>{recomendacao.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  card: { 
    marginBottom: 20, 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 5,
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#FF5733',
  },
  conteudo: { 
    fontSize: 16, 
    marginBottom: 10,
    color: '#555',
  },
  recomendacaoTitulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 10, 
    color: '#333',
  },
  linkContainer: { 
    marginTop: 5, 
    padding: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: '#FF5733' 
  },
  link: { 
    color: '#FF5733', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});