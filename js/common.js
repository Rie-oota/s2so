// 表示領域に入ったらclass付与
$(function () {
  $('.inview').on("inview", function () {
    $(this).addClass('show');
  });
});

// トップ遷移ボタンをクリックするとトップに遷移する
$(function() {
  $(".top-btn").click(function(){
    $('html,body').animate({
      scrollTop: 0
    });
  });
});

// マウスストーカーの実装
$(function () {
  const $stalker = $("#js-stalker");
  if (!$stalker.length) return;

  $stalker.css("opacity", "1");

  $(document).on("mousemove", function (e) {
    $stalker.css(
      "transform",
      `translate(${e.clientX}px, ${e.clientY}px)`
    );
  });
});

// メイン画像の切り替え
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
      delay: 5000, // 5秒後に次のスライドへ
      disableOnInteraction: false, // ユーザーが操作しても自動再生を継続
    },
    speed: 1000, // 1秒かけてフェード
  });
});

// メニューボタンの実装
$(function () {
  // メニューボタンをクリックしたときに実行する処理
  $(".drawer_button").click(function () {
    // ボタンのclass属性を切り替え
    $(this).toggleClass("active");
    // ナビのclass属性を切り替え
    $(".drawer_nav_wrapper").toggleClass("open");
    // 背景の表示と非表示を切り替え
    $(".drawer_bg").fadeToggle();
  });
  // 背景をクリックしたときに実行する処理
  $(".drawer_bg").click(function () {
    // ボタンのclass属性を削除
    $(".drawer_button").removeClass("active");
    // ナビのclass属性を削除
    $(".drawer_nav_wrapper").removeClass("open");
    // 背景を非表示
    $(this).hide();
  });
});

// 採用情報のタブ切り替え
$(function() {
  const $tabs = $(".tab");
  if (!$tabs.length) return;

  $tabs.on("click", function() {
    $(".tab.active").removeClass("active");
    $(this).addClass("active");

    const index = $tabs.index(this);
    $(".content").removeClass("show").eq(index).addClass("show");
  });
});

// リンク遷移
$(function(){
  // #で始まるアンカーをクリックした場合に処理
  $('a[href^="#"]').click(function(){
    // 移動先を90px上にずらす
    const adjust = 90;
    // スクロールの速度
    const speed = 400; // ミリ秒
    // アンカーの値取得
    const href= $(this).attr("href");
    // 移動先を取得
    const target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を調整
    const position = target.offset().top - adjust;
    // スムーススクロール
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});