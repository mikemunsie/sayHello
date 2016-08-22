import { StyleSheet } from 'react-native';

export { AppText } from "./appText";

export const colors = {
  primary: "rgba(70, 184, 189, 1.00)"
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
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
  center: {
    textAlign: "center"
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
  },
  textfieldWithFloatingLabel: {
    textAlign: "center"
  },
  text: {
    fontFamily: "Lato-Regular",
    fontSize: 15
  },
  white: {
    color: "white"
  }
});