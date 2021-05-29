import React from 'react'
import {SectionList, Text, StyleSheet} from 'react-native'
import Row from './Row'

const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      padding: 10
    }
  });

const renderSectionHeader = ({section}) => <Text style={styles.title}>{section.title}</Text>

const StrategiesList = props => (
    <SectionList 
        renderItem= {({ item }) => <Row {...item} onSelectStrategy={props.onSelectStrategy} onRemoveStrategy={props.onRemoveStrategy}/>}
        renderSectionHeader={renderSectionHeader}
        sections ={[{
            title: 'Click each strategy to see details',
            data: props.strategies,
        }]}
    />
)
export default StrategiesList