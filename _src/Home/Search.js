import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState ,useEffect} from 'react'
import { Icon, SearchBar } from 'react-native-elements';
import { data } from '../data';
import { TouchableHighlight } from 'react-native';
import Voice from '@react-native-voice/voice';
import { CallBookAll } from '../Action/CallApi';
import { useRoute } from '@react-navigation/native';

export default function Search({navigation}) {
    const [search,setSearch] = useState('')
    const [started, setStarted] = useState(false);
    const [results, setResults] = useState([]);
    let filteredData =[]
    const [data,setData] = useState([])
    const route = useRoute();
    const {idUser} = route.params
    console.log(idUser);
  useEffect(() => {
    CallBookAll(null).then((e)=>{setData(e)})

    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechStart = ()=> setStarted(true);
    Voice.onSpeechEnd =()=> setStarted(false);


    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);
  // console.log(data);

  const startSpeechToText = async () => {
    await Voice.start('vi_VI');
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
    // search.blur('');
    console.log(data,'dât');
    
   

   
  };

  if(data){
    data.map((even)=>{
   let kt = search.toLocaleLowerCase().includes(even.name.toLocaleLowerCase())

   if(kt){
     if(search.slice(data.lastIndexOf('chuong'))){
       console.log(search,even.idBook,'/',search.slice(data.lastIndexOf('chuong')));
       navigation.navigate('Book',{uid:even.idBook,idUser:idUser,chapter:search.slice(data.lastIndexOf('chuong'))})
      //  {uid:item.idBook,idUser:params.idUser.idUser
     }
console.log(data);

   }else console.log('sai');
})
 }

  const onSpeechResults = (result) => {
    console.log(data,'sd');
   CallBookAll(null).then((e)=>{setData(e)})

    setResults(result.value[0]);
    setSearch(result.value[0])
   
   
    
  };

  const onSpeechError = (error) => {
    console.log(error);
  };



    const img ='https://images.pexels.com/photos/1738675/pexels-photo-1738675.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
   
    try {
   
    filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()))
    let kt = search.toLocaleLowerCase().includes(even.name.toLocaleLowerCase())
      console.log(search);
      if(kt){
        if(search.slice(data.lastIndexOf('chuong'))){
          console.log(search,filteredData.idBook,'/',search.slice(data.lastIndexOf('chuong')));
          navigation.navigate('Book',{uid:filteredData.idBook,chapter:search.slice(data.lastIndexOf('chuong'))})
        }

  
      }
  
    } catch (error) {
      console.log(filteredData.length);
      console.log(error);
    }

  
     
  

  return (
    <View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

        
        <SearchBar
        platform='android'
        placeholder="Type Here..."
        onChangeText={setSearch}
        containerStyle={{ backgroundColor: 'white',width: '90%',borderRadius:20 }}
        value={search}
      />
      <TouchableHighlight style={{backgroundColor:'white',height:65,justifyContent:'center',borderTopRightRadius:10,borderBottomRightRadius:10}}>
      <Icon name='mic' size={30} 
      onPress={()=>{
        !started ?startSpeechToText() : undefined
        started ? stopSpeechToText() : undefined
      }}
      />

      </TouchableHighlight>
     
</View>
      <FlatList
      data={filteredData ?filteredData : data}
      numColumns={2}
      key={2}

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
                source={{uri: item.img}}
                style={{
                  width: 140,
                  height: 150,
                  marginTop: 10,
                  borderRadius: 20,
                }}
              />
              <Text style={{color: 'black',}} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
              <Text >{item.author}</Text>
            </TouchableOpacity>
          );
      }}
      />
      
    </View>
  )
}