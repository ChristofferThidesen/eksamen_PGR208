import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

const EpisodesListScreen = ({route, navigation}) => {
  const {episodes} = route.params;
  const [characterEpisodes, setCharacterEpisodes] = useState([]);

  useEffect(() => {
    const fetchCharacterEpisodes = async () => {
      if (episodes && episodes.length > 0) {
        const episodeData = await Promise.all(
          episodes.map(episodeUrl =>
            axios.get(episodeUrl).then(response => response.data),
          ),
        );

        setCharacterEpisodes(episodeData);
      }
    };

    fetchCharacterEpisodes();
  }, [episodes]);

  const handleEpisodePress = episode => {
    navigation.navigate('EpisodeDetailScreen', {episode});
  };

  const renderEpisodeItem = ({item}) => (
    <TouchableOpacity
      style={styles.episodeItem}
      onPress={() => handleEpisodePress(item)}>
      <Text style={styles.episodeTitle}>{item.name}</Text>
      <Text style={styles.episodeAirDate}>Air Date: {item.air_date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Episodes List</Text>
      <FlatList
        data={characterEpisodes}
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

export default EpisodesListScreen;
