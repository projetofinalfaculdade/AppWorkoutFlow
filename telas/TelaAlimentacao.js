import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaAlimentacao() {
  const [alimentos, setAlimentos] = useState([]);
  const [novoAlimento, setNovoAlimento] = useState('');
  const [calorias, setCalorias] = useState('');
  const [totalCalorias, setTotalCalorias] = useState(0);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarCaloriasDiarias();
  }, []);

  const carregarCaloriasDiarias = async () => {
    try {
      const dadosArmazenados = await AsyncStorage.getItem('caloriasDiarias');
      if (dadosArmazenados) {
        const dados = JSON.parse(dadosArmazenados);
        setAlimentos(dados.alimentos || []);
        setTotalCalorias(dados.totalCalorias || 0);
      } else {
        resetarCaloriasDiarias();
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const resetarCaloriasDiarias = async () => {
    setAlimentos([]);
    setTotalCalorias(0);
    await AsyncStorage.setItem('caloriasDiarias', JSON.stringify({ alimentos: [], totalCalorias: 0 }));
  };

  const adicionarOuEditarAlimento = async () => {
    if (novoAlimento.trim() && calorias.trim()) {
      const alimento = { nome: novoAlimento, calorias: parseInt(calorias) };
      const novosAlimentos = [...alimentos];
      if (editando !== null) {
        novosAlimentos[editando] = alimento;
        setEditando(null);
      } else {
        novosAlimentos.push(alimento);
      }
      const novasCalorias = novosAlimentos.reduce((acc, item) => acc + item.calorias, 0);
      setAlimentos(novosAlimentos);
      setTotalCalorias(novasCalorias);
      await AsyncStorage.setItem('caloriasDiarias', JSON.stringify({ alimentos: novosAlimentos, totalCalorias: novasCalorias }));
      setNovoAlimento('');
      setCalorias('');
    }
  };

  const editarAlimento = (index) => {
    setNovoAlimento(alimentos[index].nome);
    setCalorias(alimentos[index].calorias.toString());
    setEditando(index);
  };

  const excluirAlimento = async (index) => {
    const novosAlimentos = alimentos.filter((_, i) => i !== index);
    const novasCalorias = novosAlimentos.reduce((acc, item) => acc + item.calorias, 0);
    setAlimentos(novosAlimentos);
    setTotalCalorias(novasCalorias);
    await AsyncStorage.setItem('caloriasDiarias', JSON.stringify({ alimentos: novosAlimentos, totalCalorias: novasCalorias }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Alimentação</Text>
      <Text style={styles.sectionTitle}>Calorias Consumidas Hoje</Text>
      <Text style={styles.totalCalories}>{totalCalorias} kcal</Text>

      <FlatList
        data={alimentos}
        renderItem={({ item, index }) => (
          <View style={styles.alimentoContainer}>
            <Text style={styles.alimentoText}>{item.nome} - {item.calorias} kcal</Text>
            <View style={styles.botoesContainer}>
              <TouchableOpacity onPress={() => editarAlimento(index)} style={styles.botaoEditar}>
                <Text style={styles.botaoTexto}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirAlimento(index)} style={styles.botaoExcluir}>
                <Text style={styles.botaoTexto}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.sectionTitle}>{editando !== null ? 'Editar Alimento' : 'Adicionar Alimento'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do alimento"
        placeholderTextColor="#888"
        value={novoAlimento}
        onChangeText={setNovoAlimento}
      />
      <TextInput
        style={styles.input}
        placeholder="Calorias"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={calorias}
        onChangeText={setCalorias}
      />
      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarOuEditarAlimento}>
        <Text style={styles.botaoTexto}>{editando !== null ? 'Salvar Edição' : 'Adicionar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginVertical: 10 },
  totalCalories: { fontSize: 32, fontWeight: 'bold', color: '#4CAF50', marginBottom: 20, textAlign: 'center' },
  alimentoContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between' },
  alimentoText: { fontSize: 16, color: '#333' },
  botoesContainer: { flexDirection: 'row' },
  botaoEditar: { marginRight: 10, backgroundColor: '#4CAF50', padding: 8, borderRadius: 5 },
  botaoExcluir: { backgroundColor: '#FF5252', padding: 8, borderRadius: 5 },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  botaoAdicionar: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center' },
});