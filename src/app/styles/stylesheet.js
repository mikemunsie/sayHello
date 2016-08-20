import { StyleSheet } from 'react-native';

export { AppText } from "./appText";

export const styles = StyleSheet.create({
  h1: {
    color: "#000000",
    fontSize: 50,
    textAlign: "center",
    fontFamily: "AdventPro-Regular"
  },
  button: {
    width: 300
  },
  buttonBlue: {
    backgroundColor: "rgba(78, 135, 234, .8)"
  },
  buttonOrange: {
    backgroundColor: "rgba(219, 136, 70, .8)"
  },
  buttonText: {
    color: "#fff",
    padding: 20,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  center: {
    textAlign: "center"
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
  },
  p: {
    color: "#000",
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative"
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center'
  },
  text: {
    fontFamily: "Roboto-Light",
    fontWeight: "400",
    fontSize: 12
  }
});