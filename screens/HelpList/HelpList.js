import React from 'react'
import {SectionList, Text, StyleSheet, View} from 'react-native'
import Row from './Row'

const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      padding: 10
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: "#e4e4e4",
      marginLeft: 10
    }
  });

const renderSectionHeader = ({section}) => <Text style={styles.title}>{section.title}</Text>

const ItemSeparator = () => <View style={styles.separator} />;


const HelpList = props => (
    <SectionList 
        renderItem= {({ item }) => <Row {...item} onSelectHelp={props.onSelectHelp} onRemoveHelp={props.onRemoveHelp}/>}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={ItemSeparator}
        sections ={[{
            title: 'Click each question to see the answers',
            data: props.help,
        }]}
    />
)
export default HelpList