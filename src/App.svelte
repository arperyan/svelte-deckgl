<script>
	import { csv as requestCsv } from "d3-request";
	import { HexagonLayer } from "@deck.gl/aggregation-layers";
	import SvelteDeckGL from "./Deckgl.svelte";

	let data;

	const DATA_URL =
		"https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json";

	const MAPBOX_TOKEN =
		"pk.eyJ1IjoiYXJwZXJ5YW4iLCJhIjoiY2l4cTJkc2t6MDAzcjJxcG9maWp1ZmFjMCJ9.XT957ywrTABjNFqGdp_37g";

	function getTooltip({ object }) {
		if (!object) {
			return null;
		}

		const count = object.points.length;

		return `${count} Accidents`;
	}
	let viewState = {
		longitude: -122.4,
		latitude: 37.74,
		zoom: 11,
		maxZoom: 20,
		pitch: 30,
		bearing: 0,
		style: "mapbox://styles/arperyan/cj8n10t397cyn2rkap4ybrjid",
	};

	const layers = new HexagonLayer({
		id: "hexagon-layer",
		data: DATA_URL,
		pickable: true,
		extruded: true,
		radius: 200,
		autoHighlight: true,
		elevationScale: 4,
		getPosition: (d) => d.COORDINATES,
	});
</script>

<div class="App">
	<SvelteDeckGL {layers} {viewState} {getTooltip} TOKEN={MAPBOX_TOKEN} />
</div>

<style>
	.App {
		height: 100%;
	}
</style>
