import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useRoute } from '@react-navigation/native';

export default function DrawerCustom(props) {
  
  const {name,image} = props.state.routes[0].params.params.idUser
  console.log(name);
  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}
      
      >
        <ImageBackground source={require('./image/bg.jpg')} style={{flexDirection:'row',width: '100%',height:200,alignItems:'flex-end'}}>
        <Image source={{uri:image}}
        style={{width: 50,height: 50,borderRadius:100}}/>
        <Text style={{fontSize:20,color:"black",fontWeight:'bold',marginLeft:10,textAlignVertical:'bottom',alignSelf
        :"flex-end"}}>{name}</Text>

        </ImageBackground>
        
         <DrawerItemList {...props}/>
      </DrawerContentScrollView>
    </View>
  )
}