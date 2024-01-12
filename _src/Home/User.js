import { View, Text, Image, StyleSheet,BackHandler, Modal, Button, TextInput, TouchableOpacity, ToastAndroid, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';

import {launchImageLibrary} from 'react-native-image-picker';
export default function User({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal,setmodal] =useState('')
  
  const route = useRoute();
  const {params} = route.params
  const [img,setImg] = useState(params.idUser.image)
// const [name,setName] = useState(params.idUser.name)
let pass =''
let repass = ''
let checkPass = false
let name = ''

const texInput = (text,chose)=>{
  if(chose==='name'){name = text}
  if(chose === 'password'){pass = text}
  if(chose === 'repass'){repass = text}
}

const updatePass = ()=>{

 
  if(pass.length < 8){
    ToastAndroid.showWithGravity(
      'Mật khẩu phải 8 kí tự trở lên',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  if(repass != pass){
    ToastAndroid.showWithGravity(
      'Mật khẩu nhắc lại không đúng',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
}
const upddateInfo = () =>{
  if(name.length == 0){
    ToastAndroid.showWithGravity(
      'Nhập tên mới',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
}

const SetModal = ()=>{
   if(modal == 'matkhau') return(
    <View style={{flex:1,width: '100%',justifyContent:'center',alignItems:'center'}}>
  <TextInput onChangeText={(t)=>texInput(t,'repass')} placeholder='Mật khẩu mới' style={{width: '70%',marginTop:10,height: 50,borderRadius:20,textAlign:'center',borderWidth:2}}/>
  <TextInput onChangeText={(t)=>texInput(t,'password')} placeholder='Nhắc lại mật khẩu' style={{width: '70%',marginTop:10,height: 50,borderRadius:20,textAlign:'center',borderWidth:2}}/>
  
   <View style={{width: '40%',height:50,backgroundColor:'red',marginTop:10,justifyContent:'center',alignItems:"center",borderRadius:30}}>
  
    <Text onPress={()=> updatePass()} style={{color:'black',fontWeight:'bold',fontSize:20}}>Đổi</Text>
 </View>
   </View>
   )
   if(modal == "image") return(
    <View style={{width: '100%',justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={()=>pickImage()}>
       <Image source={{uri:img}} style={{width: 150,height: 150,marginBottom:20,borderRadius:100,backgroundColor:'red'}}/>
       </TouchableOpacity>
       <TextInput  placeholder={params.idUser.name}  onChangeText={(t)=>texInput(t,'name')} style={{width: '70%',marginTop:10,height: 50,borderRadius:20,textAlign:'center',borderWidth:2}}/>

   <View style={{width: '40%',height:50,backgroundColor:'red',marginTop:10,justifyContent:'center',alignItems:"center",borderRadius:30}}>
    <Text onPress={()=> upddateInfo()} style={{color:'black',fontWeight:'bold',fontSize:20}}>Đổi</Text>
 </View>
   </View>
   )
}
const pickImage = async () => {
  const result = await launchImageLibrary({
    saveToPhotos: false,
    mediaType: 'photo',
    maxWidth: 400,
    maxHeight: 400,
    includeBase64: true,
  });
  setImg(`data:image/png;base64,${result.assets[0].base64}`);
};
  return (
    <View style={{flex:1,backgroundColor:'white'}}>

    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>

<View style={{width: "100%",height: "90%",alignItems:'flex-start',backgroundColor:'#f8f8f8',position:'absolute',bottom:0,elevation:10,borderTopLeftRadius:30,borderTopRightRadius:30}}>
<Icon name='keyboard-arrow-left' size={40} onPress={()=> setModalVisible(false)}/>
 
 <SetModal/>
    
</View>

    </Modal>
    <View style={{width: '100%',alignItems:'flex-start',backgroundColor:'white'}}>
    <Icon name='menu' size={40}  onPress={()=>navigation.openDrawer()}/>

    </View>
    
<View style={{width: '100%',height: 300,backgroundColor:'white',justifyContent:'flex-end',alignItems:'center'}}>
       <TouchableOpacity onPress={()=>{setmodal('image'),setModalVisible(true)}}>
       <Image source={{uri:params.idUser.image}} style={{width: 150,height: 150,borderRadius:100}}/>

       </TouchableOpacity>
      </View>
       <Text style={{color:'black',alignSelf:'center',fontWeight:'bold',fontSize:25,}}>{params.idUser.name}</Text>
    
    
    <Text onPress={()=>{setModalVisible(true),setmodal('matkhau')}} style={styles.text}>Thay đổi mật khẩu</Text>
    <Text onPress={()=> navigation.popToTop()} style={styles.text}>Đăng xuất</Text>


    </View>

  )
}
const styles =  StyleSheet.create({
  text:{
    color:'black',
    marginTop:20,
    backgroundColor:'#ededed',
    paddingVertical:10,
    // paddingLeft:10,
    paddingHorizontal:90,
    borderRadius:20,
    elevation:2,
    // width:'80%',
    alignSelf:'center',
},
})