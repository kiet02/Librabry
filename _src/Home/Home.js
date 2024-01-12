import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableHighlight,
  TouchableNativeFeedback,
  DrawerLayoutAndroid,
  Button,
  Modal,
  Pressable,
  Touchable,
  ScrollView
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Card, Icon} from '@rneui/themed';
import {TouchableOpacity} from 'react-native';
import Search from './Search';
import {useRoute} from '@react-navigation/native';
import Carousel from '../Action/Carousel';
import { CallBookAll } from '../Action/CallApi';


const { width } = Dimensions.get('window');
const previewCount = 3;
const itemWidth = width/(previewCount + 0.5);
const startScroll = (itemWidth * 3/4);

export default function Home({navigation}) {
  const route = useRoute();
  const {params} = route.params
  const flatlistRef = React.useRef();
  const [modalVisible, setModalVisible] = useState(false)
  const [data,setData] = useState([])
    useEffect(()=>{
    
    CallBookAll(null).then((e)=>{setData(e)})

    },[])
    // console.log(params,'sd');



  React.useEffect(() => {
    if (flatlistRef.current) flatlistRef.current.scrollToOffset({
        offset:startScroll, animated: false
    });
}, [flatlistRef]);

const Filler = ({title})=>{
  return(
     <TouchableOpacity style={{width: '95%',height:40,alignSelf:'center',justifyContent:'center',}}
  onPress={()=>{
    setModalVisible(!modalVisible)
    console.log(title);
  }}
  >
  <Text  style={{textAlign:'center'}}>{title}</Text>
  </TouchableOpacity >
  
  )
}
 
const loadMore= ()=>{
  console.log('load more');
}

console.log(params.idUser.idUser);

  return (
    <View style={{}}>
      <Modal

        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            <Filler title={'Ngày tải lên'}/>
          <View style={{width: '80%',height:0.5,backgroundColor:'black'}}/>

          <Filler title={'Lượt xem'}/>
          
          <View style={{width: '80%',height:0.5,backgroundColor:'black'}}/>
          <Filler title={'Đánh giá'}/>
        
        </View>
      </Modal>

      {/* <ScrollView
      showsVerticalScrollIndicator={false}
      > */}

      <FlatList
      data={data}
      keyExtractor={(index,item)=>item.toString()}
      ListHeaderComponent={()=>{
        return(
          <View>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Icon name="menu-open" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Search',{idUser:params.idUser.idUser})}>
              <Icon name="search" size={30} />
            </TouchableOpacity>
          </View>
    
          <View style={styles.carousel}>
          <Carousel/>
          </View>
    
          <View style={styles.body}>
            <View style={{width:'95%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
               <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginLeft: 20,
                color: 'black',
               
              }}>
              Gợi ý 
            </Text>
            </View>
           
    
            <View style={{width: '100%', height: 170,}}>
              <FlatList
                data={data}
                horizontal={true}
                keyExtractor={item => item.idBook}
                pagingEnabled={true}
                style={{flexGrow:0,height:170}}
                snapToAlignment={"center"}
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false}
                renderItem={({index, item}) => {
                  return (
                   <TouchableOpacity style={styles.discover} onPress={()=> navigation.navigate('Book',{uid:item.idBook,idUser:params.idUser.idUser})}>
                    <Image source={{uri:item.img}}
                     style={{width:100,height:100,borderRadius:7}}
                    />
                    <Text style={{color:'black'}}numberOfLines={2}>{item.name}</Text>
                   </TouchableOpacity>
                  );
                }}
              />
            </View>
    
    
            <View style={{width:'95%',alignSelf:'center',justifyContent:'space-between',flexDirection:'row'}}>
    
    
            <Text style={[styles.text,{marginLeft:10}]}>Đề xuất</Text>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginRight:15,}} 
            onPress={()=> setModalVisible(true)}
            >
              <Text>Lọc</Text>
            <Icon name='sort' size={20}/>
    
            </TouchableOpacity>
            </View>
            </View>
            {/* {Data.map((e)=>{
              return(
                <TouchableOpacity style={{flexDirection:'row',elevation:1,backgroundColor:'white',width:'90%',borderRadius:10,height: 100,marginVertical:10,alignSelf:'center',alignItems:'center'}}>
                    <Image source={{uri:img}} style={{width: 90,height: 100,marginRight:10,borderTopLeftRadius:10,borderBottomLeftRadius:10}}></Image>
                <View>
                  <Text style={{color:'black'}}>{e.name}</Text>
                  <Text>{e.author}</Text>
                </View>
                </TouchableOpacity>
              )
            })} */}
          </View>
    
          )
      }}
      ListFooterComponent={()=>{
        return(
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height: 30,}}>
      <View style={{width: '30%',height:0.5,backgroundColor:'black'}}/>
      <Text onPress={()=>loadMore()} style={{marginHorizontal:10}}>Tải thêm</Text>
      <View style={{width: '30%',height:0.5,backgroundColor:'black'}}/>
      </View>
        )
      }}
      renderItem={({index,item})=>{
        return(
          <TouchableOpacity style={{flexDirection:'row',elevation:1,backgroundColor:'white',width:'90%',borderRadius:10,height: 100,marginVertical:10,alignSelf:'center',alignItems:'center'}}
          onPress={()=> navigation.navigate('Book',{uid:item.idBook,idUser:params.idUser.idUser})}
          >
                <Image source={{uri:item.img}} style={{width: 90,height: 100,marginRight:10,borderTopLeftRadius:10,borderBottomLeftRadius:10}}></Image>
            <View>
              <Text style={{color:'black'}}>{item.name}</Text>
              <Text>{item.author}</Text>
            </View>
            </TouchableOpacity>
        )
      }}
      />
      
      {/* </ScrollView> */}

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '95%',
    height: 50,
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carousel:{
    width: '100%',height: 200,justifyContent:'center',alignItems:'center'
  },
  body:{
    marginTop:20,justifyContent:'center'
  },
  mid: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  discover:{
        
        width: 110 , //20 is margin left and right
        margin: 10,
        height: 150,
        borderRadius: 10,
        paddingTop:5,
        alignItems : 'center',
        
  },
  centeredView: {
   width: "100%",height: 150,
   backgroundColor:'white',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:'center',
  position:'absolute',
  bottom:-10,
  borderTopLeftRadius:20,
  borderTopRightRadius:20,
  },

});
