import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput,TouchableOpacity } from 'react-native';

export default class App extends React.Component {
getWord=(word)=>{
  var searchKeyword=word.toLowerCase()
  var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
  return fetch(url)
  .then((data)=>{
    if(data.status===200){
      return data.json()
    }
    else{
      return null
    }
  })
}

render(){
  return(
<View>
<TextInput 
onChangeText={text=> {
  this.setState({
  text: text,
  isSearchPressed: false,
  word :'Loading...',
  lexicalCategory :'',
  definition: ""
});
}}
value={this.state.text}/>

<TouchableOpacity onPress={()=>{
  this.setState({isSearchPressed:true});
  this.getWord(this.state.text)
}}>
</TouchableOpacity>
</View>
  )
}
}