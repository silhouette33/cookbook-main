// js/category-result.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. URL에서 category 파라미터 읽기
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get('category');

    // 2. 선택된 카테고리명 표시
    const categoryNameElement = document.getElementById('selected-category-name');
    if (categoryNameElement) {
        if (selectedCategory) {
            categoryNameElement.textContent = selectedCategory;
        } else {
            categoryNameElement.textContent = '카테고리가 선택되지 않았습니다.';
        }
    }

    // 3. 레시피 필터링 및 표시
    const recipeList = document.getElementById('recipe-list');
    if (!recipeList) {
        console.error("Element with ID 'recipe-list' not found.");
        return;
    }

    if (!selectedCategory) {
        recipeList.innerHTML = '<p>표시할 카테고리를 선택해주세요. 이전 페이지로 돌아가 카테고리를 클릭해주세요.</p>';
        return;
    }

    // allRecipesData는 c:/cookbook-main/js/recipe.js 에 정의된 전역 객체입니다.
    // category-result.html에 recipe.js가 category-result.js보다 먼저 로드되어야 합니다.
    if (typeof allRecipesData !== 'undefined') {
        const filteredRecipes = Object.entries(allRecipesData)
            .filter(([key, recipeData]) => recipeData.category === selectedCategory);

        if (filteredRecipes.length > 0) {
            recipeList.innerHTML = ''; // 기존 내용 초기화
            filteredRecipes.forEach(([key, recipe]) => {
                const card = document.createElement('a');
                // .recipe-card 스타일은 category-result.css 또는 공통 CSS에 정의되어 있어야 합니다.
                card.className = 'recipe-card'; // 필요시 'popular-card' 등 다른 카드 스타일 클래스로 변경
                card.href = `recipe.html?key=${key}`; // 'key' 파라미터 사용

                const imageSrc = recipe.image || 'images/default-placeholder.png'; // 이미지가 없을 경우 기본 이미지
                const descriptionText = recipe.description ? recipe.description.substring(0, 70) + (recipe.description.length > 70 ? '...' : '') : '레시피 설명이 없습니다.';

                card.innerHTML = `
                    <img src="${imageSrc}" alt="${recipe.title}">
                    <div class="card-body">
                        <h3>${recipe.title}</h3>
                        <p>${descriptionText}</p>
                    </div>
                `;
                recipeList.appendChild(card);
            });
        } else {
            recipeList.innerHTML = `<p>'${selectedCategory}' 카테고리에 해당하는 레시피가 없습니다.</p>`;
        }
    } else {
        console.error("allRecipesData is not defined. Make sure recipe.js is loaded before category-result.js");
        recipeList.innerHTML = '<p>레시피 데이터를 불러오는 데 문제가 발생했습니다. 관리자에게 문의하세요.</p>';
    }
});
