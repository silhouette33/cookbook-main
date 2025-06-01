// js/search.js
    // recipe.js가 ES 모듈이 아니고 allRecipesData를 전역으로 정의한다면, 아래 import 문은 필요 없습니다.
    // 만약 recipe.js가 `export const allRecipesData = ...` 와 같이 export 한다면,
    // import { allRecipesData as recipes } from "./recipe.js"; 또는 import { allRecipesData } from "./recipe.js"; 로 사용해야 합니다.
    // 현재 recipe.js는 전역 변수 allRecipesData를 생성하므로 import는 불필요합니다.

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
        const query = searchInput.value.trim().toLowerCase(); // 검색어는 소문자로 변환

    let foundKey = null;

        // 'allRecipesData'는 c:/cookbook-main/js/recipe.js 파일에 정의된 상세 레시피 데이터 객체를 참조합니다.
        for (const key in allRecipesData) {
          const title = allRecipesData[key].title.toLowerCase(); // 레시피 제목도 소문자로 변환하여 비교
          if (query === title) { // 정확히 일치하는 제목 검색
        foundKey = key;
        break;
      }
    }

    if (foundKey) {
      window.location.href = `recipe.html?key=${foundKey}`;
    } else {
      alert("일치하는 레시피를 찾을 수 없습니다.");
    }
  });
});
