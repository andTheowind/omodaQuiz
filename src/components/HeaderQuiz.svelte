<header class="header bg-yadarksapphire py-2 py-lg-3">
  <div class="container px-xl-4">
    <div class="row justify-content-between align-items-center flex-wrap">
      <div
        class="сol-6 col-sm-12 col-lg-6 col-xl-4 col-sm-auto first-header-block justify-content-between justify-content-xl-start col-md-12 col-xl-4 d-flex align-items-center"
      >
        <div class="me-3 d-md-block">
          <a href="/" class="pt-0 pt-md-3 logo-link">
            <img src="./img/logo.svg" class="img-fluid" />
          </a>
        </div>
        <div class="d-flex justify-content-start align-items-center c-yawhite ms-1">
          <div class="logo-wrap-txt text-white ps-lg-3 pt-1">
            <div class="s-xs-14 s18 m-0 pt-1">Официальный дилер</div>
            <div class="s13 pt-0">г. Краснодар</div>
          </div>
        </div>
        <div class="d-md-block d-lg-none">
          <a
            href="#callback"
            class="head-btn bg-yalightsapphire ms-2 pt-1 pb-1 px-4 px-lg-5 w-100"
            data-remodal-target="callback"
          >
            <span class="d-none d-md-inline text-uppercase bg-yalightsapphire s12">
              Обратный звонок
            </span>
            <img src="./img/icons/phone.svg" class="d-md-none" />
          </a>
        </div>
      </div>
      <div
        class="сol-6 col-sm-12 col-lg-6 col-xl-8 col-sm-auto second-header-block d-flex align-items-md-center justify-content-md-between pt-lg-2 pt-xl-0"
      >
        
        <div class="header-group-blocks me-0 me-md-2 ms-0 ms-md-0 s-xs-12 s16">
          <a
            href="#"
            target="_blank"
            class="d-inline-flex w-auto text-white pt-md-1"
          >
            <img src="./img/header-phone.svg" class="ms-0 ms-sm-2 ps-1 me-0 me-md-2 pt-md-1" />
            <span class="d-inline-flex d-md-inline flex-row flex-sm-column ms-2 pt-1">
              пос. Яблоновский, <span class="nowrap-sm">ул. Краснодарская,3</span>
            </span>
          </a>
        </div>
        <div class="header-group-blocks me-0 me-md-2 ms-0 ms-md-0 s-xs-12 s16 mb-2 mb-sm-0" >
          <a href="tel:+78612032914" class="text-white">
            <img src="./img/header-mark.svg" class="ms-0 ms-sm-2 ps-1 me-0 me-md-2" />
            <span class="d-inline-block ms-1 pe-3">+7 (861) 203-29-14</span>
          </a>
        </div>
        <div class="header-group-blocks me-0 ms-md-2">
          <a
            href="#callback"
            class="d-none d-lg-block callback-btn py-2 px-2 px-xl-3 px-xxl-5 text-white w-100"
            data-remodal-target="callback"
          >
            <span class="d-none d-lg-inline text-uppercase bg-yalightsapphire s12">
              Обратный звонок
            </span>
            <img src="/assets/images/phone.svg" class="d-md-none" />
          </a>
        </div>
      </div>
    </div>
  </div>
</header>

<style>

  .header a,
  .header-group-blocks a {
    text-decoration: none;
  }

  .logo-wrap-txt {
    text-align: left;
  }

  .header-group-blocks .callback-btn,
  .first-header-block .head-btn {
    background-color: #00657b;
    color: #fff;
  }

  @media (max-width: 992px) {
    .first-header-block .head-btn {
      display: inline-block;
      padding-block: 11px;
    }
  }

  @media (max-width: 768px) {

    .logo-wrap-txt div,
    .header-group-blocks span {
      font-size: 14px !important;
    }

    .second-header-block {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

  }

  @media (max-width: 576px) {

    .first-header-block > div:first-child {
      max-width: 100px;
    }
    .logo-wrap-txt div {
      font-size: 10px !important;
    }
    .header-group-blocks span {
      font-size: 12px;
    }

    .first-header-block .head-btn {
      max-width: 28px;
      display: inline-flex;
      justify-content: center;
      padding: 3px 8px !important;
      margin-top: 6px;
    }

  }
    
</style>
