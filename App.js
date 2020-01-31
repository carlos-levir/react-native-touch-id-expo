import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Platform
} from "react-native";

import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);

  async function authenticate() {
    const hasPassword = await LocalAuthentication.isEnrolledAsync();

    if (!hasPassword) return;

    const { success, error } = await LocalAuthentication.authenticateAsync();

    if (success) {
      Alert.alert("Autenticação realizada com sucesso");
    } else {
      Alert.alert("A autenticação falhou. Por favor, digite sua senha!");
    }

    setIsModalVisible(false);
  }

  Platform.OS === "ios" && authenticate();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#444"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#444"
      />
      <TouchableOpacity style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      {Platform.OS === "android" && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onShow={authenticate}
        >
          <View style={styles.modal}>
            <Text style={styles.authText}>
              Autentique-se utilizando sua digital
            </Text>
            <TouchableOpacity
              onPress={() => {
                LocalAuthentication.cancelAuthenticate();
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#19181f",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#7159c1",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#7159c1",
    backgroundColor: "#7159c1",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#333",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "40%"
  },
  cancelText: {
    color: "red",
    fontSize: 16
  },
  authText: {
    color: "white",
    fontSize: 16
  }
});
