let RECETAS = [];

fetch('data/recetas.json')
  .then(r => r.json())
  .then(data => {
    RECETAS = data;
    console.log("Recetas cargadas para IA:", RECETAS.length);
  });

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('chat-toggle');
  toggle.addEventListener('click', () => {
    if (document.getElementById('chatbot')) return;

    const div = document.createElement('div');
    div.id = 'chatbot';
    div.style = 'position:fixed;bottom:4rem;right:1rem;width:300px;height:300px;background:white;border:1px solid #ccc;padding:1rem;z-index:9999;';
    div.innerHTML = `
      <div id="chat-log" style="overflow-y:auto;height:80%;margin-bottom:0.5rem;"></div>
      <input id="chat-input" placeholder="Escribe aquí..." style="width:100%;padding:0.5rem;"/>
    `;
    document.body.appendChild(div);

    const input = document.getElementById('chat-input');
    const log = document.getElementById('chat-log');

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        const pregunta = input.value.toLowerCase();
        log.innerHTML += `<div><strong>Tú:</strong> ${pregunta}</div>`;
        input.value = '';

        let respuesta = "Lo siento, no tengo información sobre eso.";
        const receta = RECETAS.find(r => pregunta.includes(r.titulo.toLowerCase()));

        if (receta) {
          if (pregunta.includes("ingrediente")) {
            respuesta = `Los ingredientes de "${receta.titulo}" son:<ul>` +
              receta.ingredientes.map(i => `<li>${i}</li>`).join('') + "</ul>";
          } else if (pregunta.includes("preparación") || pregunta.includes("paso") || pregunta.includes("hacer")) {
            respuesta = `La preparación de "${receta.titulo}" es:<ol>` +
              receta.pasos.map(p => `<li>${p}</li>
