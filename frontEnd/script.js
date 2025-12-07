const API = "http://localhost:3000";

async function listarTransacoes() {
  const resposta = await fetch(`${API}/transacoes`);
  const lista = await resposta.json();

  const tbody = document.getElementById("tabela-transacoes");
  tbody.innerHTML = "";

  lista.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.descricao}</td>
      <td>R$ ${t.valor.toFixed(2)}</td>
      <td style="color:${t.tipo === 'entrada' ? 'green' : 'red'}">${t.tipo}</td>
      <td>${t.data}</td>
      <td><button onclick="remover('${t.id}')">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });

  atualizarSaldo();
}


document.getElementById("form-transacao").addEventListener("submit", async (e) => {
  e.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const valor = Number(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;
  const data = document.getElementById("data").value;

  await fetch(`${API}/transacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao, valor, tipo, data })
  });

  listarTransacoes();
});

async function remover(id) {
  await fetch(`${API}/transacoes/${id}`, {
    method: "DELETE"
  });

  listarTransacoes();
}

o
async function atualizarSaldo() {
  const resposta = await fetch(`${API}/saldo`);
  const saldo = await resposta.json();

  document.getElementById("saldo").textContent = saldo.saldo.toFixed(2);
}


listarTransacoes();
