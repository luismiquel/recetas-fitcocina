// script.js
async function loadRecetas() {
  const categorias = ['Seafood','Chicken','Beef','Dessert'];
  let html = '';
  for (const cat of categorias) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const data = await resp.json();
    const items = data.meals.slice(0,10); // 4 categorias x 10 = 40 recetas
    for (const meal of items) {
      const det = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
      const r = (await det.json()).meals[0];
      const ingredientes = [];
      for (let i = 1; i <= 20; i++) {
        if (r[`strIngredient${i}`]) {
          ingredientes.push(`${traducir(r[`strIngredient${i}`])} ${traducir(r[`strMeasure${i}`])}`);
        }
      }
      const pasos = r.strInstructions.split('. ').filter(p => p.trim()).map(p => traducir(p.trim() + '.'));
      const pasosHTML = pasos.map((p,i) => `<li${i? ' style="display:none"':''}>Paso ${i+1}: ${p}</li>`).join('');
      html += `
        <article class="receta">
          <h3>${traducir(r.strMeal)}</h3>
          <img src="${r.strMealThumb}" alt="">
          <ul>${ingredientes.map(it=>`<li>${it}</li>`).join('')}</ul>
          <ol>${pasosHTML}</ol>
          <button onclick="mostrarPaso(this)">Siguiente paso</button>
        </article>`;
    }
  }
  document.querySelector('.grid-recetas').innerHTML = html;
}

function mostrarPaso(btn) {
  const pasos = btn.previousElementSibling.querySelectorAll('li');
  for (let i = 0; i < pasos.length; i++) {
    if (pasos[i].style.display === '') {
      pasos[i].style.display = 'none';
      if (i+1 < pasos.length) pasos[i+1].style.display = '';
      else btn.remove();
      break;
    }
  }
}

function traducir(texto) {
  // Traducción básica con equivalencias clave
  const m = {
    'Preheat':'Precalienta','Mix':'Mezcla','Cook':'Cocina','Serve':'Sirve',
    'and':'y','with':'con','in':'en','Add':'Añade','Heat':'Calienta',
    'Salt':'Sal','Pepper':'Pimienta','Oil':'Aceite','Water':'Agua',
    'Chicken':'Pollo','Beef':'Carne de res','Dessert':'Postre','Seafood':'Mariscos'
  };
  return texto.replace(new RegExp(Object.keys(m).join('|'),'gi'), w => m[w]);
}

window.addEventListener('load', loadRecetas);
