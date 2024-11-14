import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartaoExercicio({ exercicio }) {
  return (
    <View style={styles.cartao}>
      <Text style={styles.nome}>{exercicio.nome}</Text>
      <Text style={styles.descricao}>{exercicio.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: { padding: 20, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 10 },
  nome: { fontSize: 18, fontWeight: 'bold' },
  descricao: { fontSize: 14 },
});
