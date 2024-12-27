//Comment for bugs in functions and fixes.
//Fixed SignUp Logic & Documented ~Sagnik & Debrup
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Icon from "../assets/icons"
import { theme } from '../constants/theme'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import Input from '../components/input'
import Button from '../components/Button'

const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert("Sign Up", "Please Fill all Fields Correctly!");
            return;
        }
    
        let name = nameRef.current.trim();
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();
    
        setLoading(true);
    
        try {
            // Send the login data to the API (assuming the API URL is /api/login)
                        const response = await fetch(`http://10.10.10.92:8000/auth/users/`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: name,
                                email: email,
                                password: password,
                            }),
                        });
                
                        const data = await response.json();
                        console.log(data)
                
                        if (response.ok) {
                            // If the login is successful, navigate to the home screen
                            console.log("Login Successful:", data);
                            // Assuming the API returns a token or user info, you can store it here
                            // Example: AsyncStorage.setItem('userToken', data.token);
                            router.replace("/login");
                        } else {
                            // If login fails, show an alert with the error message from the API
                            Alert.alert("Login Failed", data.message || "An error occurred. Please try again.");
                        }
            // Send the user data to the API (assuming the API URL is /api/signup)
            // const response = await fetch('https://your-api-endpoint.com/api/signup', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: name,
            //         email: email,
            //         password: password,
            //     }),
            // });
    
            // const data = await response.json();
    
            // if (response.ok) {
            //     // If the sign-up was successful, navigate to the home screen
            //     console.log("Sign Up Successful:", data);
            //     router.replace("/home");
            // } else {
            //     // If there was an error, show an alert with the error message
            //     Alert.alert("Sign Up Failed", data.message || "An error occurred. Please try again.");
            // }
            // router.replace("/home")
        } catch (error) {
            // Handle any network or server errors
            console.error('Error during sign-up:', error);
            Alert.alert("Sign Up Failed", "An error occurred. Please try again.");
            router.replace("/welcome")
        } finally {
            setLoading(false);
        }
    }
    

  return (
    <ScreenWrapper style={{backgroundColor: "white"}}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router}/>

        {/* Welcome */}
        <View>
            {/*Fixed Text Error ~Sagnik*/}
            <Text style={styles.welcomeText}>Let's</Text>
            <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
            <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                {/*Fixed Text Error ~Deb*/}
                Please enter the details for creating a new account
            </Text>
            <Input
                icon={<Icon name="user" size={26} strokeWidth={1.6}/>}
                placeholder="Enter your Username"
                onChangeText={value => nameRef.current = value}
            />
            <Input
                icon={<Icon name="mail" size={26} strokeWidth={1.6}/>}
                placeholder="Enter your email"
                onChangeText={value => emailRef.current = value}
            />
            <Input
                icon={<Icon name="lock" size={26} strokeWidth={1.6}/>}
                placeholder="Enter your Password"
                secureTextEntry
                onChangeText={value => passwordRef.current = value}
            />

            {/* Button */}
            <Button title={"Sign Up"} loading={loading} onPress={onSubmit} />

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Already have an account?
                </Text>
                <Pressable onPress={() => router.push("login")}>
                    <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
                        Login
                    </Text>
                </Pressable>
            </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
    },
    form: {
        gap: 25,
    },
    forgotPassword: {
        textAlign: "right",
        fontWeight: theme.fonts.semiBold,
        color: theme.colors.text,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    footerText: {
        textAlign: "center",
        color: theme.colors.text,
        fontSize: hp(1.6),
    }
})