import React, {useState, useEffect} from 'react';

import {View, StyleSheet} from 'react-native';
import axios from 'axios';
import CharacterList from '../components/CharacterList';
import CharacterSearch from '../components/CharacterSearch';

const HomeScreen = ({navigation}) => {
  // Pass navigation as a prop
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCharacterPress = character => {
    navigation.navigate('CharacterInfoScreen', {character});
  };

  const handleSearch = searchTerm => {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCharacters(filtered);
  };

  return (
    <View style={styles.container}>
      <CharacterSearch onSearch={handleSearch} />
      <CharacterList
        characters={filteredCharacters}
        handleCharacterPress={handleCharacterPress}
        navigation={navigation} // Pass navigation as a prop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
});

export default HomeScreen;
