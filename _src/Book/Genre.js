import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import axios from 'axios'
import { CallGenreParam } from '../Action/CallApi'

export default function Genre({navigation}) {
    const route = useRoute()
    const {genre} = route.params
    const [data,setData]=useState([])
    const [check,setCheck] =useState()


   

    useEffect(()=>{
        CallGenreParam(genre).then((e)=>{
            setData(e)
        })
    setCheck(1)
    },[check])
  return (
    <View style={{flex:1}}>
        <View style={{alignItems:'center',flexDirection:'row',width:'95%',height: 60,alignSelf:'center'}}>
        <Icon name='west' onPress={()=>navigation.goBack()} />
        <Text style={{marginLeft:10,color:'black',fontWeight:'bold',fontSize:20}}>{genre}</Text>
        </View>
        <View style={{flex:1}}>
        <FlatList
      data={data}
      numColumns={2}
      key={2}
      style={{marginBottom:60}}
      keyExtractor={(index,item)=>item.toString()}
      renderItem={({index,item})=>{
        return (
            <TouchableOpacity
            onPress={()=>navigation.navigate("Book",{uid:item.idBook})}
              style={{
                width: '40%',
                height: 200,
                marginHorizontal: 20,
                marginVertical: 20,
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor:'white',
                elevation:1
              }}>
              <Image
                source={{uri: item.Genre_Book.img}}
                style={{
                  width: 140,
                  height: 150,
                  marginTop: 10,
                  borderRadius: 20,
                }}
              />
              <Text style={{color: 'black',}} numberOfLines={1} ellipsizeMode='tail'>{item.Genre_Book.name}</Text>
              <Text style={{color:'gray'}}>{item.Genre_Book.author}</Text>
            </TouchableOpacity>
          );
      }}
      />
        </View>
    </View>
  )
}