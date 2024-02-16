<script lang="ts">
  import CardHeader from "./components/CardHeader.svelte";
  import HeaderQuiz from "./components/HeaderQuiz.svelte";
  import FooterQuiz from "./components/FooterQuiz.svelte";

  import CardDefaultColumns from "./components/CardDefaultColumns.svelte";
  import CardSixColumns from "./components/CardSixColumns.svelte";
  import CardEightColumns from "./components/CardEightColumns.svelte";
  import CardTwelveColumns from "./components/CardTwelveColumns.svelte";
  import SelectedCardElement from "./components/SelectedCardElement.svelte";

  import { windowSize } from "@sveu/browser";
  import { getCarsData, type CarInfo } from "./stores/carInfoStore";
  import QuizCard from "./components/QuizCard.svelte";
  import RadioColoredList from "./components/RadioColoredList.svelte";
  import RadioList from "./components/RadioList.svelte";

  let firstBanner = true;

  let carVariants = getCarsData();

  const { width } = windowSize();
  $: isMobile = $width < 992;

  let selectedColor: string;
  let selectedTradeIn: string;
  let selectedPaymentMethod: string;

  let currentPage: number = 1;
  $: canGoPreviousPage = currentPage > 1;
  $: canGoNextPage = currentPage < 4;

  let currentPageValue: string;
  $: {
    switch (currentPage) {
      case 1:
        currentPageValue = selectedColor;
        break;
      case 2:
        currentPageValue = selectedTradeIn;
        break;
      case 3:
        currentPageValue = selectedPaymentMethod;
        break;
    }
  }

  async function getVariantByValue(value: string): Promise< CarInfo | undefined > {
    const variant = await carVariants; 
    return variant.find((variant) => variant.value === value);
  }

  async function getPreviewImage(value: string) {
    let variant = await getVariantByValue(value);
    if(variant === undefined) {
      return '/assets/img/black.png';
    }
    return variant.previewImage;
  }

  function nextPage() {
    if (!canGoNextPage) {
      return;
    }
    currentPage += 1;
  }

  function previousPage() {
    if (!canGoPreviousPage) {
      return;
    }
    currentPage -= 1;
  }

  function onColorChange(event?: any) {
    selectedColor = event.detail.event;
    if (currentPage >= 2 || isMobile) {
      return;
    }
    nextPage();
  }

  function onTradeInChange(event?: any) {
    selectedTradeIn = event.detail.event;
    if (currentPage >= 3 || isMobile) {
      return;
    }
    nextPage();
  }

  function onPaymentMethodChange(event?: any) {
    selectedPaymentMethod = event.detail.event;
  }

  let isMailSent = false;

  async function sendMail(event: SubmitEvent) {
      if(!event.target) {  throw new Error("bad target");  }
      let formData = new FormData(event.target as HTMLFormElement);
      
      const data = await fetch('./send.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      
      isMailSent = true;
  }
</script>

<HeaderQuiz></HeaderQuiz>

<main>

  {#if firstBanner}
  <section class="banner">
    <div class="container">
      <div class="row w-100">
        <div class="col-12">
          <div class="banner-content text-start">
            <div class="banner-content-title">
              <h1>JAECOO J7 </h1>
              <p class="h2">с рекордной выгодой</p>
              <p class="h3">до <b>1 000 000 ₽</b></p>
            </div>
            <ul class="banner-list">
              <li>
                <img src="./img/icons/icon-banner-1.svg" >
                <span>Дарим бонусы по TRADE IN</span>
              </li>
              <li>
                <img src="./img/icons/icon-banner-2.svg" >
                <span>Авторассрочка до 78 месяцев</span>
              </li>
              <li>
                <img src="./img/icons/icon-banner-3.svg" >
                <span>Автомобили в наличии с ПТС</span>
              </li>
              <li>
                <img src="./img/icons/icon-banner-4.svg" >
                <span>Гарантия до 7 лет</span>
              </li>
            </ul>
            <div class="banner-btn-wrap">
              <button class="text-uppcase banner-btn" on:click={() => firstBanner = false}>Подобрать автомобиль</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/if}

  {#if !((selectedColor && !isMobile && selectedTradeIn && selectedPaymentMethod) || (isMobile && currentPage === 4)) && !firstBanner}
  <section class="pages">
    <div class="container my-4">
      <div class="row">
        <CardDefaultColumns>
          <div class="page" class:selected={currentPage === 1}>
            <QuizCard {currentPage}>
              <CardHeader slot="cardHeader" index={1} title="Выберите цвет" />
              {#await carVariants}
              {:then variants}
              <RadioColoredList
                variants={variants}
                bind:selectedValue={selectedColor}
                on:change={onColorChange}
              />
              {:catch}
              {/await}
            </QuizCard>
          </div>
        </CardDefaultColumns>
        <CardEightColumns>
          <div class="row">
            <CardSixColumns>
              <div
                class="page"
                class:inactive={!selectedColor}
                class:selected={currentPage === 2}
              >
                <QuizCard {currentPage}>
                  <CardHeader
                    slot="cardHeader"
                    index={2}
                    title="Планируете ли сдавать свой авто в trade-in?"
                  />
                  <RadioList
                    variants={[
                      { value: "Да", displayName: "Да" },
                      { value: "Нет", displayName: "Нет" },
                      { value: "Еще не определился", displayName: "Еще не определился" },
                    ]}
                    bind:selectedValue={selectedTradeIn}
                    on:change={onTradeInChange}
                    disabled={!selectedColor}
                  />
                </QuizCard>
              </div>
            </CardSixColumns>
            <CardSixColumns>
              <div
                class="page"
                class:inactive={!selectedTradeIn}
                class:selected={currentPage === 3}
              >
                <QuizCard {currentPage}>
                  <CardHeader
                    slot="cardHeader"
                    index={3}
                    title="Как планируете приобретать автомобиль?"
                  />
                  <RadioList
                    variants={[
                      { value: "Кредит", displayName: "Кредит" },
                      { value: "Наличные", displayName: "Наличные" },
                      { value: "Лизинг", displayName: "Лизинг" },
                      { value: "Рассрочка", displayName: "Рассрочка" },
                    ]}
                    bind:selectedValue={selectedPaymentMethod}
                    on:change={onPaymentMethodChange}
                    disabled={!selectedTradeIn}
                  />
                </QuizCard>
              </div>
            </CardSixColumns>
            <CardTwelveColumns>
              <div class="preview-img-wrap text-end w-100">
                {#await getPreviewImage(selectedColor)}
                {:then previewImage }
                  <img
                      src={previewImage}
                      class="img-fluid"
                      class:opacity-50={!selectedColor}
                  />
                {:catch}
                {/await}
              </div>
            </CardTwelveColumns>
          </div>
        </CardEightColumns>
      </div>
    </div>
  </section>
  {/if}

  {#if (isMobile && !firstBanner && !(currentPage === 4))}
  <div class="controls">
    <button class="bg-yawhite" on:click={previousPage} disabled={!canGoPreviousPage}>
      <img src="./img/icons/arrow-left.svg" class="me-2" alt=""> 
      Назад
    </button>
    <button class="bg-yawhite" on:click={nextPage} disabled={!canGoNextPage || !currentPageValue}>
      Далее
      <img src="./img/icons/arrow-right.svg" class="ms-2" alt="">
    </button>
  </div>
  {/if}

  {#if (selectedColor && !isMobile && selectedTradeIn && selectedPaymentMethod) || (isMobile && currentPage === 4) && !firstBanner}
  <div class="container pt-2 pt-lg-4">
    <div class="row flex-column-reverse flex-lg-row my-4 py-2">
      <CardSixColumns>
        <div class="final-image-wrap">
          {#await getVariantByValue(selectedColor)}
          {:then variant }
          <img src={variant?.finalImage} class="img-fluid" alt="">
          {:catch}
          {/await}
        </div>
        <div class="final-name-car">
          <span>jaecoo j7</span>
        </div>
      </CardSixColumns>
      <CardSixColumns>
        <div class="final-info-wrap h-100" >
          {#if (isMailSent)}
          <div class="thx-txt-wrap d-flex align-items-center h-100">
            <div class="text-center text-lg-start mt-3 mt-lg-0">
              <h2 class="h2 pb-2">
                СПАСИБО! <br>
                Заявка отправлена!
              </h2>
              <p class="fw-normal h4">
                Наш менеджер свяжется  <br>
                с Вами в ближайшее время
              </p>
            </div>
          </div>
          {:else}
          <div class="final-text">
            <p class="h3">За вашим номером закреплен бонус от салона: </p>
            <p class="h1 fw-bold pt-1">КАСКО В ПОДАРОК</p>
            <p class="h5 pt-3">По вашим параметрам найдено 5 автомобилей</p>
          </div>
          <div class="final-form-wrap mt-4">
            <form  on:submit|preventDefault={sendMail}  id="finalForm">
              <div>
                <input type="hidden" class="w-100" name="valueColorCar" id="valueSelectedColorCar" bind:value={selectedColor}>
                <input type="hidden" class="w-100" name="valueTradeIn" id="valueSelectedTradeIn" bind:value={selectedTradeIn}>
                <input type="hidden" class="w-100" name="valuePayment" id="valueSelectedPayment" bind:value={selectedPaymentMethod}>
              </div>
              <div class="me-0 me-lg-3 mb-2 mb-lg-3 pb-1 pb-lg-0">
                <input type="text" class="w-100 mb-0" name="name" id="name" placeholder="Имя" required >
              </div>
              <div class="me-0 me-lg-3 mb-2 mb-lg-2 pb-1 pb-lg-0">
                <input type="text" class="w-100 mb-0" name="phone" id="phone" placeholder="Телефон" required >
              </div>
              <div class="ms-0 ms-lg-1 ms-lg-0">
                <button type="submit" class="w-100 border-0 text-uppercase" id="finalButton" role="sendForm" >
                  <span class="py-2 ps-2 pe-3 me-1">Получить подборку</span>
                </button>
              </div>
            </form>
          </div>
          {/if}
        </div>
      </CardSixColumns>
    </div>
  </div>
  <section class="choosed d-none d-lg-block" id="choosed">
    <div class="container">
      <div class="row">
        <CardDefaultColumns>
          <QuizCard>
            <CardHeader
              slot="cardHeader"
              index={1}
              title="Выберите цвет"
            />
          </QuizCard>
          {#await getVariantByValue(selectedColor)}
          {:then variant }
          <SelectedCardElement>
            <div 
              class="selected-card-el" 
              style="--primary-color: {variant?.primaryColor}; --secondary-color: {variant?.secondaryColor}; --tick-color: {variant?.tickColor};"
            >
            </div>
            <div>
              {variant?.displayName}  
              <!-- {selectedColor} -->
            </div>
          </SelectedCardElement>
          {:catch}
          {/await}
        </CardDefaultColumns>
        <CardDefaultColumns>
          <QuizCard>
            <CardHeader
              slot="cardHeader"
              index={2}
              title="Планируете ли сдавать свой авто в trade-in?"
            />
          </QuizCard>
          <SelectedCardElement>
            <div class="selected-card-el">
            </div>
            <div>
              {selectedTradeIn}
            </div>
          </SelectedCardElement>
        </CardDefaultColumns>
        <CardDefaultColumns>
          <QuizCard>
            <CardHeader
              slot="cardHeader"
              index={3}
              title="Как планируете приобретать автомобиль?"
            />
          </QuizCard>
          <SelectedCardElement>
            <div class="selected-card-el">
            </div>
            <div>
              {selectedPaymentMethod}
            </div>
          </SelectedCardElement>
        </CardDefaultColumns>
      </div>
    </div>
  </section>
  {/if} 

</main>

<FooterQuiz></FooterQuiz>

<style lang="scss">

  .banner {

    background-image: url('./img/main-bg.jpeg');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    min-height: calc(100vh - 88px);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;
    }
    .container > div {
      display: flex;
      flex-grow: 1;
    }

  }

  .banner::after,
  .banner::before {
    position: absolute;
    content: ' ';
    opacity: 0.52;
  }

  .banner::after {
    top: 0;
    right: 0;
    background-image: url('./img/el-banner-1.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 36%;
    height: 36%;
  }
  
  .banner::before {
    bottom: 0;
    left: 0;
    background-image: url('./img/el-banner-2.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 45%;
    height: 33%;
  }

  .banner-content {

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;

    h1 {
      font-size: 74px;
      font-weight: 700;
      line-height: 100px;
    }

    .h2 {
      font-size: 54px;
      font-weight: 300 !important;
      line-height: 73px;
      text-transform: uppercase;
    }

    .h3 {
      font-size: 36px;
      font-weight: 400;
      line-height: 45px;
    }

    .h3 span {
      font-size: 58px;
      font-weight: 400;
      line-height: 73px;
    }

    .banner-content-title {
      margin-top: 44px;
      margin-bottom: 44px;
    }

    .banner-list {

      padding-left: 0;
      margin-left: 0;
      z-index: 3;

      li {
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

    }

    .banner-btn-wrap {
      margin-top: 25px;
      text-align: left;
      z-index: 3;
    }

    .banner-btn {
      display: inline-block;
      text-align: center;
      line-height: 1;
      background-color: #00657B;
      color: #fff;
      width: 100%;
      max-width: 354px;
      text-transform: uppercase;
      height: 70px;
    }

  }

  .controls {

    display: flex;
    justify-content: space-between;

    .bg-yawhite {
      background-color: #fff;
    }

    button {
      color: #000;
    }

    button:disabled {
      color: #ABBBBE;

      img {
        opacity: 0.4;
      }
    }

  }

  .preview-img-wrap {
    display: flex;
    justify-content: flex-end;
  }

  .final-info-wrap {

  }

  .final-text,
  #finalForm {
    text-align: left;
  }

  .final-name-car span {
    color: rgb(171, 187, 190);
    font-size: 86px;
    font-weight: 700;
    line-height: 112px;
    letter-spacing: 0%;
    text-align: left;
    text-transform: uppercase;
  }

  .final-form-wrap {

  }

  #finalForm input {
    height: 70px;
    background-color: #fff;
    margin-bottom: 20px;
    color: #000;
    padding: 25px;
    max-width: 520px;
    box-sizing: border-box;
    border: 1px solid rgb(171, 187, 190);
  }

  #finalForm input::placeholder {
    color: #636B70;
    border-color: #ABBBBE;
  }

  #finalForm #finalButton {
    background-color: #00657B;
    height: 70px;
    max-width: 320px;
    color: #fff;
    font-size: 18px;
    letter-spacing: 1%;
    margin-top: 20px;
    border: 0;
  }

  .selected-card-el {
    display: inline-block;
    margin-right: 14px;
    margin-left: 2px;
    position: relative;
    width: 25px;
    height: 25px;
    border: 1px solid #636B70;
    border-radius: 50%;
    outline: none; 

    &::before {
      content: " ";
      width: calc(100%);
      height: calc(100%);
      position: absolute;
      top: 0px;
      bottom: 0;
      left: 0px;
      right: 0;
      background: linear-gradient(
        to bottom,
        var(--secondary-color) 50%,
        var(--primary-color) 50%
      );
      border-radius: inherit;
    }

    &::after {
      content: "✔";
      color: var(--tick-color);
      font-weight: bold;
      text-shadow: 0px 0px 0px rgba(255, 255, 255, 0.5);
      left: -0.5px;
      padding-left: 5.5px;
      font-weight: 600;
      padding-top: 1.5px;
      z-index: 5;
      position: absolute;
    }

  }

  .selected-card-el::after {
    
  }

  .choosed {
    background: #F6F7F7;
    padding-top: 75px;
    padding-bottom: 110px;
  }

  .page {

    opacity: 1;

    &.inactive {
      opacity: 0.5;
    }

    @media (max-width: 991.98px) {

      &.selected {
        display: block;
      }

      &:not(.selected) {
        display: none;
      }

    }

  }

  @media (max-width: 1199.98px) {

    .banner-content {

      h1 {
        font-size: 62px;
        line-height: 75px;
      }

      .h2 {
        font-size: 28px;
      }

      .h3 {
        font-size: 28px;
        line-height: 30px;
      }

      .h3 span {
        font-size: 38px;
        font-weight: 400;
        line-height: 45px;
      }

    }

    .final-name-car span {
      font-size: 74px;
    }

  }

  @media (max-width: 991.98px) {

    .final-image-wrap {
      margin-top: 22px;
    }

    #finalForm input,
    #finalForm #finalButton {
      height: 40px;
      font-size: 13px;
      padding: 0px 17px 0 17px;
    }

    #finalForm input::placeholder {
      font-size: 13px;
    }

    #finalForm #finalButton {
      max-width: 100%;
    }
    .controls {
      border-top: 1px solid #C0CCCE;
    }

  }


  @media (max-width: 767.98px) {

    .banner {
      background-image: url('./img/main-bg-sm.jpeg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 76%;
    }

    .banner::after {
      width: 55%;
      height: 55%;
    }
    
    .banner::before {
      background-image: url('./img/icons/decorative-bottom.svg');
      background-repeat: no-repeat;
      background-size: contain;
      width: 90%;
      height: 17%;
    }

    .banner-content {

      height: 100%;
      justify-content: space-around;

      h1 {
        font-size: 60px;
        line-height: 75px;
      }

      .h2 {
        font-size: 24px;
        font-weight: 300;
      }

      .h3 {
        font-size: 24px;
        font-weight: 400;
        line-height: 30px;
      }

      .h3 span {
        font-size: 36px;
        font-weight: 400;
        line-height: 45px;
      }

      .banner-content-title {
        margin-top: 55px;
        margin-bottom: 22px;
        padding-bottom: 22px;

        h1 {
          padding-top: 26px;
          margin-bottom: 0;
        }
        .h2 {
          margin-bottom: 0;
          padding-bottom: 3px;
          line-height: 1.75;
        }
      }

      .banner-list {
        padding-top: 232px;
        padding-left: 0;
        margin-left: 0;

        li {
          font-size: 16px;
          line-height: 20px;
          margin-bottom: 8px;
        }
        img {
          height: 24px;
          width: 24px;
        }

      }

      .banner-btn-wrap {
        margin-top: 10px;
        margin-bottom: 45px;
        padding-bottom: 30px;
        text-align: left;
      }

      .banner-btn {
        letter-spacing: 1%;
        font-size: 16px;
        width: 100%;
        max-width: 354px;
        text-transform: uppercase;
        height: 70px;
      }

    }

    .final-name-car span {
      font-size: 45px;
    }

    .final-text p.h3 {
      font-size: 15px;
    }

    .final-text p.h1 {
      font-size: 30px;
    }

    .final-text p.h5 {
      font-size: 14px;
    }

  }

  @media (max-width: 479.98px) {

    .banner {
      background-image: url('./img/main-bg-xs-new.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 74%;

      .banner-content {

        .banner-content-title {
          margin-top: 40px;
        }

        .banner-btn-wrap {
          text-align: center;
        }

        .banner-btn {
          width: 100%;
          max-width: 284px;
          height: 50px;
        }

      }

      .banner-list {
        padding-top: 120px;
      }

      .banner-content-title {
        h1 {
          padding-top: 5px;
        }
      }

    }

  }

  @media (max-width: 359.98px) {

    .banner-content {

      h1 {
        font-size: 50px;
      }

    }

  }

  @media (min-width: 1200px) and (max-width: 1919.98px) {

    .banner-content {

      .banner-content-title {
        margin-top: 32px;
        margin-bottom: 28px;
      }

      h1 {
        font-size: 64px;
        line-height: 80px;
      }

      .h2 {
        font-size: 44px;
        line-height: 60px;
      }

      .h3 {
        font-size: 46px;
        line-height: 60px;
      }

      .banner-list {

        li {
          font-size: 21px;
        }

      }

    }

    .preview-img-wrap {
      max-width: 686px;
      margin-left: auto;
      padding-right: 15px;
    }

  }

</style>
