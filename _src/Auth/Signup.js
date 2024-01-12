import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';
import {Register} from '../Action/CallApi';
import {launchImageLibrary} from 'react-native-image-picker';
export default function Signup({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, sestPassword] = React.useState('');
  const [rePassword, sestRePassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [img, setImg] = React.useState(
    'https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg',
  );
  var isCheck = true;

  var checkPass = false;
  const validate = email => {
    const expression =
      /^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/i;
    return expression.test(String(email).toLowerCase());
  };

  const Handler = () => {
    if (password === rePassword && password != '') {
      Register(email, password, name, img).then(e => {
        if (e === 'Đăng ký thành công') {
          Alert.alert('Thông báo', 'Đăng ký thành công', [
            {
              text: 'Ok',
              onPress: () => {
                setEmail('');
                sestPassword('');
                sestRePassword('');
                setName('');
                navigation.push('Signin');
              },
            },
          ]);
        } else {
          return Alert.alert('Thông báo', 'Tài khoản đã tồn tại');
        }
      });
    } else {
      return Alert.alert(
        'Thông báo',
        'Kiểm trả lại mật khẩu và mật khẩu nhắc lại',
      );
    }
  };
  console.log(password.length);
  if (
    email &&
    password &&
    rePassword &&
    name &&
    password.length >= 8 &&
    validate(email)
  ) {
    isCheck = false;

   
  } else {
    isCheck = true;
  }
  if (password.length >= 8) {
    checkPass = true;
  } else {
    checkPass = false;
  }
  const pickImage = async () => {
    const result = await launchImageLibrary({
      saveToPhotos: false,
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 400,
      includeBase64: true,
    });
    setImg(`data:image/png;base64,${result.assets[0].base64}`);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('../image/Logo.png')} style={Style.imag} />
      <TouchableOpacity onPress={() => pickImage()}>
        <Image
          source={{uri: img}}
          style={{
            width: 140,
            height: 140,
            backgroundColor: 'red',
            borderRadius: 100,
            borderWidth: 3,
            borderColor: 'black',
          }}
        />
      </TouchableOpacity>
      <TextInput
        style={Style.tinp}
        placeholder="Tài khoản"
        value={email}
        onChangeText={t => setEmail(t)}
      />
      {!validate(email) && isCheck && email != '' ? (
        <Text style={{color: 'red', marginLeft: 30}}>
          Định dạnh email không dúng
        </Text>
      ) : null}
      <TextInput
        style={Style.tinp}
        placeholder="Mật khẩu"
        passwordRules={true}
        secureTextEntry={true}
        value={password}
        onChangeText={t => sestPassword(t)}
      />
      {!checkPass && password != ''? (
        <Text style={{color: 'red', marginLeft: 30}}>
          Mật khẩu từ 8 ký tự trở lên
        </Text>
      ) : null}
      <TextInput
        style={Style.tinp}
        placeholder="Nhắc lại mật khẩu"
        passwordRules={true}
        secureTextEntry={true}
        value={rePassword}
        onChangeText={t => sestRePassword(t)}
      />
      <TextInput
        style={Style.tinp}
        placeholder="Tên người dùng"
        value={name}
        onChangeText={t => setName(t)}
      />
      <TouchableOpacity
        style={[
          Style.box,
          {backgroundColor: isCheck ? '"#646770"' : '#b58df1'},
        ]}
        onPress={() => Handler()}
        disabled={isCheck}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
          Đăng ký
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const Style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fcf3de',
  },
  imag: {
    width: 300,
    height: 100,
    marginTop: -100,
    marginBottom: 40,
  },
  tinp: {
    width: 350,
    height: 50,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 1,
    textAlign: 'center',
  },
  box: {
    width: 250,
    height: 50,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
