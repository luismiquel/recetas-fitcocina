const toggle = document.getElementById('chat-toggle');
toggle.addEventListener('click', () => {
  if (!window.Chatbot) {
    const div = document.createElement('div');
    div.id = 'chatbot';
    div.style = 'position:fixed;bottom:4rem;right:1rem;width:300px;height:400px;
                 background:white;box-shadow:0 0 10px rgba(0,0,0,0.2);padding:1rem;';
    div.innerHTML = \`
      <div id="chat-log" style="overflow-y:auto;height:calc(100% - 50px);"></div>
      <input id="chat-input" style="width:100%;box-sizing:border-box;" placeholder="¿En qué puedo ayudarte?"/>\`;
    document.body.appendChild(div);
    document.getElementById('chat-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = e.target.value;
        const log = document.getElementById('chat-log');
        log.innerHTML += '<div><strong>Tú:</strong> ' + q + '</div>';
        e.target.value = '';
        setTimeout(() => {
          if (q.toLowerCase().includes('ingrediente')) {
            log.innerHTML += '<div><strong>IA:</strong> Cada receta tiene su lista, baja hasta ver "Ingredientes".</div>';
          } else if (q.toLowerCase().includes('tiempo')) {
            log.innerHTML += '<div><strong>IA:</strong> El tiempo cambia por receta; mira qué ingredientes y pasos hay.</div>';
          } else {
            log.innerHTML += '<div><strong>IA:</strong> Lo siento, estoy aprendiendo… 🤖</div>';
          }
        }, 500);
      }
    });
    window.Chatbot = true;
  }
});
