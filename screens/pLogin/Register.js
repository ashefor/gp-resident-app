import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, SafeAreaView, Image, ActivityIndicator, Dimensions,StyleSheet, Modal, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Form, Label, Body, Text, Picker, Left, Right, Card, CardItem, ListItem } from 'native-base';
import { withNavigation } from 'react-navigation';

import { useForm } from "react-hook-form";
import firebase from 'firebase';

import { Flex, Button, Toast } from '@ant-design/react-native/lib';

// import countries from '../assets/data/countries';
// import countriesPhone from '../assets/data/countriesPhone';
import AppColours from '../constants/Colors';
const { pBlue } = AppColours;
// Default render of country flag
const { width, height } = Dimensions.get('window');

const defaultFlag = countriesPhone.filter(
  obj => obj.name === 'Nigeria'
  )[0].flag
const defaultCode = countriesPhone.filter(
  obj => obj.name === 'Nigeria'
  )[0].dial_code

const defaultValue = countriesPhone.filter(
  obj => obj.name === 'Nigeria'
  )[0].name

function Register(props) {
  const { register, setValue, handleSubmit, errors } = useForm();
  const [ countryModalVisible, setCountryModalVisible ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(false);
  const [ country, setCountry ] = React.useState(null);
  const [ countryFlag, setCountryFlag ] = React.useState(defaultFlag);
  const [ countryValue, setCountryValue ] = React.useState(defaultValue);
  const [ countryCode, setCountryCode ] = React.useState(defaultCode);

  const onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
    console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
  };
  const onSubmit = async data => {
    setLoading(true);
    var database = firebase.database();
    const { firstName, lastName, phone, referalCode, email, password } = data;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async res => {
      var user = firebase.auth().currentUser;
      var userId = user.uid;
      await firebase.database().ref('users/' + userId).set({
        firstName,
        lastName,
        email,
        countryCode: countryCode,
        phoneNumber: phone,
        phone,
        referalCode: referalCode ? referalCode : null,
        country: countryValue
      });
      
      Toast.success('Welcome to Stow '+firstName);
      props.navigation.navigate('Main');
      await user.sendEmailVerification()
      .then(function() {
        // Email sent.
        Toast.success('Check your email address '+email);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Toast.fail(errorMessage);
      });
      setLoading(false);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      Toast.fail(errorMessage);
    });
    setLoading(false);
  }

  const showCountryModal = () => {
    setCountryModalVisible(true);
  }
  const hideCountryModal = () => {
    setCountryModalVisible(false);
  }

  async function selectCountry(country) {
    // Get data from Countries.js  
    // const countriesPhone = await data;
    try {
      // Get the country code
      const countryCode = await countriesPhone.filter(
        obj => obj.name === country
      )[0].dial_code
      // Get the country flag
      const countryFlag = await countriesPhone.filter(
        obj => obj.name === country
      )[0].flag
      const countryValue = await countriesPhone.filter(
        obj => obj.name === country
      )[0].name
      // Update the state then hide the Modal
      setCountryCode(countryCode);
      setCountryFlag(countryFlag);
      setCountryValue(countryValue);
      await hideCountryModal();
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <KeyboardAvoidingView 
      style={styles.containerAvoiding}
          behavior="padding"
        >

      <Header
      style={{
            backgroundColor: '#f5f7f7',
          }}
      >
        <Text
        style={{
          alignSelf: 'center',
        }}
        >
          Already have an account ?
        </Text>

        <Button
          type="ghost"
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            borderWidth: 0,
          }}
          onPress={ () => props.navigation.navigate('Login') }
        >
          <Text
            style={{
              color: pBlue,
            }}
          >{`Login >`}</Text>
        </Button>
        </Header>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <Card
           style={styles.card}
          >
        <Text
        style={{
          alignSelf: 'center',
          marginBottom: 8,
          color: pBlue,
        }}
        >
          Register New Account
        </Text>
        <Form
    			style={{ 
        		paddingHorizontal: 30,
        	}}
        >
          <Item regular style={styles.input}>
            <Input placeholder='First Name'
              name="firstName"
              ref={register({ name: 'firstName'}, { required: true })}
              onChangeText={text => setValue('firstName', text, true)}
            />
            {errors.firstName && <Text style={{color: 'red'}}>Required</Text>}
          </Item>
           <Item regular style={styles.input}>
            <Input placeholder='Last Name'
              name="lastName"
              ref={register({ name: 'lastName'}, { required: true })}
              onChangeText={text => setValue('lastName', text, true)}
            />
            {errors.lastName && <Text style={{color: 'red'}}>Required</Text>}
          </Item>
           <Item regular style={styles.input}>
            <Input placeholder='Email Address'
              name="email"
              ref={register({ name: 'email'}, { required: true })}
              onChangeText={text => setValue('email', text, true)}
            />
            {errors.email && <Text style={{color: 'red'}}>Required</Text>}
          </Item>
          {/* Phone input with native-base */}          
        <Item rounded style={[styles.input, {
          height: 54
        }]}>
          <Left>
            <View>
              <Text
                onPress={showCountryModal}
              >
                {countryFlag}
              </Text>
            </View>
          </Left>
            <View>
              <Text
                onPress={showCountryModal}
              >
                {countryValue}
              </Text>
            </View>
          <Right>
          <Icon
            active
            name='md-arrow-dropdown'
            style={[styles.iconStyle, { marginLeft: 0 }]}
            onPress={showCountryModal}
            />
          </Right> 
           
            <Modal
              animationType="slide"
              transparent={false}
              visible={countryModalVisible}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 7, marginTop: 80 }}>
                  {/* Render the list of countries */}
                  <FlatList
                    data={countriesPhone}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                      ({ item }) =>
                        <TouchableWithoutFeedback onPress={() => selectCountry(item.name)}>
                          <ListItem style={styles.countryStyle}>
                            <Text style={styles.textStyle}>
                              {item.flag} {item.name} ({item.dial_code})
                            </Text>
                          </ListItem>
                        </TouchableWithoutFeedback>
                    }
                  />
                </View>
                <TouchableOpacity
                  onPress={hideCountryModal}
                  style={styles.closeButtonStyle}>
                  <Text style={styles.textStyle}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
        </Item>

          <Item regular style={styles.input}>
              <Text
                style={{
                  paddingRight: 8,
                }}
              >{countryCode}</Text>
             <Input
                  type="tel"
                  placeholder='Phone Number'
                  name="phone"
                  ref={register({ name: 'phone'}, { required: false })}
                  onChangeText={text => setValue('phone', text, true)}
                  style={{
                    borderLeftColor: '#b3b3b3',
                    borderLeftWidth: 1,
                    alignSelf: 'flex-start',
                  }}
                  />
            </Item>
            <Item regular style={styles.input}>
              <Input 
                placeholder='Referal Code (optional)'
                name="referalCode"
                ref={register({ name: 'referalCode'}, { required: false })}
                onChangeText={text => setValue('referalCode', text, true)}
              />
            </Item>
            <Item regular style={styles.input} >
              <Input 
                placeholder='Password'
                secureTextEntry={true}
                name="password"
                ref={register({ name: 'password'}, { required: true })}
                onChangeText={text => setValue('password', text, true)}
              />
              {errors.password && <Text style={{color: 'red'}}>Required</Text>}
            </Item>
          </Form>
          <View 
          	style={{
          		marginTop: 0,
              alignItems:'center',
          	}}
          	>
          <Button
            style={[styles.authButton, styles.blueButton]}
          	onPress = {handleSubmit(onSubmit)}
          >
            {!loading ? <Text
              style={{
                color: '#fff',
              }}
              >REGISTER</Text> : <ActivityIndicator color="#fff" />}
          </Button>
          </View>
        </Card>
       
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default withNavigation(Register);


const styles = StyleSheet.create({
  containerAvoiding: {
    flex: 1,
    paddingTop: 21,
    // backgroundColor: '#EEEEEE',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 16,
    marginHorizontal: 33,
  },
  input: {
    borderRadius: 8,
    margin: 8,
    paddingHorizontal: 12,
  },
  text: {
    textAlign: 'center',
    margin: 8,
    height: 75
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
    authButton: {
    marginVertical: 12,
    borderRadius: 30,
    width: width*0.81,
    justifyContent: 'center',
  },
  greyButton: {
    backgroundColor: '#b3b3b3',
  },
  blueButton: {
    backgroundColor: pBlue,
  },
});

