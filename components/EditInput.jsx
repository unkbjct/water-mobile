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
        help: this.props.data.help,
        secure: this.props.data.secure,
        setValue: this.props.onChange,
        multiLine: this.props.multiLine,
    }


    onFocus() {
        this.setState({
            stylesItem: styles.EditItemFocus
        })
    }

    onBlur() {
        this.setState({
            stylesItem: styles.EditItem
        })
    }


    render() {
        return (
            <View style={{marginBottom: 20,}}>
                <View style={this.state.stylesItem}>
                    <View style={styles.EditViewLabel}>
                        <Text style={styles.EditLabel}>{this.state.label}:</Text>
                    </View>
                    <View style={styles.EditViewInput}>
                        <TextInput
                            onBlur={() => this.onBlur()}
                            onFocus={() => this.onFocus()}
                            onChangeText={value => {
                                if (this.state.setValue) {
                                    this.state.setValue(value)
                                }
                            }}
                            secureTextEntry={this.state.secure}
                            // style={s tyles.EditInput}
                            multiline={this.state.multiLine ? true : false}
                            style={[styles.EditInput, this.state.multiLine ? {height: 70} : {}]}>{this.state.value}</TextInput>
                    </View>
                </View>
                {(this.state.help) ? <Text style={{color: 'rgb(150, 150, 150)'}}>{this.state.help}</Text> : <></>}
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
        marginBottom: 10,
        backgroundColor: 'white',
    },
    EditItemFocus: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgb(180, 180, 180)',
        backgroundColor: 'rgb(250, 250, 250)',
        borderWidth: 1,
        marginBottom: 10,
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