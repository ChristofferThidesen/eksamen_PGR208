import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import db from '../../database/database'; 

const CharacterInfoScreen = ({route}) => {
  const navigation = useNavigation();
  const {character} = route.params;

  const handleNavigateToEpisodesList = async () => {
    if (character.episode && character.episode.length > 0) {
      const characterEpisodes = await db.getEpisodesByCharacter(character.id);
      navigation.navigate('EpisodesListScreen', {episodes: characterEpisodes});
    } else {
      console.error('No episodes found for this character.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: character.image}} style={styles.characterImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.characterName}>{character.name}</Text>
        <Text>Status: {character.status}</Text>
        <Text>Species: {character.species}</Text>
        <Text>Gender: {character.gender}</Text>
        <Text>Location: {character.location.name}</Text>
        <Text>Origin: {character.origin.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToEpisodesList}>
        <Text style={styles.buttonText}>View Episodes</Text>
      </TouchableOpacity>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  characterImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  infoContainer: {
    backgroundColor: '#3B3B3D',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CharacterInfoScreen;
