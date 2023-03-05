import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';

export default class EditInput extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        stylesItem: styles.EditItem,
        label: this.props.data.label,
        value: this.props.data.value,
        secure: this.props.data.secure,
        setValue: this.props.onChange,
    }


    onFocus() {
        this.setState({
            stylesItem: styles.EditItemFocus
        })
        console.debug()
    }

    onBlur() {
        this.setState({
            stylesItem: styles.EditItem
        })
    }


    render() {
        return (
            <View style={this.state.stylesItem}>
                <View style={styles.EditViewLabel}>
                    <Text style={styles.EditLabel}>{this.state.label}:</Text>
                </View>
                <View style={styles.EditViewInput}>
                    <TextInput
                        onBlur={() => this.onBlur()}
                        onFocus={() => this.onFocus()}
                        // onChangeText={value => {
                        //     if (this.state.setValue) {
                        //         this.state.setValue(value)
                        //     }
                        // }}
                        secureTextEntry={this.state.secure}
                        // style={s tyles.EditInput}
                        style={styles.EditInput}> {this.state.value}</TextInput>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    EditItem: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 30,
    },
    EditItemFocus: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgb(180, 180, 180)',
        marginBottom: 30,
        backgroundColor: 'rgb(250, 250, 250)',
        borderWidth: 1,
        borderColor: '#0d6efd',
    },
    EditViewLabel: {

    },
    EditLabel: {
        color: 'rgb(100, 100, 100)',
        fontSize: 15,
    },
    EditViewInput: {

    },
    EditInput: {
        // borderWidth: 2,
        // borderRadius: 5,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        // marginTop: 10,
    },
})