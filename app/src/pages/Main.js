import React, { useEffect } from 'react'
import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import LoaderContainer from '../components/Loader'
import NoPackages from '../components/NoPackages'
import PackageItem from '../components/PackageItem'
import Tabs from '../components/Tabs'
import { MAIN } from '../constants/pages'
import { getListOfUserDeliveryAction } from '../redux/actions/delivery-action'
import { getPackagesStateSelector } from '../redux/selectors/delivery-selector'
import { getUserIdSelector } from '../redux/selectors/user-selector'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		position: 'relative',
		
	},
	container: {
		display: 'flex',
		flex: 1,
		paddingBottom: 80,
	},
}))

const Home = (props) => {
	const classes = useStyles()
	const loading = false

	const dispatch = useDispatch()
	const uid = useSelector(getUserIdSelector)
	const { data, isLoading, success, queried } = useSelector(getPackagesStateSelector)

	// console.log(`values`, Object.values(data))
	// console.log(`keys`, Object.keys(data))

	useEffect(() => {
		if (!queried && !isLoading && uid) {
			dispatch(getListOfUserDeliveryAction(uid))
		}
	}, [uid])

	return (
		<View style={classes.root}>
			<SafeAreaView style={classes.container}>
				{loading && <LoaderContainer />}
				{!!Object.keys(data).length ? (
					<FlatList
						data={Object.keys(data)}
						renderItem={({ item }) => <PackageItem id={item} data={data[item]} {...props} />}
						keyExtractor={(item ) => item}
					/>
				) : (
					<NoPackages />
				)}
			</SafeAreaView>
			<Tabs activeScreen={MAIN} {...props} />
		</View>
	)
}

export default Home
