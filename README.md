# Svelte DeckGL

# Deck.gl and Mapbox
Head over to Deck.gl and Mapbox to see the official documentation to learn more.

# Install svelte-deck.gl
Install svelte-deck.gl
npm i svelte-deck.gl

# Usage
Import the component into your app/components

import SvelteDeckGL from "svelte-deck.gl";


### Using Mapbox
```
<script>
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import SvelteDeckGL from "svelte-deck.gl";

const DATA_URL = "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json";

const MAPBOX_TOKEN = "<YOUR_TOKEN>";

// Create you own Tooltip
function getTooltip({ object }) {
	if (!object) {
		return null;
	}

	const count = object.points.length;

	return (
		object &&
		`${object.position.join(", ")} 
		No. of bikes: ${count} `
	);
}
 
// Add the options for mapbox and the style
let viewState = {
	longitude: -122.4,
	latitude: 37.74,
	zoom: 11,
	maxZoom: 20,
	pitch: 30,
	bearing: 0,
	style: "mapbox://styles/arperyan/cj8n10t397cyn2rkap4ybrjid",
};

// Add your own layer
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
</style>```
