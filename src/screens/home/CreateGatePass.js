import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Input from '../../components/Input';
import { CheckBox } from 'react-native-elements'
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import { resWidth, resFont, resHeight } from '../../utils/utils';

import { Controller, useForm } from 'react-hook-form'

const { width } = Dimensions.get('window')
const CreateGatePass = props => {
    const { navigation } = props;
    const { register, handleSubmit, watch, control, errors, setValue } = useForm();
    const [ checked, setChecked ] = React.useState(false);

    const handleAddUserToFav = () => {
        setChecked(!checked)
    }

    const onChange = args => {
        console.log(args[0].nativeEvent.text);
        return {
          value: args[0].nativeEvent.text,
        };
    };

    const onChangeText = (args, vals) => {
        console.log(args);
        console.log(vals);
        // setValue();
    }

    const onSubmit = data => { 
        console.log(data) 
    }

    console.log(watch('fullName')) // watch input value by passing the name of it

    
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
                            <Input
                                ref={ register({ name: 'phone'},{ required: true}) }
                                name="phone"
                                onChangeText={text => setValue('phone', text, true)}
                             placeholder='Phone Number (Optional)' style={{ marginTop: resHeight(1.5) }} />
                            <Input
                                ref={ register({ name: 'arrivalDate'},{ required: true}) }
                                name="arrivalDate"
                                onChangeText={text => setValue('arrivalDate', text, true)}
                             placeholder='Arrival Date' style={{ marginTop: resHeight(1.5) }} />
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
                                <CheckBox
                                    control={control}
                                    name="favorite"
                                    title='Add User as favorites'
                                    checked={checked}
                                    checkedColor='#222455'
                                    textStyle={styles.checkboxLabel}
                                    containerStyle={styles.checkbox}
                                    onIconPress={handleAddUserToFav}
                                    onPress={handleAddUserToFav}
                                />
                            </View>
                        </View>

                        <View style={styles.bottomContainer}>
                            <ButtonWithIcon
                                title='Create Gatepass'
                                textColor='#fff'
                                icon='user-plus'
                                iconColor='#fff'
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
})