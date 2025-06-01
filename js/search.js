// js/search.js
    // recipe.js가 ES 모듈이 아니고 allRecipesData를 전역으로 정의한다면, 아래 import 문은 필요 없습니다.
    // 만약 recipe.js가 `export const allRecipesData = ...` 와 같이 export 한다면,
    // import { allRecipesData as recipes } from "./recipe.js"; 또는 import { allRecipesData } from "./recipe.js"; 로 사용해야 합니다.
    // 현재 recipe.js는 전역 변수 allRecipesData를 생성하므로 import는 불필요합니다.

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
    const searchModeSelect = document.getElementById("searchMode"); // 검색 모드 select 요소


  document.getElementById("searchForm").addEventListener("submit", (e) => {
        e.preventDefault(); // 기본 form 전송을 막습니다.


  const query = searchInput.value.trim();
    const mode = searchModeSelect.value;

         if (!query) {
      alert("검색어를 입력해주세요.");
      return; // 검색어가 없으면 여기서 중단
    }
    

    // search-result.html로 검색어와 모드를 query parameter로 전달하여 이동합니다.
    window.location.href = `search-result.html?mode=${encodeURIComponent(mode)}&query=${encodeURIComponent(query)}`;
  });
});
