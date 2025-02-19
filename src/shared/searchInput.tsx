import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import SvgIcon from './Svg';
import {AppColors} from '../constants/colors.config';

interface SearchBarProps {
  onSearch: (term: string) => void;
  style?: ViewStyle;
  placeholder?:string
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch, style, placeholder = "search..."}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={styles.iconButton}
        testID="search-button">
        <SvgIcon name="search" strokeColor={AppColors.AppButtonBackground} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 16,
    margin: 10,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default SearchBar;
