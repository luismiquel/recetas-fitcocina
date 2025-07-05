// script.js con logs de diagnóstico
async function loadRecetas() {
  console.log('🔄 Iniciando carga de recetas...');
  const categorias = ['Seafood','Chicken','Beef','Dessert'];
  let html = '';
  for (const cat of categorias) {
    console.log(`➡️ Obteniendo categoría: ${cat}`);
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const data = await resp.json();
    console.log(`✅ Recibidos ${data.meals.length} items`);
    const items = data.meals.slice(0,10);
    for (const meal of items) {
      console.log(`⋯ Detalle de idMeal ${meal.idMeal}`);
      const det = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
      const r = (await det.json()).meals[0];
      html += `<article class="receta"><h3>${r.strMeal}</h3></article>`;
    }
  }
  document.querySelector('.grid-recetas').innerHTML = html;
  console.log('🎉 Recetas cargadas en DOM');
}

window.addEventListener('load', loadRecetas);
