import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView, ScrollView } from 'react-navigation';
import Header from '../../components/Header';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import { Feather } from '@expo/vector-icons';

const Contact = ({ name, phone, deleteContact }) => (
    <View style={{
        flexDirection: 'row',
        height: resHeight(7),
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        <View>
            <Text
                style={{
                    fontFamily: 'josefin-sans-semi-bold',
                    fontSize: resFont(15), color: '#313450'
                }}
                allowFontScaling={false}>
                {name}
            </Text>
            <Text
                style={{
                    fontFamily: 'josefin-sans-reg',
                    fontSize: resFont(13),
                    color: '#898A8F',
                    marginTop: resHeight(0.5)
                }}
                allowFontScaling={false}>
                {phone}
            </Text>
        </View>
        <TouchableOpacity onPress={deleteContact}>
            <Feather name='minus-circle' color='#F76E6E' size={resFont(25)} />
        </TouchableOpacity>
    </View>
)
export default class EmergencyContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [
                {
                    name: 'Daniel Bolarinwa',
                    phone: '0818889991212'
                }, {
                    name: 'Ismaila Andulkareem',
                    phone: '0818889991212'
                }
            ],
            showAddContact: false,
            fullName: '',
            phoneNumber: '',
            isLoading: false
        }
    }
    handleDeleteContact = (key) => {
        const contactsClone = [...this.state.contacts]
        this.setState({
            contacts: contactsClone.filter((contact, index) => index !== key)
        })
    }
    handleAddContact = () => {
        const { fullName, phoneNumber, contacts } = this.state;
        const contact = {
            name: fullName,
            phone: phoneNumber
        }
        const contactsClone = [...contacts]
        contactsClone.push(contact);
        if (fullName == '' || phoneNumber == '') {
            return
        } else {
            this.setState({ isLoading: true })
            setTimeout(() => {
                this.setState({ isLoading: false })
                this.setState({
                    contacts: contactsClone
                })
                this.setState({
                    fullName: '',
                    phoneNumber: '',
                    showAddContact: false,
                })
            }, 2000);
        }

    }
    updateName = fullName => {
        this.setState({ fullName });
    };
    updateNumber = phoneNumber => {
        this.setState({ phoneNumber });
    };
    render() {
        const { navigation } = this.props;
        const { contacts, showAddContact, fullName, phoneNumber, isLoading } = this.state
        return (
            <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={StyleSheet.absoluteFillObject}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <Header navigation={navigation} />
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ width: resWidth(89), alignSelf: 'center' }}>
                                <View style={{
                                    flexDirection: 'row',
                                    height: resHeight(7),
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: 'josefin-sans-semi-bold',
                                            fontSize: resFont(15), color: '#313450'
                                        }}
                                        allowFontScaling={false}>
                                        Add New Contact
                                </Text>
                                    <TouchableOpacity onPress={() => this.setState({ showAddContact: !showAddContact })}>
                                        <Feather name={showAddContact ? 'minus-circle' : 'plus-circle'} color='#6E78F7' size={resFont(25)} />
                                    </TouchableOpacity>
                                </View>
                                {showAddContact && <View style={{
                                    width: resWidth(85),
                                    alignSelf: 'center',
                                    marginBottom: resHeight(2)
                                }}>
                                    <Input placeholder='Full Name'
                                        onChangeText={this.updateName}
                                        value={fullName} />
                                    <Input placeholder='Phone Number'
                                        onChangeText={this.updateNumber}
                                        value={phoneNumber}
                                    />
                                    <Button title={isLoading ? <ActivityIndicator size='large' color='#fff' /> : 'Submit'} style={{ backgroundColor: '#5766BA' }} onPress={() => this.handleAddContact()} />
                                </View>}
                                <View>
                                    <ScrollView>
                                        {contacts.map((contact, index) => <Contact
                                            {...contact}
                                            deleteContact={() => this.handleDeleteContact(index)}
                                            key={index} />)}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}

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
        marginTop: resHeight(6),
        width: resWidth(55),
    },
})