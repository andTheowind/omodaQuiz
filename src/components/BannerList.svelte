<script lang="ts">
    import BannerItem from './BannerItem.svelte';
</script>

<ul class="banner-list">
    <BannerItem imgSrc="./img/icons/icon-banner-1.svg">Дарим бонусы по TRADE IN</BannerItem>
    <BannerItem imgSrc="./img/icons/icon-banner-2.svg">Авторассрочка до 78 месяцев</BannerItem>
    <BannerItem imgSrc="./img/icons/icon-banner-3.svg">Автомобили в наличии с ПТС</BannerItem>
    <BannerItem imgSrc="./img/icons/icon-banner-4.svg">Гарантия до 7 лет</BannerItem>
</ul>

<style lang="scss">
    .banner-list {

        padding-left: 0;
        margin-left: 0;
        z-index: 3;
        
    }

    @media (max-width: 767.98px) {

        .banner-list {

            padding-top: 232px;
            padding-left: 0;
            margin-left: 0;

        }

    }

    @media (max-width: 479.98px) {

        .banner-list {
            padding-top: 120px;
        }

    }
</style>