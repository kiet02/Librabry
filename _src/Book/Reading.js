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
  LayoutAnimation,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Icon, Slider} from '@rneui/themed';

import {useFocusEffect, useRoute} from '@react-navigation/native';

import {CallChapter, getHistory, setHistory} from '../Action/CallApi';
import Sound from 'react-native-sound';

export default function Reading({navigation}) {
  const route = useRoute();

  const {idBook, chapters, name, idUser, isvalue, location, choses} =
    route.params;

  const [value, setValue] = useState(15);
  const [modalVisible, setModalVisible] = useState(false);
  const [chapter, setChapter] = useState(parseInt(chapters) - 1);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setcontent] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState();
  const [chose, setChose] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [aread, setAread] = useState(0);
  const [aplay, setAplay] = useState(-200);
  const [play, setPlay] = useState(true);
  const [h, setH] = useState(0);
  const [vt, setVt] = useState(0);
  const [vb, setVb] = useState(0);
  const [height, setHeight] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollViewRef2 = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
 
  const Play = () => {
    if (audio) {
      audio.release();
    }
    let Audio = new Sound(info[chapter - 1].mp3, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      setDuration(Audio.getDuration());
      setAudio(Audio);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      CallChapter(idBook).then(e => {
        setInfo(e),
          setChapter(chapter + 1),
          setValue(isvalue),
          setScrollPosition(location);
        e.map(value => {
          setcontent(pre => [...pre, value.content]);
        });
        scrollViewRef2?.current?.scrollTo({
          y: parseInt(location),
          animated: true,
        });
      });

      if (chapters) {
        setChapter(chapters);
      }
      setTimeout(() => {
        if (choses) {
          setChose(choses), setBottom();
        }
      }, 1000);
    }, []),
  );

  useEffect(() => {
    if (info.length > 0) {
      console.log(info[0].mp3);
      Play(info);
    }
  }, [info]);

  if (chapter == info.length && scrollPosition >= height - 1000) {
  
    setHistory(idUser, idBook, scrollPosition, chapter, value, 1);
  } else {
    setHistory(idUser, idBook, scrollPosition, chapter, value, 0);
  }

  useEffect(() => {
    if (audio) {
      let id = setInterval(() => {
        audio.getCurrentTime((second, play) => {
          setcurrentTime(second);
          scrollViewRef?.current?.scrollTo({
            y: parseInt(second * (height / duration)),
            animated: true,
          });
        });
      }, 1000);
    }
  }, [audio]);

  const handleScroll = e => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
    setScrollPosition(Math.round(scrollY._value));
  };

  const handleLayout = event => {
    const height = event.nativeEvent.layout.height;
    setViewHeight(Math.round(height) - 679);
    setHeight(height);
  };

  const animaheight = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 200],
    extrapolate: 'clamp',
  });

  const setBottom = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!chose) {
      setAread(0);
      setAplay(-300);
      setH(0);
      setVt(0);
      setVb(0);
      if (audio) {
        audio.pause();
      }
    } else if (chose) {
      setAread(-300);
      setAplay(40);
      setVt(30);
      setVb(210);
      setH(30);
      if (audio) {
        audio.play();
      }
    }
  };

  const action = () => {
    if (play) {
      audio.pause();
    } else audio.play();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#4c4c4c'}}>
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
            style={{
              textAlign: 'right',
              marginRight: 10,
              marginTop: 10,
              color: 'gray',
            }}>
            {' '}
            X{' '}
          </Text>
          <FlatList
            data={info}
            keyExtractor={(index, item) => item.toString()}
            renderItem={({index, item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setChapter(item.chapter), setTimeout(() => {}, 1000);
                  }}>
                  <View style={{width: '100%', height: 50}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginVertical: 10,
                        color: 'gray',
                      }}>
                      Chuong {item.chapter}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
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
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              if (audio) {
                audio.release();
              }
            }}>
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
        <View style={{flex: 1}}>
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
                style={{textAlign: 'center', color: 'gray'}}>
                {'<'}
              </Text>
              <Text
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{textAlign: 'center', color: 'gray'}}>
                chuong:{chapter}/{info.length}
              </Text>
              <Text
                onPress={() => {
                  chapter <= info.length - 1 ? setChapter(chapter + 1) : null;
                }}
                style={{textAlign: 'center', color: 'gray'}}>
                {'>'}
              </Text>
            </View>
          </View>

          <View style={{width: '100%', flex: 1}}>
            <Animated.ScrollView
              ref={chose == true ? scrollViewRef2 : scrollViewRef}
              scrollEventThrottle={16}
              style={{
                marginHorizontal: h,
                marginTop: vt,
                marginBottom: vb,
                borderRadius: vt + 10,
                elevation: 10,
              }}
              onScroll={e => handleScroll(e)}>
              <View onLayout={handleLayout}>
                <Text
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 10,
                    backgroundColor: darkMode ? '#dab71c' : 'white',
                    color: 'black',
                    fontWeight: '400',
                    textAlign: 'center',
                    fontSize: value,
                  }}>
                  {content[chapter - 1]}
                </Text>
              </View>
            </Animated.ScrollView>

            <View style={{bottom: aread}}>
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
                  {
                    bottom: 40,
                    left: 10,
                    transform: [{translateY: animaheight}],
                  },
                ]}>
                <Icon
                  name="headphones"
                  size={35}
                  onPress={() => {
                    setChose(!chose), setBottom();
                  }}
                />
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
                <Icon
                  name="dark-mode"
                  size={40}
                  onPress={() => setDarkMode(!darkMode)}
                />
              </Animated.View>
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: aplay,
                width: '95%',
                height: 160,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  backgroundColor: '#ffeca0',
                  borderRadius: 20,
                }}>
                <Text style={{color: 'black'}}>{`${Math.floor(
                  currentTime / 60,
                )}:${Math.floor(currentTime % 60)}`}</Text>
                <Slider
                  value={currentTime}
                  onValueChange={va => audio.setCurrentTime(va)}
                  step={10}
                  minimumValue={0}
                  maximumValue={duration}
                  trackStyle={{
                    width: 230,
                    height: 5,
                    backgroundColor: 'transparent',
                  }}
                  thumbStyle={{height: 20, width: 20, backgroundColor: 'black'}}
                />
                <Text style={{color: 'black'}}>{`${Math.floor(
                  duration / 60,
                )}:${Math.floor(duration % 60)}`}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: 100,
                    height: 55,
                    borderRadius: 20,
                    backgroundColor: '#ffeca0',
                    justifyContent: 'center',
                  }}>
                  <Icon name="skip-previous" size={40} />
                </View>

                <View
                  style={{
                    width: 100,
                    height: 55,
                    borderRadius: 20,
                    backgroundColor: '#ffeca0',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name={!play ? 'play-arrow' : 'pause'}
                    size={40}
                    onPress={() => {
                      setPlay(!play);
                      action();
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 100,
                    height: 55,
                    borderRadius: 20,
                    backgroundColor: '#ffeca0',
                    justifyContent: 'center',
                  }}>
                  <Icon name="skip-next" size={40} />
                </View>
              </View>
              <View
                style={{
                  width: '90%',
                  height: 55,
                  borderRadius: 20,
                  backgroundColor: '#ffeca0',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Icon
                  name="abc"
                  size={40}
                  onPress={() => {
                    setChose(!chose), setBottom();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  actionbutton: {
    width: 160,
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
