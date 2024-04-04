let participantes = [
  {
    nome: "Daniel Rodrigues",
    email: "daniel@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: new Date(2024, 2, 25, 20, 20)
  },
  {
    nome: "Márcio Araujo",
    email: "marcioaraujo@gmail.com",
    dataInscricao: new Date(2024, 1, 02, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Maria Silva",
    email: "maria.silva@example.com",
    dataInscricao: new Date(2024, 0, 15, 10, 30),
    dataCheckIn: new Date(2024, 0, 20, 14, 15)
  },
  {
    nome: "José Santos",
    email: "jose.santos@example.com",
    dataInscricao: new Date(2023, 11, 10, 15, 45),
    dataCheckIn: new Date(2023, 11, 15, 17, 30)
  },
  {
    nome: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    dataInscricao: new Date(2023, 10, 5, 9, 0),
    dataCheckIn: null
  },
  {
    nome: "Fernando Costa",
    email: "fernando.costa@example.com",
    dataInscricao: new Date(2023, 9, 18, 16, 10),
    dataCheckIn: new Date(2023, 9, 23, 18, 45)
  },
  {
    nome: "Patrícia Lima",
    email: "patricia.lima@example.com",
    dataInscricao: new Date(2023, 8, 30, 13, 20),
    dataCheckIn: new Date(2023, 9, 4, 15, 10)
  },
  {
    nome: "Carlos Martins",
    email: "carlos.martins@example.com",
    dataInscricao: new Date(2023, 7, 10, 20, 5),
    dataCheckIn: new Date(2023, 7, 15, 22, 30)
  },
  {
    nome: "Luana Pereira",
    email: "luana.pereira@example.com",
    dataInscricao: new Date(2023, 6, 22, 11, 40),
    dataCheckIn: null
  },
  {
    nome: "Ricardo Sousa",
    email: "ricardo.sousa@example.com",
    dataInscricao: new Date(2023, 5, 5, 14, 15),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  //condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
       <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

if(participanteExiste) {
  alert('Email já cadastrado')
  return
}

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // Limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if (confirm(mensagemConfirmacao) == false) {
    return 
  }
 
  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}