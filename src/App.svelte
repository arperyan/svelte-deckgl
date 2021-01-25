<script>
	import { csv as requestCsv } from "d3-request";
	import Map from "./Map.svelte";
	import { HexagonLayer } from "@deck.gl/aggregation-layers";
	import {
		AmbientLight,
		PointLight,
		LightingEffect,
		Deck,
	} from "@deck.gl/core";
	import { GeoJsonLayer, ArcLayer } from "@deck.gl/layers";
	import SvelteDeckgl from "./Map.svelte";

	let maps;
	let deck;

	let canVas;
	let data;
	const AIR_PORTS =
		"https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";
	const DATA_URL =
		"https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv";
	const MAPBOX_TOKEN =
		"pk.eyJ1IjoiYXJwZXJ5YW4iLCJhIjoiY2l4cTJkc2t6MDAzcjJxcG9maWp1ZmFjMCJ9.XT957ywrTABjNFqGdp_37g";

	const INITIAL_VIEW_STATE = {
		// Default
		style: "mapbox://styles/arperyan/cj8n10t397cyn2rkap4ybrjid",
		accessToken: MAPBOX_TOKEN,
		longitude: -1.415727,
		latitude: 52.232395,
		zoom: 6.6,
		pitch: 40.5,
		bearing: -27,
	};
	console;
	const ambientLight = new AmbientLight({
		color: [255, 255, 255],
		intensity: 1.0,
	});

	const pointLight1 = new PointLight({
		color: [255, 255, 255],
		intensity: 0.8,
		position: [-0.144528, 49.739968, 80000],
	});

	const pointLight2 = new PointLight({
		color: [255, 255, 255],
		intensity: 0.8,
		position: [-3.807751, 54.104682, 8000],
	});

	const lightingEffect = new LightingEffect({
		ambientLight,
		pointLight1,
		pointLight2,
	});

	const material = {
		ambient: 0.64,
		diffuse: 0.6,
		shininess: 32,
		specularColor: [51, 51, 51],
	};

	const colorRange = [
		[1, 152, 189],
		[73, 227, 206],
		[216, 254, 181],
		[254, 237, 177],
		[254, 173, 84],
		[209, 55, 78],
	];

	// const layers = [
	// 	new HexagonLayer({
	// 		id: "heatmap",
	// 		colorRange,
	// 		coverage: 0.7,
	// 		data,
	// 		autoHighlight: true,
	// 		elevationRange: [0, 3000],
	// 		elevationScale: data && data.length ? 50 : 0,
	// 		extruded: true,
	// 		getPosition: (d) => console.log(d),
	// 		pickable: true,
	// 		radius: 2000,
	// 		upperPercentile: 100,
	// 		material,

	// 		transitions: {
	// 			elevationScale: 3000,
	// 		},
	// 	}),
	// ];

	const layers = new HexagonLayer({
		id: "heatmap",
		colorRange: colorRange,
		data: [
			[-0.198465, 51.505538],
			[-0.178838, 51.491836],
			[-0.20559, 51.51491],
			[-0.208327, 51.514952],
			[-0.206022, 51.496572],
			[-0.19361, 51.500788],
			[-0.173519, 51.495171],
			[-0.163542, 51.492497],
			[-0.21198, 51.513659],
			[-0.199786, 51.5159],
			[-0.216407, 51.518402],
			[-0.184495, 51.501726],
			[-0.172522, 51.491289],
		],
		// data,
		elevationRange: [0, 1000],
		elevationScale: 250,
		extruded: true,
		getPosition: (d) => d,
		opacity: 1,
	});
	// const layers = [
	// 	new GeoJsonLayer({
	// 		id: "airports",
	// 		data: AIR_PORTS,
	// 		// Styles
	// 		filled: true,
	// 		pointRadiusMinPixels: 2,
	// 		pointRadiusScale: 2000,
	// 		getRadius: (f) => 11 - f.properties.scalerank,
	// 		getFillColor: [200, 0, 80, 180],
	// 		// Interactive props
	// 		pickable: true,
	// 		autoHighlight: true,
	// 		onClick: (info) =>
	// 			// eslint-disable-next-line
	// 			info.object &&
	// 			alert(
	// 				`${info.object.properties.name} (${info.object.properties.abbrev})`
	// 			),
	// 	}),
	// 	new ArcLayer({
	// 		id: "arcs",
	// 		data: AIR_PORTS,
	// 		dataTransform: (d) =>
	// 			d.features.filter((f) => f.properties.scalerank < 4),
	// 		// Styles
	// 		getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
	// 		getTargetPosition: (f) => f.geometry.coordinates,
	// 		getSourceColor: [0, 128, 200],
	// 		getTargetColor: [200, 0, 80],
	// 		getWidth: 1,
	// 	}),
	// ];

	requestCsv(DATA_URL, (error, response) => {
		if (!error) {
			data = response.map((d) => [Number(d.lng), Number(d.lat)]);
		}
	});
</script>

<div class="App">
	<SvelteDeckgl {layers} props={INITIAL_VIEW_STATE} />
</div>

<style>
	.App {
		height: 100%;
	}
</style>
