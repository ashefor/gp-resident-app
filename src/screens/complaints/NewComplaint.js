import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, TouchableWithoutFeedback, Picker, Text } from 'react-native';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import { Feather, } from '@expo/vector-icons';

import { CheckBox  } from 'react-native-elements'
import { Toast, } from '@ant-design/react-native';
import { Controller, useForm } from 'react-hook-form'
import firebase from "firebase";
import firestore from "firebase/firestore";

const { width, height } = Dimensions.get('window')


function successToast() {
  Toast.success('Success', 2);
}
function failToast() {
  Toast.fail('Something failed! Please try again or contact an admin',3);
}
function offline() {
  Toast.offline('Network connection seems to be having issues!',3);
}
function loadingToast() {
  Toast.loading('Loading...', 2, () => {
    console.log('Load complete!');
  });
}

function successToastCopied() {
  Toast.success('Code copied to your clipboard', 2);
}

const NewComplaint = props => {

    const { navigation } = props;
    const { register, handleSubmit, watch, control, errors, setValue, getValues  } = useForm();
    const [ loading, setLoading ] = React.useState(false);
    const [ currentUser, setCurrentUser ] = React.useState(null);
    const [ type, setType ] = React.useState('Type');
    const [ showType, setShowType ] = React.useState(false);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
      } else {
        // No user is signed in.
      }
    });

    const onChange = args => {
        return {
          value: args[0].nativeEvent.text,
        };
    };

    const toggleType = () => {
        setShowType(!showType);
    }
    const selectType = (itemValue) => {
        setType(itemValue);
        setValue('type',itemValue,true);
        setShowType(false);
    }

    const onSubmit = async data => { 
        if (data['type'] == 'Type' || !data['type']) {
            alert('Please select the type of complaint');
            return false;
        }
        setLoading(true);
        const db = firebase.firestore();
        loadingToast();
        const { uid } = currentUser;
        
        let dateCode = Date.now()+'';
        let docId = dateCode.substring(5,)+'GPComplaint'+uid;
        data['_id'] = docId;
        data['uid'] = uid;
        data['status'] = 'pending';
        data['resolved'] = false;
        data['issueDate'] = new Date();
        data['completionDate'] = null;
        data['comments'] = [];

        let addDoc = await db.collection('complaints').add(data)
        .then( () => {
            successToast();
        })
        .catch( e => {
            console('GatePass Creation error');
            console.log(e);
            failToast();
            setLoading(false);
        });
        props.navigation.navigate('Complaints');
    }

    return (
        <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
            <SafeAreaView style={StyleSheet.absoluteFillObject}>
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <Header navigation={navigation} />
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={styles.middleBlock}>
                            <Input 
                                placeholder='Title' 
                                ref={ register({ name: 'title'},{ required: true}) }
                                name="title"
                                onChangeText={text => setValue('title', text, true)}
                                style={{ marginTop: resHeight(1.5) }} 
                            />
                            {errors.title && <Text style={styles.errorMessage}>Required.</Text>}    
                           
                            <TouchableWithoutFeedback 
                                onPress={toggleType} 
                                style={{ backgroundColor: 'red', width: '100%',  }}
                            >
                                <View
                                    style={{width: '100%', marginTop: resHeight(1.5) }}
                                >
                                    <View style={styles.pickerContainer}>
                                        <Text allowFontScaling={false}    style={styles.pickerContainerText}>{type}</Text>
                                        <Feather name={showType ? 'chevron-up' : 'chevron-down'} size={25} />
                                    </View>

                                    {showType && (
                                        <Picker
                                        style={{ height: resHeight(25), justifyContent: 'center' }}
                                        selectedValue={type}
                                        ref={ register({ name: 'type'},{ required: true}) }
                                        onValueChange={itemValue =>
                                            {
                                                selectType(itemValue);
                                            }
                                        }>
                                            <Picker.Item label="Type" value='Type' />
                                            <Picker.Item label="Security" value="Security" />
                                            <Picker.Item label="Communication" value="Communication" />
                                            <Picker.Item label="Delivery" value="Delivery" />
                                            <Picker.Item label="Neighbour" value="Neighbour" />
                                            <Picker.Item label="Other" value="Other" />
                                        </Picker>
                                    )}
                                </View>
                            </TouchableWithoutFeedback>
                            {errors.type && <Text style={styles.errorMessage}>Required.</Text>}    
                            <Controller 
                                as={(
                                    <Textarea
                                        placeholder='Description' 
                                        style={{ marginTop: resHeight(2.5) }} 
                                    />
                                )}
                                name="description"
                                control={control}
                                onChange={onChange}
                                defaultValue=""
                            />   
                            {errors.description && <Text style={styles.errorMessage}>Required.</Text>}    
                        </View>
                        <View style={styles.bottomContainer}>
                            <Button
                                title={loading ? <ActivityIndicator style={{ marginLeft: 8}} color="#fff" /> : 'Submit'}
                                textColor='#fff'
                                backgroundColor='#5766BA' 
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    middleBlock: {
        paddingHorizontal: resWidth(1.5),
        paddingVertical: resHeight(1),
        width: resWidth(89),
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
        borderColor: '#ECECEC',
        borderWidth: 1,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    bottomContainer: {
        marginTop: resHeight(6),
        width: resWidth(55),
    },
    errorMessage: {
        color: '#cd3f3f',
    },
     uploadcontainer: {
        position: 'absolute',
        width: '100%',
        top: resWidth(-20)/2,
    },
    uploadBtn: {
        backgroundColor: '#D8D8D8',
        width: resWidth(20),
        height: resWidth(20),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 4,
        borderRadius: resWidth(20)/2
    },
    uploadBtnText: {
        color: '#fff',
        fontSize: resFont(11),
        fontFamily: 'josefin-sans-semi-bold'
    },
    bottomContainer: {
        width: resWidth(55),
        alignSelf: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: resWidth(1)
    },
    checkboxLabel: {
        fontSize: resFont(13),
        fontFamily: 'josefin-sans-light',
        marginLeft: 0,
        marginRight: 0,
    },
    checkbox: {
        backgroundColor: 'white',
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignItems: 'flex-start'
    },
     pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1,
        backgroundColor: '#fff',
        height: resHeight(7),
        paddingHorizontal: resHeight(2.5),
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        borderRadius: 5,
        marginBottom: resHeight(1.25)
    },
    pickerContainerText: {
        flex: 1,
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-reg'
    },
})

export default NewComplaint;