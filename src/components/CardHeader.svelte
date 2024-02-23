<script lang="ts">
  export let index: number;
  export let title: string;
</script>

<div class="card-title">
  <div class="card-index">
    <span>{index}</span>
  </div>
  <div class="card-quiestion">
    <p>{title}</p>
  </div>
</div>

<style scoped lang="scss">
  
  .card-title {
    display: flex;
    align-items: center;
    padding: 5px 0;

    p {
      text-align: left;
      margin-bottom: 0;
      max-width: 254px;
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
    }

  }

  .page {

    .card-title p {
      font-weight: 600;
      text-transform: uppercase;
    }

  }

  .card-index {
    display: inline-block;
    background-color: #abbbbe;
    padding: 4px 15px;
    margin-right: 20px;
    line-height: 1;

    span {
      font-size: 48px;
      color: #fff;
      min-width: 26px;
    }

  }

  @media (max-width: 767.98px) {

    .card-title p {
      font-size: 16px;
    }

    .card-index {
      padding: 4px 10px;

      span {
        font-size: 24px;
      }

    }

  }

</style>
