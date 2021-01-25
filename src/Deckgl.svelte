<script>
    import { Deck } from "@deck.gl/core";
    import {
        createEventDispatcher,
        onMount,
        onDestroy,
        afterUpdate,
    } from "svelte";

    const dispatch = createEventDispatcher();

    let deckCanvas;
    let deck;
    export let width = "100%";
    export let height = "100%";
    export let layers = [];
    export let viewState = {};
    export let getTooltip = () => {};
    export let maps;
    export let controller = true;
    export let effects;

    $: console.log(maps);

    const render = () => {
        deck = new Deck({
            canvas: deckCanvas,
            gl: maps.painter.context.gl,
            width: "100%",
            height: "100%",
            initialViewState: {
                longitude: -1.415727,
                latitude: 52.232395,
                zoom: 6.6,
                pitch: 40.5,
                bearing: -27,
            },
            layers: [layers],
            onViewStateChange: ({ viewState }) => {
                maps.jumpTo({
                    center: [viewState.longitude, viewState.latitude],
                    zoom: viewState.zoom,
                    bearing: viewState.bearing,
                    pitch: viewState.pitch,
                });
            },
            controller: true,
        });
        deck.setProps({
            layers: [layers],
        });
    };

    // afterUpdate(() => {
    //     render();
    // });

    onDestroy(() => {
        deck.finalize();
    });
</script>

<div class="deck-container" style="width: {width}; height:{height}">
    {#if maps}
        <canvas bind:this={deckCanvas} use:render />
    {/if}
</div>

<!--{#if map}
            <canvas bind:this={deckCanvas} use:render />
        {/if}-->
<style>
    .deck-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .deck-container > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
