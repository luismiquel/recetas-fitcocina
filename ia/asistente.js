document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('chat-toggle');
  toggle.addEventListener('click', () => {
    if (!document.getElementById("chatbot")) {
      const div = document.createElement('div');
      div.id = 'chatbot';
      div.style = 'position:fixed;bottom:4rem;right:1rem;width:300px;height:400px;background:white;box-shadow:0 0 10px rgba(0,0,0,0.2);padding:1rem;z-index:1000;';
      div.innerHTML =
        '<div id="chat-log" style="overflow-y:auto;height:calc(100% - 50px);margin-bottom:0.5rem;"></div>' +
        '<input id="chat-input" style="width:100%;box-sizing:border-box;padding:0.5rem;" placeholder="¿En qué puedo ayudarte?"/>';
      document.body.appendChild(div);

      const input = document.getElementById('chat-input');
      const log = document.getElementById('chat-log');

      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && input.value.trim() !== "") {
          const q = input.value.trim();
          log.innerHTML += '<div><strong>Tú:</strong> ' + q + '</div>';
          input.value = '';

          let respuesta = "Lo siento, estoy aprendiendo… 🤖";
          if (q.toLowerCase().includes('ingrediente')) {
            respuesta = "Puedes ver los ingredientes justo debajo de cada receta. 😊";
          } else if (q.toLowerCase().includes('tiempo')) {
            respuesta = "El tiempo varía según la receta. Revisa los pasos listados.";
          }

          log.innerHTML +=
