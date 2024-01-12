import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CallBookAll } from './Action/CallApi';
import { Rating } from 'react-native-elements';

export default function Test() {
  let data = []
  const [check,setcheck]= useState(false)


  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
  }
  return (
    <View style={{flex:1}}>
      
      <Rating
          type="heart"
          ratingCount={5}
          fractions={1}
          startingValue={1.57}
          imageSize={40}
          onFinishRating={ratingCompleted}
          showRating
      
        />
      
      
    </View>
  )
 
}