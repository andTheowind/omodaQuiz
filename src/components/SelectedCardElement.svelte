<div class="text-start selected-card-wrap">
  <slot />
</div>

<style scoped lang="scss">

  .selected-card-wrap {
    
    display: flex;
    align-items: center;
    font-weight: 600;
    line-height: 20px;
    font-size: 17px;

    &::first-letter {
    text-transform: uppercase;
    }

  }

</style>