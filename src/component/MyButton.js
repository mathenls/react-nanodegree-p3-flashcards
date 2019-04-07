import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

class customButton extends Component {
	render() {
		const { text, onPress, disabled } = this.props;
		return (
		  <TouchableOpacity disabled={disabled} style={disabled ? styles.disabledStyle : styles.buttonStyle}
			onPress={() => onPress()}
		  >
			 <Text style={styles.textStyle}>{text}</Text>
		  </TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
	color: '#ffffff',
	textAlign: 'center'
  },
  buttonStyle: {
	padding: 10,
	backgroundColor: '#202646',
    borderRadius: 5,
    minWidth: 40,
    margin: 8,
  },
  disabledStyle: {
	padding: 10,
	backgroundColor: 'gray',
    borderRadius: 5,
    minWidth: 40,
    margin: 8,
    opacity: 0.3
  }
});

export default customButton;
