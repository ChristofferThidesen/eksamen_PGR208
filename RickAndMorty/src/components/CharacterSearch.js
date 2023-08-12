import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

const CharacterSearch = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search characters by name"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button style={styles.searchBtn} title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  searchBtn: {
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});

export default CharacterSearch;
