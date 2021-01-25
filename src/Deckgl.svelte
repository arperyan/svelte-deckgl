<script>
    import { Deck } from "@deck.gl/core";
    import mapbox from "mapbox-gl";
    import { tick, onMount } from "svelte";

    /** @type {object} */
    let map = null;
    /** @type {object} */
    let deck = null;
    /** @type {HTMLElement} */
    let deckMap;
    /** @type {HTMLElement} */
    let deckCanvas;

    /** @type {object} */
    let options = {};

    export let layers = [];
    export let viewState;
    export let TOKEN;
    export let getTooltip = () => {};

    onMount(() => {
        // creating the map
        mapbox.accessToken = TOKEN;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

        const optionsWithDefaults = Object.assign(
            {
                container: deckMap,
                style: viewState.style,
                center: [viewState.longitude, viewState.latitude],
                zoom: viewState.zoom,
                interactive: false,
                bearing: viewState.bearing,
                pitch: viewState.pitch,
            },
            options
        );

        document.head.appendChild(link);

        link.onload = async () => {
            map = new mapbox.Map(optionsWithDefaults);
            await tick();
            render();
        };

        return () => {
            map.remove();
            link.parentNode.removeChild(link);
        };
    });

    // creating the deck.gl instance
    const render = () => {
        deck = new Deck({
            canvas: deckCanvas,
            width: "100%",
            height: "100%",
            initialViewState: viewState,
            controller: true,
            layers: [layers],
            onViewStateChange: ({ viewState }) => {
                map.jumpTo({
                    center: [viewState.longitude, viewState.latitude],
                    zoom: viewState.zoom,
                    bearing: viewState.bearing,
                    pitch: viewState.pitch,
                });
            },
            getTooltip,
        });
        deck.setProps({ layers: [layers] });
    };
</script>

<div class="deck-container">
    <div id="map" bind:this={deckMap} />
    <canvas id="deck-canvas" bind:this={deckCanvas} />
</div>

<style>
    .deck-container {
        width: 100%;
        height: 100%;
        position: relative;
    }
    #map {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #e5e9ec;
        overflow: hidden;
    }
    #deck-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
