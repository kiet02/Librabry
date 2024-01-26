import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useRef, useState ,useEffect} from 'react'
import { Icon, SearchBar } from 'react-native-elements';
import { data } from '../data';
import { TouchableHighlight } from 'react-native';
import Voice from '@react-native-voice/voice';
import { CallBookAll } from '../Action/CallApi';
import { useRoute } from '@react-navigation/native';
import { ModalAuthor, ModalGenre } from './Modal';



export default function Search({navigation}) {
    const [search,setSearch] = useState('')
    const [started, setStarted] = useState(false);
    const [results, setResults] = useState([]);
    let filteredData =[]
    const [data,setData] = useState([])
    const [genre, setGenre] = useState(false);
    const [author,setAuthor] = useState(false)
    const [value, setValue] = useState(false);
    const route = useRoute();
    const {idUser} = route.params
    console.log(idUser);
  useEffect(() => {
    CallBookAll(null,1000).then((e)=>{setData(e)})

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
    data?.map((even)=>{
   let kt = search.toLocaleLowerCase().includes(even.name.toLocaleLowerCase())

   if(kt){
     if(search.slice(data.lastIndexOf('chuong'))){
       console.log(search,even.idBook,'/',search.slice(data.lastIndexOf('chuong')));
       navigation.navigate('Book',{uid:even.idBook,voice:true,idUser:idUser,chapter:parseInt(search.slice(data.lastIndexOf('chuong')))})
       setSearch('')
       
      //  {uid:item.idBook,idUser:params.idUser.idUser
     }


   }
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

  function ModalVoice({value,onValueChange}) {
    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={value}
  
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            onValueChange(false)
          }}>
         
          <TouchableOpacity onPress={()=>{console.log('ok'),setValue(false),Voice.destroy()}} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity onPress={()=>{stopSpeechToText(),onValueChange(false)}} style={{alignItems:'center',justifyContent:'center',width:150,height: 150,backgroundColor:'white',elevation:10,borderRadius:100,}}>
           <View style={{width:120,height: 120,backgroundColor:'#429b42',borderRadius:100,alignItems:"center",justifyContent:'center',opacity:0.9}}>
           <Icon name='mic' size={100}/>
  
           </View>
           </TouchableOpacity>
           <Text style={{marginTop:10,color:"black",fontSize:15,elevation:10}}>{results}</Text>
          </TouchableOpacity>
         
        </Modal>
    );
  }


    const img ='https://images.pexels.com/photos/1738675/pexels-photo-1738675.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
   
    try {
   
    filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()))
    let kt = search.toLocaleLowerCase().includes(even.name.toLocaleLowerCase())
      console.log(search);
      if(kt){
        if(search.slice(data.lastIndexOf('chuong'))){
          console.log(search,filteredData.idBook,'/',search.slice(data.lastIndexOf('chuong')));
          navigation.navigate('Book',{uid:filteredData.idBook,idUser,chapter:search.slice(data.lastIndexOf('chuong'))})
        }

      
      }
  
    } catch (error) {
      console.log(filteredData.length);
      console.log(error);
    }

  
     
  

  return (
    <View>
      <ModalVoice value={value} onValueChange={setValue}  navigation={navigation} />
      <ModalGenre value={genre} onValueChange={setGenre} navigation={navigation} />
      <ModalAuthor  value={author} onValueChange={setAuthor} navigation={navigation} />
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

        
        <SearchBar
        platform='android'
        placeholder="Type Here..."
        onChangeText={setSearch}
        containerStyle={{ backgroundColor: 'white',width: '90%',borderRadius:20 }}
        value={search}
      />
      <TouchableHighlight style={{backgroundColor:'white',height:65,justifyContent:'center',borderTopRightRadius:20,borderBottomRightRadius:20,position:'absolute',right:4}}>
      <Icon name='mic' size={30} 
      onPress={()=>{
        // !started ?startSpeechToText() : undefined
        // started ? stopSpeechToText() : undefined
        setValue(true),startSpeechToText()
      }}
      />

      </TouchableHighlight>
     
</View>
<View style={{flexDirection:'row'}}>

<TouchableHighlight onPress={()=>setGenre(true)} style={{width:120,height: 40,backgroundColor:'#cccccc',elevation:1,borderRadius:10,alignItems:'center',justifyContent:'center',marginTop:10,marginHorizontal:10}}>
<Text style={{color:'#4c4c4c',fontWeight:'bold',fontSize:17}}>Thể loại</Text>
</TouchableHighlight>

<TouchableHighlight onPress={()=>setAuthor(true)}style={{width:120,height: 40,backgroundColor:'#cccccc',elevation:1,borderRadius:10,alignItems:'center',justifyContent:'center',marginTop:10,marginHorizontal:10}}>
<Text style={{color:'#4c4c4c',fontWeight:'bold',fontSize:17}}>Tác giả</Text>
</TouchableHighlight>

</View>

      <FlatList
      data={filteredData ?filteredData : data}
      numColumns={2}
      key={2}
      style={{marginBottom:60}}
      keyExtractor={(index,item)=>item.toString()}
      renderItem={({index,item})=>{
        return (
            <TouchableOpacity
            onPress={()=>navigation.navigate("Book",{uid:item.idBook,idUser})}
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
              <Text style={{color:'gray'}}>{item.author}</Text>
            </TouchableOpacity>
          );
      }}
      />
      
    </View>
  )
}