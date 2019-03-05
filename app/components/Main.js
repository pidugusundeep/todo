import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import Note from './Note';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        }
    };

    render() {
        let notes = this.state.noteArray.map((val, key) => {
            return (<Note key={key} keyval={key} val={val}
                         deleteMethod={()=>this.deleteNote(key)} />)
        });
        return (
            <View style={style.container}>
                <View style={style.header} >
                    <Text style={style.headerText}>Noter</Text>
                </View>
                <ScrollView style={style.scrollContainer}>
                    {notes}
                </ScrollView>
                <View style={style.footer}>
                    <TextInput
                        style={style.textInput}
                        onChangeText={(noteText) => this.setState({ noteText })}
                        value={this.state.noteText}
                        placeholder=">Note"
                        placeholderTextColor="white"
                        underlineColorAndroid="transparent">
                    </TextInput>
                </View>

                <TouchableOpacity onPress={this.addNote.bind(this)} style={style.addButton}>
                    <Text style={style.addButtonText}>+</Text>
                </TouchableOpacity>

            </View>
        );
    }
    addNote() {
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
                'note':this.state.noteText
            });
            this.setState({ noteArray: this.state.noteArray });
            this.setState({ noteArray: '' });
        }
    };
    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#E91E63',
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    }
});
