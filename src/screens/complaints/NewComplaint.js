import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import { resWidth, resHeight } from '../../utils/utils';

import { CheckBox, Text  } from 'react-native-elements'
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

    const onSubmit = async data => { 
        const db = firebase.firestore();
        setLoading(true);
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
        props.navigation.goBack();
    }

    return (
        <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
            <SafeAreaView style={StyleSheet.absoluteFillObject}>
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <Header navigation={navigation} />
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={styles.middleBlock}>
                            <Input 
                                placeholder='Category' 
                                ref={ register({ name: 'category'},{ required: true}) }
                                name="category"
                                onChangeText={text => setValue('category', text, true)}
                                style={{ marginTop: resHeight(1.5) }} 
                            />
                            {errors.category && <Text style={styles.errorMessage}>Required.</Text>}    
                            <Input 
                                placeholder='Subject' 
                                style={{ marginVertical: resHeight(2.5) }} 
                                ref={ register({ name: 'subject'},{ required: true}) }
                                name="subject"
                                onChangeText={text => setValue('subject', text, true)}
                            />
                            {errors.subject && <Text style={styles.errorMessage}>Required.</Text>}    
                            <Input 
                                placeholder='Select Property' 
                                style={{ marginVertical: resHeight(2.5) }} 
                                ref={ register({ name: 'property'},{ required: true}) }
                                name="property"
                                onChangeText={text => setValue('property', text, true)}
                            />
                            {errors.property && <Text style={styles.errorMessage}>Required.</Text>} 
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
})

export default NewComplaint;