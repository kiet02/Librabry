import { Icon } from '@rneui/themed';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable, Modal, Alert, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { CallAuthor, CallGenre } from '../Action/CallApi';


export  const  ModalGenre =({value, onValueChange,navigation}) => {

  const Anphabet = ["A","B",'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  const [Value,setValue]= useState([])
  const [check,setCheck] =useState()

useEffect(() => {

    CallGenre().then((e)=>{
  setValue(e)
  setCheck(1)
})
}, [check])

  let filteredData =[]
  const [search,setSearch] = useState('')

  filteredData = Value.filter((item) =>
    item.name.toLowerCase().charAt(0).includes(search.toLowerCase()))
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={value}

        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          onValueChange(false)
        }}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <View style={{elevation:10,width:300,height: 400,backgroundColor:'white',borderRadius:40,alignItems:'center'}}>
            <View style={{marginTop:10,backgroundColor:'gray',width:'90%',height: 50,justifyContent:'center',alignItems:'center',borderRadius:100,}}>
                <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                >
                  {
                    Anphabet.map((e)=>{
                      return(
                        <Text onpr key={e} onPress={()=>{setSearch(e)}} style={{color:'black',marginHorizontal:23,alignSelf:'center'}}>{e}</Text>
                      )
                    })
                  }
                </ScrollView>
            </View>
            <View style={{width: '90%',flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                          <Icon onPress={()=>{onValueChange(false)}} name='west' />
                          <Icon onPress={()=>{setSearch('')}} name='block' />


            </View>
            <View style={{width:'90%',height: 295,borderRadius:30,}}>
                <FlatList
                data={filteredData ?filteredData:data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(index,item) => item.toString()}
                renderItem={({index,item})=>{
                  return(
                    <TouchableOpacity onPress={()=>{onValueChange(false),navigation.navigate("Genre",{genre:item.name})}}>
                      <Text style={{color:'black',textAlign:'center',marginVertical:15}}>{item.name}</Text>
                    </TouchableOpacity>
                    
                  )
                }}
                />
            </View>
          </View>
        </View>
      </Modal>
  );
}

export  const ModalAuthor = ({value, onValueChange,navigation}) => {

    const Anphabet = ["A","B",'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const [Value,setValue]= useState([])
    const [check,setCheck] =useState()
  
  useEffect(() => {
  
      CallAuthor().then((e)=>{
    setValue(e)
    setCheck(1)
  })
  }, [check])
  
    let filteredData =[]
    const [search,setSearch] = useState('')
  
    filteredData = Value.filter((item) =>
      item.name.toLowerCase().charAt(0).includes(search.toLowerCase()))
    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={value}
  
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            onValueChange(false)
          }}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{elevation:10,width:300,height: 400,backgroundColor:'white',borderRadius:40,alignItems:'center'}}>
              <View style={{marginTop:10,backgroundColor:'gray',width:'90%',height: 50,justifyContent:'center',alignItems:'center',borderRadius:100,}}>
                  <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  >
                    {
                      Anphabet.map((e)=>{
                        return(
                          <Text onpr key={e} onPress={()=>{setSearch(e)}} style={{color:'black',marginHorizontal:23,alignSelf:'center'}}>{e}</Text>
                        )
                      })
                    }
                  </ScrollView>
              </View>
              <View style={{width: '90%',flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                            <Icon onPress={()=>{onValueChange(false)}} name='west' />
                            <Icon onPress={()=>{setSearch('')}} name='block' />
  
  
              </View>
              <View style={{width:'90%',height: 295,borderRadius:30,}}>
                  <FlatList
                  data={filteredData ?filteredData:data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(index,item) => item.toString()}
                  renderItem={({index,item})=>{
                    return(
                      <TouchableOpacity onPress={()=>{onValueChange(false),navigation.navigate("Author",{name:item.name})}}>
                        <Text style={{color:'black',textAlign:'center',marginVertical:15}}>{item.name}</Text>
                      </TouchableOpacity>

                    )
                  }}
                  />
              </View>
            </View>
          </View>
        </Modal>
    );
  }