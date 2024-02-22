import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [image, setImage] = useState("");
  const navigation = useNavigation();
  const SERVER_IP = "10.0.0.90";

  const handleRegistration = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST request to backend API to register the user
    axios
      .post(`http://${SERVER_IP}:8000/register`, user, {withCredentials: true})
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration succesful",
          "You have been registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        // setImage("");
      })
      .catch((err) => {
        Alert.alert(
          "Registration Error",
          "An error as occurred while registering"
        );
        console.log("Registration failed", err);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4a55a2", fontSize: 17, fontWeight: "600" }}>
            Register
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Register an account today!
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
            Name
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              fontSize: 18,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
            }}
            placeholderTextColor={"black"}
            placeholder="Enter your name"
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Enter your Email"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Enter your password"
            />
          </View>

          {/* <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Profile Picture
            </Text>

            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Image"
            />
          </View> */}

          <Pressable
            onPress={handleRegistration}
            style={{
              width: 200,
              backgroundColor: "#4a55a2",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already have an account? Sign In!
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
