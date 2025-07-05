async function loadRecetas() {
  const categorias = ['Seafood','Chicken','Beef','Dessert'];
  let html = '';
  for (const cat of categorias) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const data = await resp.json();
    const items = data.meals.slice(0,20);
    for (const meal of items) {
      const det = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
      const info = await det.json();
      const r = info.meals[0];
      const ingredientes = [];
      for (let i=1;i<=20;i++) {
        if (r[`strIngredient${i}`]) {
          ingredientes.push(`${r[`strIngredient${i}`]} ${r[`strMeasure${i}`]}`);
        }
      }
      html += `<article class="receta">
        <img src="${r.strMealThumb}" alt="${r.strMeal}">
        <h3>${r.strMeal}</h3>
        <ul>${ingredientes.map(i=>`<li>${i}</li>`).join('')}</ul>
        <p>${r.strInstructions.split('. ').slice(0,3).join('. ')}.</p>
      </article>`;
    }
  }
  document.querySelector('.grid-recetas').innerHTML = html;
}
loadRecetas();
