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

const swiper = new Swiper(".swiper", {
  loop: true, // ループ有効
  slidesPerView: 7, // 一度に表示する枚数
  speed: 6000, // ループの時間
  allowTouchMove: false, // スワイプ無効
  autoplay: {
    delay: 0, // 途切れなくループ
  },
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
