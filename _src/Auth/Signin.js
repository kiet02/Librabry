import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Button, ListItem} from '@rneui/themed';
import { Login } from '../Action/CallApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin({navigation}) {
  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, sestPassword] = React.useState('');


useEffect(()=>{
  const getData = async () => {
    console.log('sd');
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');

      if (email !== null && password !== null) {
        Login(email,password).then((e)=>{
          console.log(e);
          if(e.mes === "Đăng nhập thành công"){
            navigation.push("Drawner",{idUser:e.id});
          }else{
            
          Alert.alert("Thông báo","Tài khoản hoặc mật khẩu của bạn không đúng")
          }
          
        })
      }
    } catch (e) {
      // error reading value
    }
  };
  getData()
},[])




const Save = async()=>{
  if(checked){
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      console.log("luu thanh cong");
    } catch (e) {
     console.log(e);
    }
  }
}

const Signin =(email,password)=>{
  if(email == '' || password == ''){
    Alert.alert("Thông báo","Vui lòng nhập tài khoản và mật khẩu của bán")
  }else{
    Save()
    Login(email,password).then((e)=>{
    console.log(e);
    if(e.mes === "Đăng nhập thành công"){
      navigation.push("Drawner",{idUser:e.id});
    }else{
      
    Alert.alert("Thông báo","Tài khoản hoặc mật khẩu của bạn không đúng")
    }
    
  })
  }
  
}



  return (
    <View style={Style.main}>
      <Image source={require('../image/Logo.png')} style={Style.imag} />
      <Text style={{color:'black',marginLeft:30}}>Email:</Text>
      <TextInput style={Style.tinp}    placeholder="Tài khoản"  value={email} onChangeText={(text)=>setEmail(text)} />
      <Text style={{color:'black',marginLeft:30}}>Mật khẩu:</Text>
      <TextInput style={Style.tinp}  placeholder="Mật khẩu" value={password} onChangeText={(text)=>sestPassword(text)} secureTextEntry={true}/>
      <ListItem
        containerStyle={{
          backgroundColor: '#fcf3de',
          marginTop: 1,
          alignSelf: 'center',
        }}>
        <ListItem.CheckBox
          containerStyle={{backgroundColor: '#fcf3de'}}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checked={checked}
          onPress={() => {setChecked(!checked)}}
        />
        <ListItem.Title>Tự động đăng nhập</ListItem.Title>
      </ListItem>
      <Button
        title="LOG IN"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
          alignSelf: 'center',
        }}
        titleStyle={{fontWeight: 'bold'}}
        onPress={() =>{ Signin(email,password),setEmail(''),sestPassword('')}}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text
          style={{fontStyle: 'italic', color: '#0f2c75', alignSelf: 'center'}}>
          Đăng kí tại đây
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const Style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fcf3de',
  },
  imag: {
    width: 400,
    height: 300,
    marginTop: 20,
  },
  tinp: {
    width: 350,
    height: 50,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 1,
    color:'black',
    marginTop:5
  },
});
