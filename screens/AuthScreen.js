import React, { useState, useRef } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import firebase from "firebase";

import { useAuth } from "../context/AuthContext";
import app from "../firebase";

export default function AuthScreen({ navigation }) {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = app.options;
  const { login } = useAuth();

  const confirmVerficationCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await login(credential);
      navigation.popToTop();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={false}
      />
      <Text>Enter your phone number to sign in below.</Text>
      <TextInput
        style={styles.phoneInput}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        placeholder="555-555-5555"
      />
      <Button
        title="Send Verification Code"
        disable={!phoneNumber}
        onPress={async () => {
          const countryCode = "+1";
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              countryCode + phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
          } catch (err) {
            console.log(err);
          }
        }}
      />
      <Text>Enter verification code:</Text>
      <TextInput
        style={styles.phoneInput}
        editable={verificationId ? true : false}
        placeholder="123456"
        onChangeText={setVerificationCode}
        onSubmitEditing={confirmVerficationCode}
        keyboardType="number-pad"
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={confirmVerficationCode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 40,
  },
  phoneInput: {
    margin: 10,
    fontSize: 24,
  },
});
