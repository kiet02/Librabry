import { Icon } from '@rneui/themed';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable, Modal, Alert, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Touchable, TouchableHighlight } from 'react-native';
import { CallGenre } from './Action/CallApi';
import Voice from '@react-native-voice/voice';

  

export default function Test({navigation}) {
  const [value, setValue] = useState(false);
  const Anphabet = ["A","B",'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  
  const [check,setCheck] =useState()
  const [search,setSearch] = useState('')
  useEffect(() => {
   

    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechStart = ()=> setStarted(true);
    Voice.onSpeechEnd =()=> setStarted(false);


    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const startSpeechToText = async () => {
    await Voice.start('vi_VI');
    onValueChange(true)
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
    // search.blur('');

    
   
  };

  const onSpeechResults = (result) => {
    if(result){
    setResults(result.value[0]);
    setSearch(result.value[0])
    stopSpeechToText()
    console.log(result.value[0]);
    }
    
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

function ModalVoice({value,onValueChange}) {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={value}

        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          onValueChange(false)
        }}>
       
        <TouchableOpacity onPress={()=>{console.log('ok'),setValue(false),Voice.destroy()}} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity onPress={()=>{stopSpeechToText(),onValueChange(false)}} style={{alignItems:'center',justifyContent:'center',width:150,height: 150,backgroundColor:'white',elevation:10,borderRadius:100}}>
         <View style={{width:120,height: 120,backgroundColor:'#429b42',borderRadius:100,alignItems:"center",justifyContent:'center',opacity:0.9}}>
         <Icon name='mic' size={100}/>

         </View>
         </TouchableOpacity>
         <Text style={{marginTop:10,color:"black",fontSize:15,elevation:10}}>{results}</Text>
        </TouchableOpacity>
       
      </Modal>
  );
}

  return (
    <View>
      <Text>Value in Component1: {results}</Text>
      <Button title='In Value' onPress={()=>{setValue(true),startSpeechToText()}}/>
      <ModalVoice value={value} onValueChange={setValue}  navigation={navigation} />
    </View>
  );
}
