document.addEventListener('DOMContentLoaded', function () {
    const hamburgerButton = document.querySelector('.hamburger-menu');
    // nav.menu 선택자를 좀 더 구체적으로 header.navbar 내부의 nav.menu로 지정합니다.
    const navMenu = document.querySelector('header.navbar nav.menu');

    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', function () {
            const isOpened = navMenu.classList.toggle('menu-open');
            hamburgerButton.setAttribute('aria-expanded', isOpened);
            if (isOpened) {
                hamburgerButton.setAttribute('aria-label', '메뉴 닫기');
            } else {
                hamburgerButton.setAttribute('aria-label', '메뉴 열기');
            }
        });
    }
});
