import { styles } from "./stylesheet";
import { MKColor, MKTextField } from 'react-native-material-kit';

export let FloatingLabel = (label) => MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder(label)
  .withStyle(styles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();