import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TelaVideoExercicio({ route }) {
  const { nome, videoUrl } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nome}</Text>
      <WebView
        source={{ uri: videoUrl }}
        style={styles.video}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  video: { width: '100%', height: 300 },
});
