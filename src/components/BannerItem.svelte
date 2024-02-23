<script lang="ts">
    export let imgSrc: string;
</script>

<li class="banner-list-item">
    <img src={imgSrc}>
    <span><slot></slot></span>
</li>


<style lang="scss">
    .banner-list-item {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 17px;
        font-size: 24px;
    }

    img {
        margin-right: 20px;
    }

    @media (max-width: 767.98px) {

        .banner-list-item {
            
            font-size: 16px;
            line-height: 20px;
            margin-bottom: 8px;

            img {
                height: 24px;
                width: 24px;
            }
        }

    }

    @media (min-width: 1200px) and (max-width: 1919.98px) {

        .banner-list-item {
            font-size: 21px;
        }

    }
</style>