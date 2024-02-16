<script lang="ts">
  import type { RadioButtonData } from "../lib/radio";

  import RadioButton from "./RadioButton.svelte";
  import { createEventDispatcher } from "svelte";

  export let variants: RadioButtonData[];
  export let selectedValue: string | null = null;
  export let disabled: boolean = false;

  let primaryColor: string = "#fff";
  let secondaryColor: string = primaryColor;
  let tickColor: string = "#000";

  let dispatch = createEventDispatcher();
  function onChange(event?: any) {
    console.log('event = ', event );
    console.log('event detail = ', event.detail );
    dispatch("change", { 
      value: event.detail
    });
  }
</script>

{#each variants as { value, displayName }}
  <RadioButton
    {value}
    {displayName}
    {primaryColor}
    {secondaryColor}
    {tickColor}
    bind:selectedValue
    on:change={onChange}
    {disabled}
  />
{/each}
