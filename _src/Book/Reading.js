import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Icon} from '@rneui/themed';
import {Slider} from 'react-native-elements';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {data} from '../data';
import {CallChapter, getHistory, setHistory} from '../Action/CallApi';

// import { data } from '../data';

// import Animated from 'react-native-reanimated';

export default function Reading({navigation}) {
  const [value, setValue] = useState(15);
  const [modalVisible, setModalVisible] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ content,setcontent] = useState([])
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const route = useRoute();
  const {idBook, chapters, name,idUser,isvalue,location} = route.params;
  const scrollViewRef = useRef(null);
// console.log(idBook,chapters,name);
  // useEffect(() => {
  //   CallChapter(idBook).then(e => {
  //     setInfo(e), setChapter(chapter + 1);
  //     // setcontent((pre)=>[...pre,e])
  //     e.map((value)=>{
  //       setcontent((pre)=>[...pre,value.content])
  //     })
  //   });
  //   if(chapters){setChapter(chapters)}

  //   return console.log('sđsss');
  // }, [chapters]);
console.log(isvalue,"s",location);
  useFocusEffect(
    React.useCallback(() => {
      console.log('Component is focused.');
      CallChapter(idBook).then(e => {
        setInfo(e), setChapter(chapter + 1),setValue(isvalue),setScrollPosition(location)

        e.map((value)=>{
          setcontent((pre)=>[...pre,value.content])
        })
       
        scrollViewRef?.current?.scrollTo({ y:parseInt(location), animated: true })
       
      });

      if(chapters){setChapter(chapters)}
      
      
    }, []))

    console.log(info.length);
    

    // setHistory(idUser,idBook,scrollPosition,chapter,value)
    // console.log(value);

  setTimeout(() => {
    setLoading(true);
    if(chapters)
    setChapter(chapters)
  }, 1500);
 

  // sd
  const scrollY = useRef(new Animated.Value(0)).current;

  const animaheight = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 200],
    extrapolate: 'clamp',
  });

  const handleScroll=(e) =>{
    scrollY.setValue(e.nativeEvent.contentOffset.y);
    setScrollPosition(Math.round( scrollY._value))
    console.log(scrollPosition,'location')
    
  }
  const handleLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    setViewHeight(Math.round(height) - 679);
    console.log('View height:', viewHeight);
  }

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Text
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{textAlign: 'right', marginRight: 10, marginTop: 10}}>
            {' '}
            X{' '}
          </Text>

          <ScrollView>
            {info.map(e => {
              return (
                <TouchableOpacity>
                  <Text
                    onPress={() => setChapter(data.indexOf(e.chapter))}
                    style={{textAlign: 'center', marginVertical: 10}}>
                    {e.chapter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>

      <View style={{width: '100%', height: 60, backgroundColor: '#eaeaea'}}>
        <View
          style={{
            width: '100%',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="keyboard-arrow-left" size={40}></Icon>
          </TouchableOpacity>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
            {name}
          </Text>
          <Icon name="more-vert" size={40}></Icon>
        </View>
      </View>
      {!loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View style={{flex:1}}>
          <View style={{backgroundColor: '#eaeaea'}}>
            <View
              style={{
                alignSelf: 'center',
                width: '95%',
                height: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text
                onPress={() => {
                  chapter > 1 ? setChapter(chapter - 1) : null;
                }}
                style={{textAlign: 'center'}}>
                {'<'}
              </Text>
              <Text
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{textAlign: 'center'}}>
                chuong:{chapter}/{info.length}
              </Text>
              <Text
                onPress={() => {
                  chapter <= info.length - 1 ? setChapter(chapter + 1) : null;
                }}
                style={{textAlign: 'center'}}>
                {'>'}
              </Text>
            </View>
          </View>
          <View style={{width: '100%',flex:1}}>


            <Animated.ScrollView
             ref={scrollViewRef}
              scrollEventThrottle={16}
              onScroll={e =>handleScroll(e)
              }
              >
                <View onLayout={handleLayout} >
                  <Text style ={{width: '95%',alignSelf:'center',borderRadius:10,backgroundColor:'white',color:'black',fontWeight:'400',textAlign:'center',fontSize:value}}>
          {content[chapter-1]}
        </Text>
                </View>
              
            </Animated.ScrollView>


            <Animated.View
              style={{
                width: '95%',
                height: 50,
                backgroundColor: '#ffeca0',
                elevation: 1,
                position: 'absolute',
                justifyContent: 'center',
                bottom: 120,
                borderRadius: 20,
                alignSelf: 'center',
                transform: [{translateY: animaheight}],
              }}>
              <Slider
                value={value}
                onValueChange={setValue}
                maximumValue={20}
                minimumValue={15}
                step={0.5}
                allowTouchTrack
                style={{width: '90%', alignSelf: 'center'}}
                trackStyle={{height: 5, backgroundColor: 'transparent'}}
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: 'transparent',
                }}
                thumbProps={{
                  children: (
                    <Icon
                      name="heartbeat"
                      type="font-awesome"
                      size={20}
                      reverse
                      containerStyle={{bottom: 20, right: 20}}
                    />
                  ),
                }}
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.actionbutton,
                {bottom: 40, left: 10, transform: [{translateY: animaheight}]},
              ]}>
              <Icon name="headphones" size={35} />
            </Animated.View>

            <Animated.View
              style={[
                styles.actionbutton,
                {
                  bottom: 40,
                  alignSelf: 'center',
                  transform: [{translateY: animaheight}],
                },
              ]}>
              <Icon name="abc" size={60} />
            </Animated.View>
            <Animated.View
              style={[
                styles.actionbutton,
                {
                  bottom: 40,
                  alignSelf: 'flex-end',
                  right: 10,
                  transform: [{translateY: animaheight}],
                },
              ]}>
              <Icon name="dark-mode" size={40} />
            </Animated.View>
            
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  actionbutton: {
    width: 100,
    height: 60,
    backgroundColor: '#ffeca0',
    borderRadius: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  centeredView: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    //  justifyContent: 'center',
    //  alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
