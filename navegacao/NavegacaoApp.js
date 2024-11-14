import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Lembre-se de instalar o pacote expo-vector-icons
import TelaLogin from '../telas/TelaLogin';
import TelaCadastro from '../telas/TelaCadastro';
import TelaExercicios from '../telas/TelaExercicios';
import TelaCorrida from '../telas/TelaCorrida';
import TelaNutricionistas from '../telas/TelaNutricionistas';
import TelaMeditacao from '../telas/TelaMeditacao';
import TelaVideoExercicio from '../telas/TelaVideoExercicio';
import TelaAlimentacao from '../telas/TelaAlimentacao';

// Criar os navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Definir o Tab Navigator para as principais telas após o login
function TabsApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Definir ícones com base no nome da tela
          if (route.name === 'Exercícios') {
            iconName = 'fitness-outline';
          } else if (route.name === 'Corrida') {
            iconName = 'walk-outline';
          } else if (route.name === 'Nutricionistas') {
            iconName = 'nutrition-outline';
          } else if (route.name === 'Meditação') {
            iconName = 'meditation-outline';
          } else if (route.name === 'Alimentação') {
            iconName = 'fast-food-outline';
          }

          // Retornar o ícone apropriado para a aba
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5733', // Cor para a aba ativa
        tabBarInactiveTintColor: 'gray', // Cor para a aba inativa
        tabBarStyle: {
          backgroundColor: '#fff', // Fundo da barra de navegação
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          borderTopWidth: 0,
          elevation: 10, // Elevação para sombra
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Exercícios" component={TelaExercicios} options={{ headerShown: false }} />
      <Tab.Screen name="Corrida" component={TelaCorrida} options={{ headerShown: false }} />
      <Tab.Screen name="Nutricionistas" component={TelaNutricionistas} options={{ headerShown: false }} />
      <Tab.Screen name="Meditação" component={TelaMeditacao} options={{ headerShown: false }} />
      <Tab.Screen name="Alimentação" component={TelaAlimentacao} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Definir a navegação principal com o Stack Navigator
export default function NavegacaoApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="Login" component={TelaLogin} />
        {/* Após o login, o usuário será redirecionado para as abas */}
        <Stack.Screen name="TabsApp" component={TabsApp} options={{ headerShown: false }} />
        <Stack.Screen name="VideoExercicio" component={TelaVideoExercicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}