import React from 'react';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Platform,TextInput,TouchableOpacity,Alert  } from 'react-native';
import { Button } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from "expo-image-manipulator";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedImage2, setSelectedImage2] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const correo = "Admin";
  const contraseña = "1234";

  let openImagePickerAsync = async () => {    
    setSelectedImage2(false)
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
    setSelectedId({localId: pickerResult.assetId})
  }

  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
    await Sharing.shareAsync(imageTmp.uri);
  };

  let regresae = () => {
    setSelectedImage(null)
  }
  let logout = () => {
    setSelectedImage2(null)
  }
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity style={styles.loginBtn2} onPress={openShareDialogAsync}>
          <Text style={styles.loginText}>Compartir.</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.loginBtn} onPress={regresae}>
          <Text style={styles.loginText}>Regresar.</Text>
        </TouchableOpacity> 
      </View>
    );
  }
  if (selectedImage2 !== null) {
    return (
      <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/imagenes.png")} />
      <Text style={styles.instructions}>Comparte una foto con tus amigos</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={openImagePickerAsync}>
        <Text style={styles.loginText}>Elegir una imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn3} onPress={logout}>
          <Text style={styles.loginText}>Cerrar sesion.</Text>
        </TouchableOpacity> 
      <StatusBar style="auto" />
    </View>
    );
  }
  const alertaPW = () =>
    Alert.alert(
      "Ups..",
      "Correo o contraseñas incorrectas",
      [
        { text: "Entendido"}
      ]
    );
  const emailSend = () => {
    if(email.length === 0 || password.length === 0){
      alert("Agregue las credenciales validas")
    }else{
      if(email != correo || password != contraseña){
        //alert("Correo o contraseña incorrecta || Intentelo de nuevo")
        alertaPW()
      }
      else{
        setSelectedImage2(true)
      }
    }
    
    console.log(email)
    setEmail("")
    console.log(password)
    setPassword("")
  }


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/navegador.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Correo o Nombre de usuario"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}
        onPress={() => {
          alert("Nimodos para que la olvidas jj || Admin - 1234")
        }}>Olvidaste tu contraseña? :(</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={() => {
          emailSend();
        }}>
        <Text style={styles.loginText}>Iniciar sesion :)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#581845",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    width:200,
    height:200
  },
 
  inputView: {
    backgroundColor: "#C70039",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    color:'white',
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color:'white'
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFC300",
  },
  loginBtn2 : {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#49DC99",
  },
  loginBtn3 : {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8F0000",
  },
  instructions:{
    fontSize:20,
    color:'white',
    marginBottom: 30
  },
  thumbnail: {
    width: "60%",
    height: "60%",
    resizeMode: "contain"}
});
