import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/themed';
import Pagination from '../Pagination';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {
  CallBook,
  CallBookAll,
  CallSaveBook,
  Comment,
  Delete,
  getHistory,
} from '../Action/CallApi';
import {Button, Rating} from 'react-native-elements';

export default function Book({navigation}) {
  const route = useRoute();
  const {uid, chapter, idUser} = route.params;

  const [dataValue, setDataValue] = useState({
    idBook: 0,
    name: 'name',
    author: 'author',
    genre: 'genre',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlMZY1F2L96s7TqGJ99-Pbcaa3vRt2NHL7Q&usqp=CAU',
    describe: 'describe',
  });
  const [check, setCheck] = useState(false);
  const [comment, setComment] = useState([]);
  const [upcomment, setupComment] = useState();
  const [rating, setRating] = useState();
console.log(idUser,'ss');
  //  useEffect(()=>{
  //   CallBook(uid).then((e)=>{
  //   setDataValue({
  //     idBook:e[0][0].idBook,
  //     name:e[0][0].name,
  //     author:e[0][0].author,
  //     genre:e[0][0].genre,
  //     img:e[0][0].img,
  //     describe:e[0][0].describe,
  //   })
  //   setComment(e[1]);
  // })
  //  },[])
  useFocusEffect(
    React.useCallback(() => {
      console.log('Component is focused.');
      CallBook(uid).then(e => {
        setDataValue({
          idBook: e[0][0].idBook,
          name: e[0][0].name,
          author: e[0][0].author,
          genre: e[0][0].genre,
          img: e[0][0].img,
          describe: e[0][0].describe,
        });
        setComment(e[1]);
      });
      return () => {
        // Thực hiện các tác vụ khi component mất tập trung (blur).
        console.log('Component is blurred.');

        // Ví dụ: Hủy các tác vụ đang chạy, giải phóng tài nguyên.
        // cancelTasks();
      };
    }, []),
  );

  const handler = () => {
    getHistory(idUser, dataValue.idBook).then(e => {
      if (e === 'error') {
        console.log('error');
        navigation.navigate('Reading', {
          idBook: dataValue.idBook,
          name: dataValue.name,
          chapters: chapter,
          idUser: idUser,
        })
      } else {
        Alert.alert('Gợi ý', 'Bạn có muốn đọc tiếp không', [
          {
            text: 'Cancel',
            onPress: () =>
              navigation.navigate('Reading', {
                idBook: dataValue.idBook,
                name: dataValue.name,
                chapters: chapter,
                idUser: idUser,
              }),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              console.log(e[0].value);
              navigation.navigate('Reading', {
                idBook: dataValue.idBook,
                name: dataValue.name,
                chapters: e[0].chapter,
                idUser: idUser,
                isvalue: e[0].value,
                location: e[0].location,
              });
            },
          },
        ]);
      }
    });
  };

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRating(rating);
  };
  const getComment = () => {
    console.log(idUser, dataValue.idBook, upcomment, rating);
    setupComment('')
    Comment(idUser, dataValue.idBook, upcomment, rating).then((re)=>{
      console.log(re);
      ToastAndroid.showWithGravity(
        `${re}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    })
  };

  if (dataValue.idBook && dataValue.name && chapter) {
    setTimeout(() => {
      handler();
    }, 1000);
  }
  comment.map(e => {});

  CallSaveBook(idUser, null).then(e => {
    e.map(e => {
      if (e.book.idBook === dataValue.idBook) {
        setCheck(true);
      }
    });
  });

  const SaveBook = () => {
    if (!check) {
      return (
        <TouchableOpacity
          onPress={() => {
            CallSaveBook(idUser, dataValue.idBook), setCheck(true);
          }}>
          <Image
            source={require('../image/bookmark.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Lưu ý',
              'Sách đã được lưu, bạn có muốn giữ lại sách không ?',
              [
                {
                  text: 'Giữ lại',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Xóa',
                  onPress: () => {
                    Delete(idUser, dataValue.idBook), setCheck(!check);
                  },
                },
              ],
            );
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/25/25353.png',
            }}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      );
    }
  };

  var indexpage = -1;
  var Data = [];
  const img =
    'https://thuviensach.vn/img/news/2023/10/larger/14694-thuat-xam-sinh-tu-1.jpg?v=7408';

  const data = [
    {
      id: 1,
      name: 'The Hobbit1',
      comment: 'J.R.R Tolkien',
    },
    {
      id: 2,
      name: 'The cubit',
      comment: 'J.R.R Tolkien',
    },
    {
      id: 3,
      name: 'The ngubit',
      comment: 'J.R.R Tolkien',
    },
    {
      id: 4,
      name: 'The vubit',
      comment: 'J.R.R Tolkien',
    },
    {
      id: 5,
      name: 'The tibit',
      comment: 'J.R.R Tolkien',
    },
    // {
    //   id:6,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:7,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:8,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:9,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:0,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:11,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:12,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:13,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:14,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:15,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:16,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:17,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:18,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:19,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:20,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
    // {
    //   id:21,
    //   name: 'The tibit',
    //   comment: 'J.R.R Tolkien',
    // },
  ];
  var index = data.length / 5;
  const Page = () => {
    console.log(indexpage);
    Data = data.slice(indexpage - 5, indexpage);
    console.log(Data);
  };

  const Viewtext = ({headline, info}) => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'black'}}>{headline}</Text>
        <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
          {info}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="keyboard-arrow-left"
              size={30}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: 100,
              justifyContent: 'space-around',
            }}>
            <SaveBook />
            <TouchableOpacity>
              <Icon name="share" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mid}>
          <Image
            source={{
              uri: dataValue.img,
            }}
            style={{
              height: 250,
              width: 200,
              // backgroundColor: 'blue',
              borderRadius: 10,
            }}
          />

          <View
            style={{
              backgroundColor: 'black',
              width: '90%',
              height: 230,
              marginTop: 20,
              borderRadius: 20,
              elevation: 1,
            }}>
            <View
              style={{
                width: '100%',
                height: 160,
                backgroundColor: '#f9f8da',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: 10,
                }}>
                {dataValue.name}
              </Text>
              <Text style={{color: 'black', fontStyle: 'italic'}}>
                {dataValue.author}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 100,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Viewtext headline={'rating'} info={4.5}></Viewtext>
                <Viewtext headline={'chuong'} info={1}></Viewtext>
                <Viewtext headline={'language'} info={'viet'}></Viewtext>
                <Viewtext headline={'Audio'} info={'viet'}></Viewtext>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 70,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handler()}>
                  <Icon name="menu-book" color={'white'} />
                  <Text style={styles.readbook}>Đọc</Text>
                </TouchableOpacity>

                <Text style={{color: 'white'}}>|</Text>

                <TouchableOpacity style={styles.button}>
                  <Icon name="headphones" color={'white'} />
                  <Text style={styles.readbook}>Nghe</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View></View>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              color: 'black',
              fontWeight: '500',
            }}>
            {dataValue.describe}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '90%',
          backgroundColor: '#f5ebd0',
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 20,
          marginBottom: 20,
        }}>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#b8b3a7',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginLeft: 20,
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              marginRight: 10,
            }}>
            Bình luận
          </Text>
          <Text>({comment.length})</Text>
        </View>

        {comment.map(e => {
          return (
            <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
              <Image
                source={{
                  uri: 'https://thuviensach.vn/img/news/2023/10/larger/14694-thuat-xam-sinh-tu-1.jpg?v=7408',
                }}
                style={{height: 30, width: 30, borderRadius: 20}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  {e.User.name}
                </Text>
                <Text style={{color: 'black', fontWeight: '400'}}>
                  {e.comment}
                </Text>
              </View>
            </View>
          );
        })}

        <View style={{height: 40}}>
          <Pagination numberOfElements={Math.ceil(comment.length / 5)} />
        </View>
      </View>
      <View
        style={{
          width: '90%',
          height: 220,
          backgroundColor: 'white',
          alignSelf: 'center',
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          elevation: 10,
          borderRadius: 20,
        }}>
        <Rating
          type="heart"
          ratingCount={5}
          fractions={1}
          startingValue={5}
          imageSize={40}
          onFinishRating={ratingCompleted}
          showRating
          jumpValue={0.5}
          ratingBackgroundColor="#f5ebd0"
        />
        <TextInput
          style={{
            width: '90%',
            height: 40,
            backgroundColor: '#f2f2f2',
            elevation: 2,
          }}
          placeholder="Bình luận"
          value={upcomment}
          onChangeText={(text) =>setupComment(text)}
        />
        <Button
          title="Bình luận"
          buttonStyle={{width: 100}}
          onPress={() => getComment()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    width: '100%',
    height: 60,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mid: {
    width: '100%',
    height: 550,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    width: '90%',
    backgroundColor: '#e7e6e2',
    borderRadius: 20,
  },
  readbook: {
    paddingHorizontal: 10,
    fontSize: 15,
    color: 'white',
  },
  button: {
    width: '50%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
