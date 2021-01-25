<script>
    import { onMount } from "svelte";
    import mapbox from "mapbox-gl";
    import SvelteDeckgl from "./Deckgl.svelte";

    export let props;
    export let options;
    export let layers;

    let container;
    let map;

    let {
        longitude,
        latitude,
        zoom,
        bearing,
        pitch,
        style,
        accessToken,
    } = props;

    let viewState = {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
        bearing: bearing,
        pitch: pitch,
    };
    onMount(() => {
        mapbox.accessToken = accessToken;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

        const optionsWithDefaults = Object.assign(
            {
                container,
                style,
                center: [longitude, latitude],
                zoom,
                interactive: false,
                bearing,
                pitch,
            },
            options
        );

        link.onload = () => {
            map = new mapbox.Map(optionsWithDefaults);
        };

        document.head.appendChild(link);

        return () => {
            map.remove();
            link.parentNode.removeChild(link);
        };
    });
</script>

<div bind:this={container} class="map-container">
    <SvelteDeckgl {layers} maps={map} {viewState} />
</div>

<style>
    .map-container {
        width: 100%;
        height: 100%;
    }
</style>
