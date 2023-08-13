import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EpisodeDetailScreen = ({route}) => {
  const {episode} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Episode Details</Text>
      <Text style={styles.title}>Episode {episode.episode}</Text>
      <Text style={styles.summary}>Episode Name: {episode.name}</Text>
      <Text style={styles.airDate}>Air Date: {episode.air_date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  airDate: {
    color: '#FFF',
    marginBottom: 10,
  },
  summary: {
    color: '#FFF',
  },
});

export default EpisodeDetailScreen;
