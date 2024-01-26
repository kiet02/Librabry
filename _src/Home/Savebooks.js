import {View, Text, FlatList, Dimensions, Image,BackHandler, TouchableOpacity, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Icon } from '@rneui/themed';
import { CallSaveBook } from '../Action/CallApi';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';

export default function Savebooks({navigation}) {
  const w = Dimensions.get('screen').width;
  const [data,setData] = useState([])
  const [numColumns, setNumColumns] = useState(2);
  const [refreshing, setRefreshing] = React.useState(false);
  const route = useRoute();
  const {params} = route.params
 useEffect(()=>{

   CallSaveBook(params.idUser.idUser,null).then((e)=>{
    setData(e)
    console.log(e);
  })
 },[])

 const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
    CallSaveBook(params.idUser.idUser,null).then((e)=>{
      setData(e)
      console.log(e);
    })
  }, 2000);
}, []);



  // console.log(data,'sds');
  return (
  <ScrollView
  style={{backgroundColor: 'white',flex:1}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
  

    <View style={{backgroundColor: 'white',flex:1}}>
      <FlatList
        data={data}
        key={numColumns}
        numColumns={numColumns}
        ListHeaderComponent={() => {
          return (
            <View style={{flexDirection:'row',backgroundColor:'white',elevation:1,height:50}}> 
            <Icon onPress={()=>navigation.openDrawer()} name='menu' size={40}/>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 30,
                marginLeft: 10,
              }}>
              Sách đã lưu
            </Text>
            </View>
          );
        }}
        keyExtractor={(index, item) => item.toString()}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity
            onPress={() => navigation.navigate('Book',{uid:item.book.idBook,idUser: params.idUser.idUser,})}
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
                source={{uri: item.book.img}}
                style={{
                  width: 140,
                  height: 150,
                  marginTop: 8,
                  borderRadius: 15,
                }}
              />
              <Text style={{color: 'black'}}>{item.title}</Text>
              <Text>{item.book.name}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
    </ScrollView>
  );
}
