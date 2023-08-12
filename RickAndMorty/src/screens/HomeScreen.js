import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import axios from 'axios';
import CharacterList from '../components/CharacterList';

const HomeScreen = ({navigation}) => {
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

      <CharacterList
        characters={filteredCharacters}
        handleCharacterPress={handleCharacterPress}
        navigation={navigation}
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
