// =========================================
// 画面内に入ったらclass付与（inview）
// =========================================
$(function () {
  $(".inview").on("inview", function () {
    $(this).addClass("show");
  });
});

// =========================================
// トップ遷移ボタン：表示制御＋フッター直前で停止（余白あり）
//  - スマホの慣性スクロールで一瞬フッターを越す現象を抑制
//  - requestAnimationFrameで更新を同期
// =========================================
const $topBtn = $(".top-btn");
const $footer = $("footer");

// 通常時の下余白（px）
const baseBottom = 32;

// フッターとボタンの間に空けたい余白（px）
const footerMarginPC = 16;  // PC/タブレット
const footerMarginSP = 24;  // スマホ

// showの閾値
const showThreshold = 300;

// rAF制御
let topBtnTicking = false;

function getViewportHeight() {
  return window.innerHeight || $(window).height();
}

function updateTopBtnVisibility(scrollTop) {
  if (!$topBtn.length) return;
  if (scrollTop > showThreshold) $topBtn.addClass("is-show");
  else $topBtn.removeClass("is-show");
}

function updateTopBtnPosition() {
  if (!$topBtn.length || !$footer.length) return;

  // フッター位置は毎回取り直す（画像遅延読み込み/レイアウト変化に追随）
  const footerTop = $footer.offset().top;

  const scrollTop = $(window).scrollTop();
  const winH = getViewportHeight();
  const viewportBottom = scrollTop + winH;

  // 画面幅で余白を切り替え
  const margin = window.innerWidth < 768 ? footerMarginSP : footerMarginPC;

  // フッターに被る分だけ押し上げる
  let overlap = viewportBottom - footerTop - baseBottom + margin;
  overlap = Math.max(0, overlap);

  $topBtn.css("bottom", baseBottom + overlap + "px");
}

function updateTopBtnAll() {
  const scrollTop = $(window).scrollTop();
  updateTopBtnVisibility(scrollTop);
  updateTopBtnPosition();
}

function requestTopBtnUpdate() {
  if (topBtnTicking) return;
  topBtnTicking = true;
  requestAnimationFrame(() => {
    updateTopBtnAll();
    topBtnTicking = false;
  });
}

// スクロール系：取りこぼし対策で複数拾う
$(window).on("scroll resize orientationchange", requestTopBtnUpdate);
window.addEventListener("touchmove", requestTopBtnUpdate, { passive: true });
window.addEventListener("touchend", requestTopBtnUpdate, { passive: true });

// 初回
requestTopBtnUpdate();

// トップ遷移ボタンをクリックするとトップに遷移する
$(".top-btn-scroll").on("click", function () {
  window.scrollTo({ top: 0 });
});

// =========================================
// マウスストーカー
// =========================================
$(function () {
  const $stalker = $("#js-stalker");
  if (!$stalker.length) return;

  $stalker.css("opacity", "1");

  $(document).on("mousemove", function (e) {
    $stalker.css("transform", `translate(${e.clientX}px, ${e.clientY}px)`);
  });
});

// =========================================
// メイン画像の切り替え（title点滅）
// =========================================
$(function () {
  const CLASSNAME = "-visible";
  const INTERVAL = 1500;
  const $title = $(".title");
  if (!$title.length) return;

  setInterval(() => {
    $title.addClass(CLASSNAME);
    setTimeout(() => {
      $title.removeClass(CLASSNAME);
    }, INTERVAL);
  }, INTERVAL * 2);
});

// =========================================
// Swiper
// =========================================
$(function () {
  if (!$(".swiper1").length) return;

  new Swiper(".swiper1", {
    loop: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000,
  });
});

// =========================================
// ドロワーメニュー
// =========================================
$(function () {
  $(".drawer_button").on("click", function () {
    $(this).toggleClass("active");
    $(".drawer_nav_wrapper").toggleClass("open");
    $(".drawer_bg").fadeToggle(150);
    requestTopBtnUpdate();
  });

  $(".drawer_bg").on("click", function () {
    $(".drawer_button").removeClass("active");
    $(".drawer_nav_wrapper").removeClass("open");
    $(this).hide();
    requestTopBtnUpdate();
  });
});

// =========================================
// 採用情報：タブ切り替え
// =========================================
$(function () {
  const $tabs = $(".tab");
  if (!$tabs.length) return;

  $tabs.on("click", function () {
    $(".tab.active").removeClass("active");
    $(this).addClass("active");

    const index = $tabs.index(this);
    $(".content").removeClass("show").eq(index).addClass("show");

    requestTopBtnUpdate();
  });
});

// =========================================
// ページ内アンカー（#）のスムーススクロール
// =========================================
$(function () {
  $('a[href^="#"]').on("click", function () {
    const adjust = 90;
    const speed = 400;

    const href = $(this).attr("href");
    const $target = $(href === "#" || href === "" ? "html" : href);
    if (!$target.length) return false;

    const position = $target.offset().top - adjust;

    $("html,body").animate({ scrollTop: position }, speed, "swing", function () {
      requestTopBtnUpdate();
    });

    return false;
  });
});
