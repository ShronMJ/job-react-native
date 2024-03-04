import React from 'react'
import { View, Text ,TouchableOpacity, FlatList} from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ({name, activeTab, onHandleSearch}) => (
  <TouchableOpacity
    style={styles.btn(name, activeTab)}
    onPress={onHandleSearch}
    >
    <Text style={styles.btn(name,activeTab)}>{name}</Text>
  </TouchableOpacity>
)

const Tabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={ ({item}) =>(
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearch={() => setActiveTab(item)}
          ></TabButton>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        key={tabs}
        //keyExtractor={item => item}
        contentContainerStyl={{columnGap:SIZES.small/2}}
      ></FlatList>
    </View>
  )
}

export default Tabs