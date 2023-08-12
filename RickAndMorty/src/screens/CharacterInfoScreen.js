import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CharacterInfoScreen = ({route}) => {
  const navigation = useNavigation(); // Get navigation object

  const {character} = route.params;

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
      <Button
        title="Back"
        onPress={() => navigation.goBack()} // Navigate back
      />
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
});

export default CharacterInfoScreen;
