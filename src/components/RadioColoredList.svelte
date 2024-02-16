<script lang="ts">
  import type { RadioVariant } from "../lib/radio";

  import RadioButton from "./RadioButton.svelte";
  import { createEventDispatcher } from "svelte";

  export let variants: RadioVariant[];
  export let selectedValue: string | null = null;
  export let disabled: boolean = false;

  let dispatch = createEventDispatcher();
  function onChange(event?: any) {
    dispatch("change", { 
      value: event.detail
    });
  }
</script>

{#each variants as { value, displayName, primaryColor, secondaryColor, tickColor }}
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
