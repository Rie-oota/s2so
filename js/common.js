// 表示領域に入ったらclass付与
$(function () {
  $(".inview").on("inview", function () {
    $(this).addClass("show");
  });
});

// ------------------------------
// トップ遷移ボタン：表示制御＋フッター直前で停止（少し余白あり）
// ------------------------------
const $topBtn = $(".top-btn");
const $footer = $("footer");

// 通常時の下余白（px）
const baseBottom = 32; // 2rem相当（root 16px想定）

// フッターとボタンの間に空けたい余白（px）
const footerMarginPC = 16;  // PC/タブレット
const footerMarginSP = 24;  // スマホ（少し多め推奨）

function updateTopBtnPosition() {
  if (!$topBtn.length || !$footer.length) return;

  const footerTop = $footer.offset().top;   // フッターのページ内Y
  const scrollTop = $(window).scrollTop();  // 現在のスクロール量
  const winH = $(window).height();          // 画面高さ

  // 画面下端のページ内Y
  const viewportBottom = scrollTop + winH;

  // 画面幅で余白を切り替え
  const margin = window.innerWidth < 768 ? footerMarginSP : footerMarginPC;

  // ★押し上げ量（baseBottomは引く：二重足し防止）
  let overlap = viewportBottom - footerTop - baseBottom + margin;

  overlap = Math.max(0, overlap);

  // bottom = 通常余白 + 押し上げ量
  $topBtn.css("bottom", baseBottom + overlap + "px");
}

$(window).on("scroll resize", function () {
  // 表示/非表示
  if ($(this).scrollTop() > 300) {
    $topBtn.addClass("is-show");
  } else {
    $topBtn.removeClass("is-show");
  }

  // フッター直前で止める（押し上げ）
  updateTopBtnPosition();
});

// 初回
updateTopBtnPosition();

// トップ遷移ボタンをクリックするとトップに遷移する
$(function () {
  $(".top-btn").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 400);
  });
});

// ------------------------------
// マウスストーカーの実装
// ------------------------------
$(function () {
  const $stalker = $("#js-stalker");
  if (!$stalker.length) return;

  $stalker.css("opacity", "1");

  $(document).on("mousemove", function (e) {
    $stalker.css("transform", `translate(${e.clientX}px, ${e.clientY}px)`);
  });
});

// ------------------------------
// メイン画像の切り替え
// ------------------------------
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

$(function () {
  if (!$(".swiper1").length) return;

  const swiper1 = new Swiper(".swiper1", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000,
  });
});

// ------------------------------
// メニューボタンの実装
// ------------------------------
$(function () {
  $(".drawer_button").click(function () {
    $(this).toggleClass("active");
    $(".drawer_nav_wrapper").toggleClass("open");
    $(".drawer_bg").fadeToggle();
  });

  $(".drawer_bg").click(function () {
    $(".drawer_button").removeClass("active");
    $(".drawer_nav_wrapper").removeClass("open");
    $(this).hide();
  });
});

// ------------------------------
// 採用情報のタブ切り替え
// ------------------------------
$(function () {
  const $tabs = $(".tab");
  if (!$tabs.length) return;

  $tabs.on("click", function () {
    $(".tab.active").removeClass("active");
    $(this).addClass("active");

    const index = $tabs.index(this);
    $(".content").removeClass("show").eq(index).addClass("show");

    // タブ切り替えで高さが変わるので位置再計算
    updateTopBtnPosition();
  });
});

// ------------------------------
// リンク遷移（ページ内アンカー）
// ------------------------------
$(function () {
  $('a[href^="#"]').click(function () {
    const adjust = 90;
    const speed = 400;
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? "html" : href);
    const position = target.offset().top - adjust;

    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

