<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: string;
  export let displayName: string;
  export let primaryColor: string = "#fff";
  export let secondaryColor: string = "#fff";
  export let tickColor: string = "#000";
  export let disabled: boolean = false;

  export let selectedValue: string | null = null;

  let dispatch = createEventDispatcher();
  function onChange(event?: any) {
    dispatch("change", { event: event.target.value });
  }
</script>

<label class="d-flex align-items-center mb-0 mb-lg-2 pb-1">
  <input
    class="variant"
    type="radio"
    on:change={onChange}
    bind:group={selectedValue}
    {value}
    style="--primary-color: {primaryColor}; --secondary-color: {secondaryColor}; --tick-color: {tickColor};"
    disabled={disabled}
  />
  <span class="d-inline-block ps-2 ms-1 pt-1 pt-lg-2 pb-1 pb-lg-2">{displayName}</span>
</label>

<style lang="scss">
  
  .variant {
    appearance: none; 
    position: relative;
    width: 24px; 
    height: 24px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    outline: none; 
    cursor: pointer;
    transition: background 0.3s ease; 

    &::before {
      content: " ";
      width: 24px;
      height: 24px;
      position: absolute;
      top: -2px;
      bottom: 0;
      left: -2px;
      right: 0;
      background: linear-gradient(
        to bottom,
        var(--secondary-color) 50%,
        var(--primary-color) 50%
      );
      border-radius: inherit;
    }

    &:checked::before {
      content: "✔";
      color: var(--tick-color);
      font-weight: bold; 
      text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
      left: -1px;
      padding-left: 4.5px;
    }
  }

</style>
