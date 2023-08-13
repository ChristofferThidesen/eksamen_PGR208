import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import db from '../../database/database';

const EpisodeDetailScreen = ({route}) => {
  const {episode} = route.params;
  const [episodeDetails, setEpisodeDetails] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      const details = await db.getEpisodeDetails(episode.id);
      setEpisodeDetails(details);
    };

    fetchEpisodeDetails();
  }, [episode.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Episode Details</Text>
      {episodeDetails && (
        <>
          <Text style={styles.title}>Episode {episode.episode}</Text>
          <Text style={styles.summary}>
            Episode Name: {episodeDetails.name}
          </Text>
          <Text style={styles.airDate}>
            Air Date: {episodeDetails.air_date}
          </Text>
        </>
      )}
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
