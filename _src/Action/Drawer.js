import { View, Text,DrawerLayoutAndroid, Button, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import React, {useRef, useState} from 'react';


export default function Drawer() {
  return (
  <View style={styles.container}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}} style={{width: 50,height: 50,borderRadius:50}}/>
    <Text style={{color:'black',marginLeft:10,fontWeight:'bold',fontSize:18}}>Tên người dùng</Text>
    </View>
    <Text onPress={()=>navigation.navigate("Savebook")} style={styles.text}>Sách đã lưu</Text>
    <Text style={styles.text}>Tài khoản</Text>

  </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
      padding: 16,
    },
    text:{
        color:'black',
        marginTop:20,
        backgroundColor:'#ededed',
        paddingVertical:10,
        paddingLeft:10,
        borderRadius:20,
        elevation:2
    },
   
    paragraph: {
      padding: 16,
      fontSize: 15,
      textAlign: 'center',
    },
  });
  