import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const CharacterList = ({handleCharacterPress}) => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching characters', error);
      });
  }, []);

  useEffect(() => {
    // Filter characters based on search term
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCharacters(filtered);
  }, [searchTerm, characters]);

  const handleSearch = term => {
    setSearchTerm(term);
  };

  const renderGridItem = ({item}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => handleCharacterPress(item)}>
      <Image source={{uri: item.image}} style={styles.cardImg} />
      <View style={styles.cardTextBox}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardText}>{item.gender}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleCharacterPress(item)}>
            <Text style={styles.buttonText}>See more info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rick and Morty Characters</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCharacters}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
        numColumns={2}
        renderItem={renderGridItem}
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
  searchInput: {
    backgroundColor: '#3B3B3D',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#FFF',
  },
  cardContainer: {
    width: '100%',
  },
  card: {
    flex: 1,
    aspectRatio: 0.5,
    margin: 5,
    color: '#FFF',
    padding: 0,
    borderRadius: 5,
    backgroundColor: '#3B3B3D',
    overflow: 'hidden',
    width: 80,
  },
  cardImg: {
    width: '100%',
    height: '70%',
    borderRadius: 5,
  },
  cardTextBox: {
    padding: 10,
    color: '#FFF',
  },
  cardText: {
    color: '#FFF',
  },
  buttonText: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default CharacterList;
