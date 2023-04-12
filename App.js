import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  getWord = async (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definition[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;
          this.setState({
            word: this.state.text,
            definiton: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: 'Not Found',
          });
        }
      });
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Loading...',
              lexicalCategory: '',
              definition: '',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}><Text>Button</Text> </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputBox: {
    marginTop: 20, 
    width: '80%',
    alignSelf: 'center', 
    height: 40, 
    textAlign: 'center', 
    borderWidth: 4, 
    outline: 'none',
  },

  button: {
    width: '50%', 
    height: 55, 
    alignSelf: 'center', 
    padding: 10, 
    margin: 10,
    borderRadius:10
  }
});