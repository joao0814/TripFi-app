import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import Balance from "../../components/balance";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header name="João" />

      <Balance saldo="15.820.52" gastos="250" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
