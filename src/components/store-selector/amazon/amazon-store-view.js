import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

class AmazonStoreView extends Component {
    render() {
        return (
            <View style={styles.viewContainer}>
                <TextInput placeholder="Enter your search..."></TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'column'
    }
});

export default AmazonStoreView;