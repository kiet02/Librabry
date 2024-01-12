import {View, Text, Dimensions, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';

export default function Carousel() {
  const screenWidth = Dimensions.get('screen').width;
  const [action, setAction] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flarlistRef = useRef();

  useEffect(() => {
    flarlistRef.current.scrollToIndex({
      index: currentIndex,
      animation: true,
    });
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
    }, 3000);
  }, [currentIndex]);
  const data = [
    {
      img: 'https://img.freepik.com/free-vector/hand-drawn-book-club-facebook-post-template_23-2149753873.jpg',
    },
    {
      img: 'https://img.freepik.com/free-vector/flat-world-book-day-horizontal-banner_23-2149327026.jpg',
    },
    {
      img: 'https://img.freepik.com/free-vector/social-media-cover-template-world-book-day-celebration_23-2150181277.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1697587200&semt=ais',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSc0ppGxaHBSmRiB8SRChcgm7kA993bfhaQq6t2k-jG68zmOr7VIo9UBAuTk44E4G46lI&usqp=CAU',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReYOiXM76wQT68wVWKFH15-sIXbW8q7JYezwhheSEFpgBJNQiIxqVxci8EPqutNj9sazI&usqp=CAU',
    },
    {
      img: 'https://images.pexels.com/photos/1738675/pexels-photo-1738675.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ];

  const handlerScroll = event => {
    const position = event.nativeEvent.contentOffset.x;
    const index = (position / screenWidth).toFixed();
    setAction(index);
  };

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });
  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={flarlistRef}
        data={data}
        keyExtractor={(index, item) => item.toString()}
        horizontal={true}
        style={{flexGrow: 0, height: 200}}
        getItemLayout={getItemLayout}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={event => handlerScroll(event)}
        renderItem={({index, item}) => {
          return (
            <View style={{width: screenWidth, alignItems: 'center'}}>
              <Image
                
                source={{uri: item.img}}
                style={{width: '90%', height: 200, borderRadius: 20}}></Image>
            </View>
          );
        }}
      />
    </View>
  );
}
