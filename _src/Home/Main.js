import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Home from './Home'
import Savebooks from './Savebooks'
import User from './User'


export default function Main({navigation}) {
const [movetab,setmovetab]=useState(1)

const Bottomtab =()=>{
  switch (movetab) {
    case 1: 
    return(<Home navigation={navigation}/>)
    case 2:    
    return(<Savebooks navigation={navigation}/>)
    case 3:    
    return(<User navigation={navigation}/>)
  
  
  }
}
  return (
    <View style={{flex:1}}>
      <Bottomtab></Bottomtab>
      <View style={{borderRadius:20,flexDirection:'row',alignItems:'center',justifyContent:'space-around',width: "70%",height:80,backgroundColor:'white',position:'absolute',bottom:20,alignSelf:'center',elevation:1}}>
     <TouchableOpacity onPress={()=>setmovetab(1)}>
      {movetab == 1 ? 
     <Image source={require('../image/home1.png')} style={{width: 30,height: 30,}}/>
      
      : 
      <Image source={require('../image/home0.png')} style={{width: 30,height: 30,}}/>

      }

     </TouchableOpacity>

     <TouchableOpacity onPress={()=>setmovetab(2)}>
     {movetab == 2 ? 
     <Image source={require('../image/bookmark1.png')} style={{width: 30,height: 30,}}/>
      : 
      <Image source={require('../image/bookmark.png')} style={{width: 30,height: 30,}}/>
      }
</TouchableOpacity>

<TouchableOpacity onPress={()=>setmovetab(3)}>
     {movetab == 3 ? 
     <Image source={require('../image/account1.png')} style={{width: 30,height: 30,}}/>
      : 
      <Image source={require('../image/account.png')} style={{width: 30,height: 30,}}/>
      }
</TouchableOpacity>
      </View>
    </View>
  )
}