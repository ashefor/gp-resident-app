import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Share, Clipboard, } from 'react-native';
import Input from '../../components/Input';
import { CheckBox, Text  } from 'react-native-elements'
import Button from '../../components/Button';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import { resWidth, resFont, resHeight } from '../../utils/utils';
import {
  Toast,
} from '@ant-design/react-native';
import { Controller, useForm } from 'react-hook-form'
import Modal from "react-native-modal";

import firebase from "firebase";
import firestore from "firebase/firestore";

const { width } = Dimensions.get('window');

function successToast() {
  Toast.success('Guest has been added', 2);
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

const CreateGatePass = props => {
    var db = firebase.firestore();
    const { navigation } = props;
    const { register, handleSubmit, watch, control, errors, setValue } = useForm();
    const [ checked, setChecked ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ guestData, setGuestData ] = React.useState({});
    const [ showSucessModal, setShowSucessModal ] = React.useState(false);
    const userId = 'alphaId';

    const openSuccessModal = () => {
        setShowSucessModal(true);
    }

    const closeSuccessModal = () => {
        setShowSucessModal(false);
    }

    const onFinish = () => {
        closeSuccessModal();
        navigation.navigate('Home');

    }

   const onShare = async () => {
        try {
            console.log(guestData);
            const {fullName, code} = guestData;
            const message = `Code for ${fullName} is: ${code}`;
            const result = await Share.share({
                message,
            });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
            setTimeout(() => {
                props.navigation.navigate('Home');
            } ,1616)
          }
        } catch (error) {
          alert(error.message);
        }
    };

    const onCopy = async () => {
        try {
            console.log(guestData);
            const {fullName, code} = guestData;
            const message = `Code for ${fullName} is: ${code}`;
            Clipboard.setString(message);
            const result = await Clipboard.getString();
        } catch (error) {
          alert(error.message);
        }
        successToastCopied();
    };

    const onChange = args => {
        return {
          value: args[0].nativeEvent.text,
        };
    };

    const onSubmit = async data => { 
        loadingToast();
        setLoading(true);
        let dateCode = Date.now()+'';
        let docId = userId+'GP'+dateCode;
        data['_id'] = docId;
        data['userId'] = userId;
        data['code'] = dateCode.substring(7,);
        data['status'] = 'Pending';
        data['checkedIn'] = false;
        data['revoked'] = false;
        data['phone'] = data['phone'] ? data['phone'] : '234' ;

        let addDoc = await db.collection('gatepasses').add(data)
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
        // let setDoc = await firebase.database().ref('gatepasses').add({...data})
        // .then( () => {
        //     successToast();
        // })
        // .catch( e => {
        //     console('GatePass Creation error');
        //     console.log(e);
        //     failToast();
        //     throw e;
        // });
            setLoading(false);
            
    }

    return (
        <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
            <SafeAreaView style={StyleSheet.absoluteFillObject}>
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <Header navigation={navigation} Cancel='Home' textColor='#8A98BA' />
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={styles.middleBlock}>
                            <Input
                                ref={ register({ name: 'fullName'},{ required: true}) }
                                name="fullName"
                                onChangeText={text => setValue('fullName', text, true)}
                                placeholder='Full Name' style={{ marginTop: resHeight(1.5) }} />
                            {errors.fullName && <Text style={styles.errorMessage}>Full Name is required.</Text>}    
                            <Input
                                ref={ register({ name: 'phone'},{ required: false}) }
                                name="phone"
                                onChangeText={text => setValue('phone', text, true)}
                                 placeholder='Phone Number (Optional)' 
                                 style={{ marginTop: resHeight(1.5) }} 
                                 defaultValue={234}
                             />
                            <Input
                                ref={ register({ name: 'arrivalDate'},{ required: true}) }
                                name="arrivalDate"
                                onChangeText={text => setValue('arrivalDate', text, true)}
                             placeholder='Arrival Date' style={{ marginTop: resHeight(1.5) }} />
                            {errors.arrivalDate && <Text style={styles.errorMessage}>Arrival Date is required.</Text>}    
                             <Controller 
                                as={(
                                    <Textarea
                                        placeholder='Comments' 
                                        style={{ marginTop: resHeight(1.5) }} 
                                    />
                                )}
                                name="comments"
                                control={control}
                                onChange={onChange}
                                defaultValue=""
                            />
                            <View style={{ width: '100%' }}>
                                 <Controller 
                                as={(
                                    <CheckBox
                                    title='Add User as favorites'
                                    checked={checked}
                                    checkedColor='#222455'
                                    textStyle={styles.checkboxLabel}
                                    containerStyle={styles.checkbox}
                                    onIconPress={() => {
                                        setValue('favorite',!checked);
                                        setChecked(!checked);
                                    }}
                                    onPress={() => {
                                        setValue('favorite',!checked);
                                        setChecked(!checked);
                                    }}
                                />
                                )}
                                name="favorite"
                                control={control}
                                defaultValue={false}
                            />
                            </View>
                        </View>

                        <View style={styles.bottomContainer}>
                            <ButtonWithIcon
                                title={loading ? <ActivityIndicator style={{ marginLeft: 8}} color="#fff" /> : 'Create Gatepass'}
                                textColor='#fff'
                                icon='user-plus'
                                iconColor='#fff'
                                backgroundColor='#5766BA' 
                                onPress={handleSubmit(onSubmit)}
                                />
                        </View>
                    </View>
                </View>
                <Modal
                    testID={'modal'}
                    isVisible={showSucessModal}
                    onBackdropPress={closeSuccessModal}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.modal}
                    backdropColor="#000000"
                >
                    <View 
                        style={{ 
                            flex:1,
                            width:resWidth(89), 
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                <View style={[styles.customCard, { backgroundColor: '#5766BA' }]}>
                <View
                style={{ 
                    flex:1,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                 }}
                >
                    <Text allowFontScaling={false} style={styles.cardTitle}>{`Done!`}</Text>
                    <Text allowFontScaling={false} style={styles.cardSubtitle}>{`A GatePass has been created for`}</Text>
                    <Text allowFontScaling={false} style={styles.cardTitle}>{guestData.fullName}</Text>
                
                    <Text allowFontScaling={false} style={[styles.cardContent,styles.title, styles.codeShare]}
                        onPress={onCopy}
                    >{guestData.code}</Text>
                </View>
           
                    
                </View>
                 <View style={styles.shareContainer}>
                           
                 <Button
                    title={'Share Code'}
                    textColor='#fff'
                    backgroundColor='#5766BA' 
                    onPress={onShare}
                />

            </View>
             <View style={styles.shareContainer}>
                           
                 <Button
                    title={'Close'}
                    textColor='#5766BA'
                    backgroundColor='#eaeaea' 
                    onPress={() => {
                        closeSuccessModal();
                        props.navigation.navigate('Home');
                    }}
                />
                
            </View>
            </View>
                </Modal>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default CreateGatePass;

const styles = StyleSheet.create({
    middleBlock: {
        paddingHorizontal: resWidth(1.5),
        paddingVertical: resHeight(1),
        width: resWidth(89),
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
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
        flex:1,
        marginTop: resHeight(5),
        width: resWidth(55),
    },
    shareContainer: {
        marginTop: resHeight(5),
        width: resWidth(55),
    },
    checkboxLabel: {
        fontSize: resFont(13),
        fontFamily: 'josefin-sans-light',
        marginLeft: 0,
        marginRight: 0,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignItems: 'flex-start'
    },
    errorMessage: {
        color: '#cd3f3f',
    },
      content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 8,
  },

   modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

   customCard: {
        // backgroundColor: '#222455',
        // width: width * 0.8,
        height: resHeight(40),
        width: '100%',
        borderRadius: 5,
        padding: 20,
        // marginTop: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: resHeight(9),
        alignItems: 'center'
    },
    cardTitle: {
        fontSize: resFont(24),
        fontFamily: 'josefin-sans-semi-bold',
        color: '#fff',
        marginTop: resHeight(1.5)
    },
    cardSubtitle: {
        fontSize: resFont(14),
        fontFamily: 'josefin-sans-reg',
        color: '#fff',
        opacity: 0.8,
        marginTop: resHeight(1.5)

    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: resHeight(1.25)
    },
    cardContent: {
        fontSize: resFont(21),
        fontFamily: 'josefin-sans-semi-bold',
        color: '#fff',
        marginTop: resHeight(1.5)
    },
      title: {
    fontSize: 42,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
    cardAction: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: resHeight(4.5),
        width: resWidth(25),
    },
    cardBtnText: {
        color: '#65658A',
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(12),
    },
    chid_children: {
        width: '50%',
        marginBottom: resHeight(1.25)
    },
    chid_children_header: {
        fontSize: resFont(13),
        color: '#fff',
        fontFamily: 'josefin-sans-bold'
    },
    chid_children_subheader: {
        textAlign: 'center',
        color: '#fff',
        fontSize: resFont(11),
        fontFamily: 'josefin-sans-reg',
        marginTop: resHeight(0.65)
    },
      codeShare: { 
    marginTop: resHeight(0.65), 
  backgroundColor: '#6474CE', 
  padding: 12, 
        borderRadius: 24,
    },
})