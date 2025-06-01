document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const mode = params.get('mode') || 'name'; // URL에 mode가 없으면 기본값 'name'

    const searchQueryDisplay = document.getElementById('search-query-display');
    const resultsContainer = document.getElementById('search-results-container');

    let modeKorean = '이름';
    if (mode === 'ingredient') modeKorean = '재료';
    else if (mode === 'difficulty') modeKorean = '난이도';

    if (searchQueryDisplay) {
        if (query) {
            searchQueryDisplay.textContent = `'${query}' (${modeKorean} 검색) 결과`;
        } else {
            searchQueryDisplay.textContent = '검색어를 입력해주세요.';
        }
    }

    if (query && resultsContainer) {
        // 'recipes' 객체와 'searchRecipesByCriteria' 함수가 recipe.js에 정의되어 있다고 가정
        // 'allRecipesData'는 c:/cookbook-main/js/recipe.js 에 정의된 상세 레시피 데이터입니다.
        if (typeof allRecipesData !== 'undefined' && typeof searchRecipesByCriteria === 'function') {
            const searchResults = searchRecipesByCriteria(query, mode, allRecipesData);

            if (searchResults.length > 0) {
                searchResults.forEach(recipe => {
                    const recipeCard = createRecipeCardForResult(recipe);
                    resultsContainer.appendChild(recipeCard);
                });
            } else {
                resultsContainer.innerHTML = '<p class="no-results">일치하는 레시피가 없습니다.</p>';
            }
        } else {
            resultsContainer.innerHTML = '<p class="no-results">레시피 데이터 또는 검색 기능을 불러올 수 없습니다.</p>';
            console.error('Error: recipes data or searchRecipesByCriteria function is not available.');
        }
    } else if (resultsContainer && !query) {
        // 검색어가 없는 경우 메시지 표시 (searchQueryDisplay에서도 처리하지만, 컨테이너에도 명시)
        resultsContainer.innerHTML = '<p class="no-results">검색어를 입력하여 레시피를 찾아보세요.</p>';
    }
});

/**
 * 검색 결과를 위한 레시피 카드 DOM 요소를 생성합니다.
 * 이 함수는 render-recipe.js의 카드 생성 로직과 유사하거나 재활용할 수 있습니다.
 * @param {object} recipe - 레시피 객체 (key, title, image, description, difficulty 등 포함)
 * @returns {HTMLElement} - 생성된 레시피 카드 요소
 */
function createRecipeCardForResult(recipe) {
    const cardLink = document.createElement('a');
    // recipe.key는 searchRecipesByCriteria에서 추가한 레시피의 고유 키입니다.
    cardLink.href = `recipe.html?key=${recipe.key}`;
    cardLink.className = 'popular-card'; // 기존 카드 스타일 재활용

    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.title;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'popular-card-content';

    const title = document.createElement('h3');
    title.textContent = recipe.title;

    const description = document.createElement('p');
    description.className = 'recipe-desc-short'; // 짧은 설명 스타일
    description.textContent = recipe.description ? recipe.description.substring(0, 50) + (recipe.description.length > 50 ? '...' : '') : '';

    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    if (recipe.difficulty) {
        const difficultyP = document.createElement('p');
        difficultyP.className = 'recipe-difficulty-badge';
        difficultyP.textContent = `난이도: ${recipe.difficulty}`;
        contentDiv.appendChild(difficultyP);
    }

    cardLink.appendChild(image);
    cardLink.appendChild(contentDiv);

    return cardLink;
}