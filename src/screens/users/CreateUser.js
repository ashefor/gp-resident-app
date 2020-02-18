import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import Input from '../../components/Input';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import { resWidth, resHeight } from '../../utils/utils';
import { withFormik } from 'formik';

import { addUser } from '../../../api/Store';

const { width } = Dimensions.get('window');

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            loading: false,
        }
    }
    
    render() {
        const {
            navigation,
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props;
        return (
            <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={StyleSheet.absoluteFillObject}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <Header navigation={navigation} />
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={styles.middleBlock}>

                                <Input 
                                    placeholder='Full Name' 
                                    style={{ marginTop: resHeight(2.5) }} 
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                              {errors.name && touched.name && 
                                <Text
                                    style={styles.feedback}
                                feedback
                                >{errors.name}
                                </Text>}

                                <Input 
                                    placeholder='Email Address' 
                                    style={{ marginTop: resHeight(2.5) }} 
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                              {errors.email && touched.email && 
                                <Text
                                    style={styles.feedback}
                                feedback
                                >{errors.email}
                                </Text>}

                            </View>
                            <View style={styles.bottomContainer}>
                            <ButtonWithIcon
                                title='Create User'
                                textColor='#fff'
                                icon='user-plus'
                                iconColor='#fff'
                                backgroundColor='#5766BA' 
                                onPress={handleSubmit}
                            />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}

function confirmUser(user){
  alert(user.email+' has been emailed login instructions');
}

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ 
    name: '',
    email: '',
   }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    }
    return errors;
  },



  handleSubmit: (values, { setSubmitting }) => {
    addUser(values,confirmUser);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'CreateUserForm',
})(CreateUser);

export default MyEnhancedForm;

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
    feedback: {
        color: 'red',
        fontSize: 10,
    }
})