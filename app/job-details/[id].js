import { Text,  View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import {Stack, useRouter, useLocalSearchParams} from 'expo-router';
import {useCallback, useState} from 'react';

import {Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import {COLORS,icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';
import About from "../../components/jobdetails/about/About";

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetails = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    
    const {data, isLoading, error, refetch} = useFetch('job-details',{
        job_id: params.id
    }); //data returned is an array with single object

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        refetch().then(()=>{setRefreshing(false)});
    }, []);

    const displayTabContent = () => {
        switch (activeTab) {
            case 'About':
                return <About info = {data[0].job_description}></About>;
                break;
            
            case 'Qualifications':
                return <Specifics 
                    title="Qualifications" 
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                ></Specifics>;
                break;
            case 'Responsibilities':
                return <Specifics
                    title="Responsibilities" 
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                ></Specifics>;              
                break;
            default:
                break;
        }
    };

    return(
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor:COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension={"60%"}
                            handlePress = {() => router.back()}
                        ></ScreenHeaderBtn>
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension={"60%"}
                        ></ScreenHeaderBtn>
                    ),
                    headerTitle: ""
                }}
            ></Stack.Screen>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
            }>
                {isLoading
                ? <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>
                : error
                    ? <><Text>Something went wrong</Text><Text>{error.message}</Text></>
                    : data.length === 0
                        ? <Text>No data available</Text>
                        : <View style={{padding:SIZES.medium, paddingBottom:100}}>
                            <Company
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name} 
                                location={data[0].job_country} 
                            ></Company>
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            ></JobTabs>
                            {displayTabContent()}                                                
                        </View>
                }
            </ScrollView>
            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}></JobFooter>
        </SafeAreaView>
        
    )
}
export default JobDetails;