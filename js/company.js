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

$(function () {
  // id[js-stalker]を取得する
  const stalker = $("#js-stalker");
  // 不透明にする
  $(stalker).css("opacity","1");
  // マウスを移動させたときの処理を指定する
  $(document).on("mousemove", function (e) {
    // マウスの座標を取得
    const x = e.clientX;
    const y = e.clientY;
    // ストーカーの位置を更新する
    $(stalker).css("transform","translate(" + x + "px, " + y + "px)");
  });
  // アニメーションを更新する
  (function update(){
    window.requestAnimationFrame(update);
  })();
});

const CLASSNAME = "-visible";
const TIMEOUT = 1500;
const $target = $(".title");

setInterval(() => {
  $target.addClass(CLASSNAME);
  setTimeout(() => {
    $target.removeClass(CLASSNAME);
  }, TIMEOUT);
}, TIMEOUT * 2);

const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "fade", // フェード切り替え
  fadeEffect: {
    clossFade: true,
  },
  // 自動再生
  autoplay: {
    delay: 5000, // 5秒後に次のスライドへ
    disableOnInteraction: false, // ユーザーが操作しても自動再生を継続
  },
  speed: 1000, // 1秒かけてフェード
});

$(function () {
  // メニューボタンをクリックしたときに実行する処理
  $(".drawer_button").click(function () {
    // ボタンのclass属性を切り替え
    $(this).toggleClass("active");
    // ナビのclass属性を切り替え
    $("nav").toggleClass("open");
    // 背景の表示と非表示を切り替え
    $(".drawer_bg").fadeToggle();
  });
  // 背景をクリックしたときに実行する処理
  $(".drawer_bg").click(function () {
    // ボタンのclass属性を削除
    $(".drawer_button").removeClass("active");
    // ナビのclass属性を削除
    $("nav").removeClass("open");
    // 背景を非表示
    $(this).hide();
  });
});