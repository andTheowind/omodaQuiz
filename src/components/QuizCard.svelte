<script lang="ts">
  export let currentPage: number = 0;
</script>
<div class="card border-0 bg-transparent p-0">
  <slot name="cardHeader" />

  <div class="row pt-2 mb-3 d-lg-none">
    <div class="col-4">
      <div class="line" class:line-active={currentPage >= 1}></div>
    </div>
    <div class="col-4">
      <div class="line" class:line-active={currentPage >= 2}></div>
    </div>
    <div class="col-4">
      <div class="line" class:line-active={currentPage >= 3}></div>
    </div>
  </div>

  <div class="variants mt-3">
    <slot />
  </div>
</div>

<style lang="scss">

  .card {
  
    .variants {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

  }

  .line {
    height: 5px;
    width: 100%;
    background-color: #ABBBBE;
  }

  .line.line-active {
    background-color: #054856;
  }

  @media (min-width: 992px) {

    .page {

      .card {
    
        .variants {
          border-top: 1px solid #C0CCCE;
          padding-top: 20px;
        }

      }

    }

  }

</style>
