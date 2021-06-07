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


const StrategiesList = props => (
    <SectionList 
        renderItem= {({ item }) => <Row {...item} onSelectStrategy={props.onSelectStrategy} onRemoveStrategy={props.onRemoveStrategy}/>}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={ItemSeparator}
        sections ={[{
            title: 'Click each strategy to see details',
            data: props.strategies,
        }]}
    />
)
export default StrategiesList