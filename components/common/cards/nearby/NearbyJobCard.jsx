import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style'
import {checkImgURL} from '../../../../utils/index';

const NearbyJobCard = ({job, handleNavigate}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
      >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{uri: checkImgURL(job.employer_logo)
            ? job.employer_logo
            : '../../../../assets/images/noCompany.png'
            }}
          resizeMode='contain'
          style={styles.logoImage}
        ></Image>
      </TouchableOpacity>

      
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard