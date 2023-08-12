import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const EpisodeList = () => {
  const navigation = useNavigation();
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/episode')
      .then(response => {
        setEpisodes(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching episodes', error);
      });
  }, []);

  const handleEpisodePress = episode => {
    navigation.navigate('EpisodeDetailScreen', {episode});
  };

  const renderEpisodeItem = ({item}) => (
    <TouchableOpacity
      style={styles.episodeItem}
      onPress={() => handleEpisodePress(item)}>
      <Text style={styles.episodeTitle}>Episode {item.episode}</Text>
      <Text style={styles.episodeAirDate}>Air Date: {item.air_date}</Text>
      <Text style={styles.episodeName}>{item.name}</Text>{' '}
      {/* Display episode name */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rick and Morty Episodes</Text>
      <FlatList
        data={episodes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderEpisodeItem}
      />
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
  episodeItem: {
    backgroundColor: '#3B3B3D',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  episodeTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  episodeAirDate: {
    color: '#FFF',
  },
});

export default EpisodeList;
