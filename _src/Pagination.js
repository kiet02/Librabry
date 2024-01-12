import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Pagination = ({numberOfElements}) => {
  const page = Array.from({length: numberOfElements}, (_, index) => index + 1);

  const [ipage, setipage] = useState(1);
  const [comment, setcomment] = useState(1);

  function Setpage() {
    return (
      <View style={{flexDirection: 'row'}}>
        
        {page[ipage] > 3 ? <Text style={styles.text}>...</Text> : null}


        {page[ipage - 1] != page[0] && page[ipage - 1] ? (
          <TouchableOpacity
            onPress={() =>
              setipage(page[ipage - 2], setcomment(page[ipage - 1]))
            }>
            <Text style={styles.text}>{`  ${page[ipage - 1]}  `}</Text>
          </TouchableOpacity>
        ) : null}


        {page[ipage] != page[numberOfElements-1]  && page[ipage] ? (
          <TouchableOpacity
            onPress={() => setipage(page[ipage - 1], setcomment(page[ipage]))}>
            <Text style={styles.text}>{`  ${page[ipage]}  `}</Text>
          </TouchableOpacity>
        ) : null}


        {page[ipage + 1] != page[numberOfElements-1] && page[ipage + 1] ? (
          <TouchableOpacity
            onPress={() => {
              setipage(page[ipage]), setcomment(page[ipage + 1]);
            }}>
            <Text style={styles.text}>{`  ${page[ipage + 1]}  `}</Text>
          </TouchableOpacity>
        ) : null}


        {page[ipage] < 18 ? <Text style={styles.text}>...</Text> : null}
      </View>
    );
  }


  return (
    <View style={styles.paginationContainer}>
      <Text style={styles.text}>{' < '}</Text>
      <TouchableOpacity
        onPress={() => {
          setipage(page[0]), setcomment(page[0]);
        }}>
        <Text style={styles.text}>{`  ${page[0]}  `}</Text>
      </TouchableOpacity>

      {Setpage()}

      <TouchableOpacity
        onPress={() => {
          setipage(page[page.length - 2]), setcomment(page[page.length - 1]);
        }}>
        <Text style={styles.text}>{`  ${page[page.length - 1]}  `}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{' > '}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    alignSelf:'center',
    width:'90%',
    height: '92%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor:"red"
  },
  text:{
    color:'black',
    fontSize:16
  }
});

export default Pagination;
