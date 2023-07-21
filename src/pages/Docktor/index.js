import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import DoctorCategorySkeleton from '../../components/molleculs/DoctorCategory/skeleton';
import NewsItemSkeleton from '../../components/molleculs/NewsItem/skeleton';
import RatedDoctorSkeleton from '../../components/molleculs/RatedDoctor/skeleton';
import {colors, fonts} from '../../utils';
import {useDoctor} from './useDoctor';

export default function Docktor({navigation}) {
  const {doctors, docterCategory, profile, newsItem, skeleton} =
    useDoctor(navigation);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile', profile)}
            />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {skeleton
                  ? Array(4)
                      .fill()
                      .map((_, i) => <DoctorCategorySkeleton key={i} />)
                  : docterCategory?.map(item => (
                      <DoctorCategory
                        key={item?.id}
                        category={item?.category}
                        image={item?.image}
                        onPress={() =>
                          navigation.navigate('ChooseDoctor', item)
                        }
                      />
                    ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {skeleton
              ? Array(4)
                  .fill()
                  .map((_, i) => <RatedDoctorSkeleton key={i} />)
              : doctors?.map(item => (
                  <RatedDoctor
                    key={item?.id}
                    name={item?.data?.fullName}
                    desc={item?.data?.category}
                    avatar={item?.data?.photo}
                    onPress={() => navigation.navigate('DoctorProfile', item)}
                  />
                ))}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {skeleton
            ? Array(4)
                .fill()
                .map((_, i) => <NewsItemSkeleton key={i} />)
            : newsItem?.map(item => (
                <NewsItem
                  key={item?.id}
                  title={item?.title}
                  date={item?.date}
                  image={item?.image}
                />
              ))}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  content: {
    backgroundColor: colors.white,
    flex: 1,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  wrapperSection: {paddingHorizontal: 16},
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {marginHorizontal: -16},
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
