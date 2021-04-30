import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { showMessage, hideMessage } from "react-native-flash-message";
import {shade1, shade2, shade3, shade4, shade5} from "../config/color"



const SignUpScreen = (props) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {auth : {signUp}} = React.useContext(AuthContext);

    return (
        <ScreenContainer style={styles.container}>
            <Heading style={styles.title}>Sign Up</Heading>
            <Input
                style={styles.input}
                placeholder={'Username'}
                value={username}
                onChangeText={setUsername}
            />
            <Input
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <FilledButton
                title={'Sign Up'}
                style={styles.loginButton}
                onPress={async () => {
                    try {
                        let res = await signUp(username, password);
                        if(res != 'Başarılı'){
                            showMessage({
                                message: res,
                                type: "danger",
                            });
                        }
                    } catch (e) {
                        console.log(e)
                    }
                  }}
            />
            <TextButton
                title={'You Already Have an Account? Sign In' }
                onPress={() => {
                    props.navigation.navigate("SignIn")
                }}
            />
            
        </ScreenContainer>
    );
    
    
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 120,
        alignItems: 'center',
        backgroundColor: shade1
    },
    title: {
        marginBottom: 48,
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
});

export default SignUpScreen;