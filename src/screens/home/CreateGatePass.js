import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Share, Clipboard, Picker } from 'react-native';
import Input from '../../components/Input';
import DateInput from '../../components/DateInput';
import SelectInput from '../../components/SelectInput';
import { CheckBox, Text  } from 'react-native-elements'
import Button from '../../components/Button';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import { resWidth, resFont, resHeight } from '../../utils/utils';
import {
  Toast, PickerView, Modal as ModalAnt,
} from '@ant-design/react-native';
import Modal from "react-native-modal";

import DateTimePicker from '@react-native-community/datetimepicker';

import { Controller, useForm } from 'react-hook-form'
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

const guestTypeOptions = 
[
    {
        label: "Family/Friends",
        value: "Family/Friends"
    },
    {
        label: "Staff",
        value: "Staff"
    },
    {
        label: "Contractor",
        value: "Contractor"
    }
]

const CreateGatePass = props => {
    var db = firebase.firestore();
    const { navigation } = props;
    const { register, handleSubmit, watch, control, errors, setValue, getValues  } = useForm();
    const [ checked, setChecked ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ guestData, setGuestData ] = React.useState({});
    const [ currentUser, setCurrentUser ] = React.useState(null);
    const [ showSucessModal, setShowSucessModal ] = React.useState(false);
    // date
      const [date, setDate] = React.useState(new Date());
      const [mode, setMode] = React.useState('date');
      const [showDate, setShowDate] = React.useState(false);

        const [type, setType] = React.useState(undefined);
      const [showType, setShowType] = React.useState(false);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
      } else {
        // No user is signed in.
      }
    });

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

    function onChangeDate (event, selectedDate) {
        const currentDate = selectedDate || date;

        setDate(currentDate);
        setValue('start_date', currentDate, true)
        setShowDate(Platform.OS === 'ios' ? true : false);
    };

    const toSetType = (itemValue, itemIndex) => {
        ModalAnt.operation(guestTypeOptions.map(option => {
            let currentType = option['value'];
            console.log(currentType);
            return {
                text: currentType,
                onPress: () => {
                    setType(currentType);
                    setValue('type', currentType, true);
                }
            }
        }));
        // ModalAnt.operation([
        //     { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
        //     { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
        // ]);

        
    };

    const showMode = currentMode => {
        setShowDate(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    const closeDatepicker = () => {
        setShowDate(false);
    };

    const toggleDatepicker = () => {
        setMode('date');
        setShowDate(!showDate);
    };

    const showTypepicker = () => {
        setShowType(true);
    };
    const closeTypepicker = () => {
        setShowType(false);
    };

    const toggleTypepicker = () => {
        setShowType(!type)
    };
  // const showTimepicker = () => {
  //   showMode('time');
  // };

   const onShare = async () => {
        try {
            const {name, code} = guestData;
            const message = `Code for ${name} is: ${code}`;
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
            const {name, code} = guestData;
            const message = `Code for ${name} is: ${code}`;
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
        setLoading(true);
        loadingToast();
        const { uid } = currentUser;
        let dateCode = Date.now()+'';
        let docId = dateCode+'GP'+uid;
        data['_id'] = docId;
        data['uid'] = uid;
        data['code'] = dateCode.substring(7,);
        data['status'] = 'Pending';
        data['checked_in'] = false;
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
                    <ScrollView 
                        contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={styles.middleBlock}>
                            <Input
                                ref={ register({ name: 'name'},{ required: true}) }
                                name="name"
                                onChangeText={text => setValue('name', text, true)}
                                placeholder='Full Name' style={{ marginTop: resHeight(1.5) }} />
                            {errors.name && <Text style={styles.errorMessage}>Full Name is required.</Text>}    
                            <Input
                                ref={ register({ name: 'phone'},{ required: false}) }
                                name="phone"
                                onChangeText={text => setValue('phone', text, true)}
                                 placeholder='Phone Number (Optional)' 
                                 style={{ marginTop: resHeight(1.5) }} 
                                 defaultValue={234}
                             />
                                <View
                                    style={{
                                        flex:1,
                                        width: '100%',
                                    }}
                                >
                                    <TouchableOpacity 
                                        onPress={toggleTypepicker} 
                                        style={{
                                            flex:1,
                                            height: '100%',
                                            width: '100%',
                                        }}
                                    >

                                        <SelectInput
                                            ref={ register({ name: 'type'},{ required: true}) }
                                            name="type"
                                            value={type}
                                            onFocus={toSetType}
                                            onBlur={closeTypepicker}
                                            onChangeText={text => console.log(text)}
                                         placeholder='Type' 
                                         style={{ marginTop: resHeight(1.5) }} 
                                         showType={showType}
                                         />

                                    </TouchableOpacity>
                                  
                                </View>

                               <View
                                    style={{
                                        flex:1,
                                        width: '100%',
                                    }}
                                >
                                    <TouchableOpacity 
                                        onPress={toggleDatepicker} 
                                        style={{
                                            flex:1,
                                            height: '100%',
                                            width: '100%',
                                        }}
                                    >

                                        <DateInput
                                            ref={ register({ name: 'start_date'},{ required: true}) }
                                            name="start_date"
                                            value={getValues()['start_date'] && new Date(getValues()['start_date']).toDateString()}
                                            onFocus={toggleDatepicker}
                                            onBlur={closeDatepicker}
                                            onChangeText={text => console.log(text)}
                                         placeholder='Start Date' 
                                         style={{ marginTop: resHeight(1.5) }} 
                                         showDate={showDate}
                                         />

                                    </TouchableOpacity>
      
                                  {showDate && (
                                    <DateTimePicker
                                      testID="dateTimePicker"
                                      timeZoneOffsetInMinutes={0}
                                      value={date}
                                      mode={mode}
                                      is24Hour={true}
                                      display="default"
                                      onChange={onChangeDate}
                                      minimumDate={new Date()}
                                    />
                                  )}
                                </View>
                            {errors.start_date && <Text style={styles.errorMessage}>Start Date is required.</Text>}    
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
                                title={loading ? '...' : 'Create Gatepass'}
                                textColor='#fff'
                                icon='user-plus'
                                iconColor='#fff'
                                backgroundColor='#5766BA' 
                                onPress={handleSubmit(onSubmit)}
                                />
                        </View>
                    </ScrollView>
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
                    <Text allowFontScaling={false} style={styles.cardTitle}>{guestData.name}</Text>
                
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