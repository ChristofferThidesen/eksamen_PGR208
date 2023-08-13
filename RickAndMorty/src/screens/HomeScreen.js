import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import axios from 'axios';
import CharacterList from '../components/CharacterList';
import db from '../../database/database';

const HomeScreen = ({navigation}) => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const charactersData = await db.getCharacters();
      if (charactersData.length === 0) {
        axios
          .get('https://rickandmortyapi.com/api/character')
          .then(response => {
            const apiCharacters = response.data.results;
            setCharacters(apiCharacters);
            setFilteredCharacters(apiCharacters);
            db.insertCharacters(apiCharacters);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        setCharacters(charactersData);
        setFilteredCharacters(charactersData);
      }
    };

    fetchCharacters();
  }, []);

  const handleCharacterPress = character => {
    navigation.navigate('CharacterInfoScreen', {character});
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
