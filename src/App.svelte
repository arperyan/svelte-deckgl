<script>
    import { HexagonLayer } from "@deck.gl/aggregation-layers";
    import layer from "@deck.gl/core/dist/es5/lib/layer";
    import { afterUpdate, onMount } from "svelte";
    import { SvelteDeckGL } from "./components/components.module";

    export let data;

    //const DATA_URL = "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json";
    let DATA_URL = "";
    const MAPBOX_TOKEN = "pk.eyJ1IjoiYXJwZXJ5YW4iLCJhIjoiY2l4cTJkc2t6MDAzcjJxcG9maWp1ZmFjMCJ9.XT957ywrTABjNFqGdp_37g";

    let urlData = "";
    let deckInstance;

    const qlikData = () => {
        let obj = [];

        let newData = data?.qHyperCube.qDataPages[0].qMatrix.map((array) => {
            obj = { COORDINATES: [Number(array[0].qText), Number(array[1].qText)] };
            return obj;
        });
        return newData;
    };

    onMount(() => {
        layers();
    });

    function getTooltip({ object }) {
        if (!object) {
            return null;
        }

        const count = object.points.length;

        return object && `No. of bikes: ${count} `;
    }
    let viewState = {
        longitude: -122.4,
        latitude: 37.8,
        zoom: 11.2,
        maxZoom: 20,
        pitch: 50,
        bearing: -60,
        style: "mapbox://styles/arperyan/cj8n10t397cyn2rkap4ybrjid",
    };

    function layers() {
        return new HexagonLayer({
            id: "hexagon-layer",
            // data: data?.qHyperCube.qDataPages[0].qMatrix,
            //data: qlikData(),
            data: DATA_URL,
            pickable: true,
            extruded: true,
            radius: 200,
            autoHighlight: true,
            elevationScale: 4,
            getPosition: (d) => d.COORDINATES,
        });
    }

    /**
     *
     * @function dataChange - update the data using two way bimding
     */
    function dataChange() {
        deckInstance.setProps({ layers: [layers()] });
    }
    $: layers2 = layers();
</script>

<div class="App">
    <input type="text" bind:value={DATA_URL} /><button on:click={dataChange}>Update</button>
    <SvelteDeckGL layers={layers2} {viewState} {getTooltip} TOKEN={MAPBOX_TOKEN} bind:deck={deckInstance} />
</div>

<style>
    .App {
        height: 100vh;
        width: 100vw;
    }
</style>
