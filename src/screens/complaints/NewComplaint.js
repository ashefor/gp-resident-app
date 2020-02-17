import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import { resWidth, resHeight } from '../../utils/utils';

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

    const onSubmit = async data => { 
        loadingToast();
        setLoading(true);
        const { uid } = currentUser;
        let dateCode = Date.now()+'';
        let docId = dateCode.substring(5,)+'GPComplaint'+uid;
        data['_id'] = docId;
        data['uid'] = uid;
        data['status'] = 'Pending';
        data['resolved'] = false;
        data['issueDate'] = new Date();
        data['completionDate'] = null;
        data['comments'] = [];

        let addDoc = await db.collection('complaints').add(data)
        .then( () => {
            setGuestData(data);
            openSuccessModal();
        })
        .catch( e => {
            console('GatePass Creation error');
            console.log(e);
            failToast();
            throw e;
        });
        setLoading(false);
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
                            <Input 
                                placeholder='Subject' 
                                style={{ marginVertical: resHeight(2.5) }} 
                                ref={ register({ name: 'subject'},{ required: true}) }
                                name="subject"
                                onChangeText={text => setValue('subject', text, true)}
                            />
                            <Input 
                                placeholder='Select Property' 
                                style={{ marginVertical: resHeight(2.5) }} 
                                ref={ register({ name: 'property'},{ required: true}) }
                                name="property"
                                onChangeText={text => setValue('property', text, true)}
                            />
                            <Textarea 
                                placeholder='Description' 
                                style={{ marginVertical: resHeight(2.5) }} 
                                ref={ register({ name: 'description'},{ required: true}) }
                                name="description"
                                onChangeText={text => setValue('description', text, true)}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <Button
                                title='Submit'
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
})

export default NewComplaint;