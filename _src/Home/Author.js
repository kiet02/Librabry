import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import {data} from '../data';
import { Icon } from '@rneui/themed';
import database,{ firebase } from '@react-native-firebase/database';
import { CallAuthor } from '../Action/CallApi';
export default function Author({navigation}) {
  const img ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1cBIYkrtG6iJMkzcB07ubgnW37rRvo3zRA&usqp=CAU'
  const  [dataValue,setDataValue]= useState({
    author: 'author',
    img:img,
  })
  const [book,setBook]= useState([])
  useEffect(()=>{
    CallAuthor('Phong Kiên').then((e)=>{
      setDataValue({
        author:e[0].name,
        img:e[0].img
      })
      e.map((value)=>{
        setBook((prevBook) => [...prevBook,value.Author_Book]);
      })
    })
  },[])
  console.log(book,'book');
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
                  <Text style={{color: 'black'}}>Sinh ngày: 31/5/1919</Text>
                  <Text style={{color: 'black'}} numberOfLines={3}>
                    Quê quán:làng Ân Phú, huyện Hương Sơn, tỉnh Hà Tĩnh
                  </Text>
                </View>
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.describe}>Mô tả</Text>
                <Text style={{backgroundColor:'#f1f1f1'}}>
                  uy Cận sinh ngày 31 tháng 5 năm 1919, trong một gia đình nhà
                  nho nghèo gốc nông dân dưới chân núi Mồng Gà, bên bờ sông Ngàn
                  Sâu (thượng nguồn sông La) ở làng Ân Phú, huyện Hương Sơn sau
                  đó thuộc huyện Đức Thọ (nay là xã Ân Phú, huyện Vũ Quang),
                  tỉnh Hà Tĩnh. Ngày sinh hiện nay là do ông của cậu khai khi
                  vào học ở Huế, còn ngày sinh chính xác là ngày 29 tháng 12 năm
                  Bính Thìn (dương lịch là ngày 22 tháng 1 năm 1917)[3]. Ông lúc
                  nhỏ học ở quê, sau vào Huế học trung học, đậu tú tài Pháp; rồi
                  ra Hà Nội học trường Cao đẳng Canh nông. Trong thời gian học
                  Cao đẳng, ông ở phố Hàng Than cùng với Xuân Diệu. Từ năm 1942,
                  ông tham gia phong trào sinh viên yêu nước và Mặt trận Việt
                  Minh, Huy Cận đã tham dự Quốc dân đại hội ở Tân Trào (tháng 8
                  năm 1945) và được bầu vào Ủy ban Giải phóng (tức Chính phủ
                  Cách mạng lâm thời sau đó). Huy Cận cũng từng cộng tác với
                  nhóm Tự Lực Văn Đoàn.
                </Text>
              </View>
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
    fontSize: 20,
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
