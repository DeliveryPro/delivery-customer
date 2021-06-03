import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Tabs from '../components/Tabs'
import { MAP } from '../constants/pages'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import TrackIcon from '../assets/track.svg'

import { IconTruck } from '@tabler/icons'
import MapViewDirections from 'react-native-maps-directions'
import { PRIMARY_COLOR } from '../constants/colors'
import { getPackageDataStateSelector } from '../redux/selectors/delivery-selector'
import { useSelector } from 'react-redux'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		position: 'relative',
	},
	mapContainer: {
		display: 'flex',
		flex: 1,
	},
	pointContianer: {
		display: 'flex',
		width: POINT_SIZE,
		height: POINT_SIZE,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
}))

const POINT_SIZE = 20

const markers = [
	{
		title: 'Home',
		coordinate: {
			latitude: 50.019823,
			longitude: 36.215636,
		},
	},
	{
		title: 'Test1',
		coordinate: {
			latitude: 50.012325,
			longitude: 36.22951,
		},
	},
]

const origin = { latitude: 50.019823, longitude: 36.215636 }
// const destination = { latitude: 50.012325, longitude: 36.22951 }

const GOOGLE_MAPS_APIKEY = 'AIzaSyAwajrFxnsBUZgnLKOzo_Z6HEAalSavUIo'

const Map = (props) => {
	const classes = useStyles()

	const { courier } = useSelector(getPackageDataStateSelector)

	console.log('packageData = >', courier)

	return (
		<View style={classes.root}>
			<View style={classes.mapContainer}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={classes.map}
					showsUserLocation
					initialRegion={{
						latitude: 50.019823,
						longitude: 36.215636,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					{courier && (
						<Marker
							title="Courier"
							coordinate={courier}
							// image={{
							// 	uri: IconTruck,
							// }}
						>
							<View style={ classes.pointContianer}>
								<TrackIcon />
							</View>
						</Marker>
					)}
					{/* {markers.length
						? markers.map((marker, index) => (
								<Marker
									key={index}
									coordinate={marker.coordinate}
									title={marker.title}
									description={marker.description}
								/>
						  ))
						: null} */}
					{/* 
                    <MapViewDirections
                        origin={origin}
                        strokeWidth={3}
                        strokeColor={PRIMARY_COLOR}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                    /> */}
				</MapView>
			</View>

			{/* <Tabs activeScreen={MAP} {...props} /> */}
		</View>
	)
}

export default Map
