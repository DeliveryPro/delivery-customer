import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import TrackIcon from '../assets/track.svg'
import PinIcon from '../assets/pin.svg'

import { getPackageDataStateSelector } from '../redux/selectors/delivery-selector'
import { useDispatch, useSelector } from 'react-redux'
import { unsubscribeFromCourierPositionAction } from '../redux/actions/delivery-action'

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

const GOOGLE_MAPS_APIKEY = 'AIzaSyAwajrFxnsBUZgnLKOzo_Z6HEAalSavUIo'

const Map = (props) => {
	const classes = useStyles()

	const dispatch = useDispatch()
	const { courier, data } = useSelector(getPackageDataStateSelector)

	const { address_from, address_to } = data || {}

	useEffect(() => {
		return () => courier && dispatch(unsubscribeFromCourierPositionAction(courier.courierId))
	}, [])

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
					{address_from && (
						<Marker
							title="From"
							coordinate={{
								latitude: address_from.coordinates.lat,
								longitude: address_from.coordinates.lng,
							}}
						>
							<View style={classes.pointContianer}>
								<PinIcon />
							</View>
						</Marker>
					)}
					{address_to && (
						<Marker
							title="To"
							coordinate={{
								latitude: address_to.coordinates.lat,
								longitude: address_to.coordinates.lng,
							}}
						>
							<View style={classes.pointContianer}>
								<PinIcon />
							</View>
						</Marker>
					)}
					{courier && (
						<Marker title="Courier" coordinate={courier}>
							<View style={classes.pointContianer}>
								<TrackIcon />
							</View>
						</Marker>
					)}
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
