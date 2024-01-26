import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import {data} from '../data';
import { Icon } from '@rneui/themed';
import database,{ firebase } from '@react-native-firebase/database';
import { CallAuthor } from '../Action/CallApi';
import { useRoute } from '@react-navigation/native';
export default function Author({navigation}) {

  const route = useRoute();
  const {name} = route.params;

  const img ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1cBIYkrtG6iJMkzcB07ubgnW37rRvo3zRA&usqp=CAU'
  const  [dataValue,setDataValue]= useState({
    author: 'author',
    img:img,
    info:'describe'
  })
  const [book,setBook]= useState([])
  useEffect(()=>{
    CallAuthor(name).then((e)=>{
      setDataValue({
        author:e[0].name,
        img:e[0].img,
        info:e[0].info
      })
    
      e.map((value)=>{
        setBook((prevBook) => [...prevBook,value.Author_Book]);
      })
    })
  },[])
  
    return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>

        <Icon name='keyboard-arrow-left' size={40} style={{alignSelf:'flex-start'}}/>
        </TouchableOpacity>
      </View>

      <FlatList
        // key={'-'}
        data={book}
        keyExtractor={item => item.uid}
        numColumns={2}
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={styles.info}>
                <Image source={{uri: dataValue.img}} style={{width: 180, height: 250}} />
                <View
                  style={{
                    marginLeft: 10,
                    width: 200,
                    height: 250,
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>
                    {dataValue.author}
                  </Text>
                 
                </View>
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.describe}>Mô tả</Text>
                <Text style={{backgroundColor:'#f1f1f1',borderRadius:10,color:'gray'}}>
                 {dataValue.info}
                </Text>
              </View>
              <Text style={{color:'black',marginTop:20,fontWeight:'bold',fontSize:25,marginLeft:10}}>Một số tác phẩm</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity
              style={styles.discover}
              onPress={() => navigation.navigate('Book',{uid:item.idBook})}>
              <Image
                source={{uri: item.img}}
                style={{width: 110, height: 130, borderRadius: 7}}
              />
              <Text style={{color: 'black'}} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  info: {
    marginLeft: 10,
    width: '100%',
    height: 250,
    alignItems: 'center',
    flexDirection: 'row',
   
  },
  header: {
    width: '100%',
    height: 50,

  },
  describe: {
    marginTop:20,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  discover:{
    width: 170 , //20 is margin left and right
    margin: 10,
    height: 150,
    borderRadius: 10,
    paddingTop:5,
    alignItems : 'center',
    
    
},
});
