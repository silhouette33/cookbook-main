// slider.js

// jQuery와 Slick Slider 플러그인이 HTML 파일에 먼저 로드되어 있다고 가정합니다.

$(document).ready(function(){
  // Swiper의 .swiper-wrapper를 Slick Slider의 대상으로 지정합니다.
  // .swiper-slide 들이 .swiper-wrapper의 직접적인 자식이어야 합니다.
  $('.swiper > .swiper-wrapper').slick({
    // Swiper의 loop: true 와 유사
    infinite: true,
    // Swiper의 autoplay 와 유사
    autoplay: true,
    autoplaySpeed: 3000, // Swiper의 delay: 3000과 동일
    // Slick은 기본적으로 사용자와의 상호작용 후에도 자동 재생을 유지합니다.
    // (Swiper의 disableOnInteraction: false 와 유사)

    // Swiper의 pagination 과 유사
    dots: true, // 페이지네이션 점들 표시
    // 기존 .swiper-pagination div를 Slick 점들의 컨테이너로 사용
    appendDots: $('.swiper > .swiper-pagination'),

    // Swiper의 navigation 과 유사
    arrows: true, // 네비게이션 화살표 표시
    // 기존의 네비게이션 버튼 요소를 사용
    nextArrow: $('.swiper > .swiper-button-next'),
    prevArrow: $('.swiper > .swiper-button-prev')
  });
  console.log('Slick Slider 초기화 완료');
});