// Formulario e Endereço (ViaCEP)
const form = document.getElementById('form-cadastro')
const nome = document.getElementById('nome')
const cep = document.getElementById('cep')
const statusCEP = document.getElementById('status-cep')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const estado = document.getElementById('estado')

// Validação de Senha
const senha = document.getElementById('senha')
const req_tamanho = document.getElementById('req-tamanho')
const req_maiuscula = document.getElementById('req-maiuscula')
const req_numero = document.getElementById('req-numero')
const req_simbolo = document.getElementById('req-simbolo')
const req_proibidas = document.getElementById('req-proibidas')
const btn_mostrar_senha = document.getElementById('btn-mostrar-senha');

// Calendário e Resumo
const mes_anterior = document.getElementById('mes-anterior')
const mes_ano = document.getElementById('mes-ano')
const mes_proximo = document.getElementById('mes-proximo')
const grid_dias = document.getElementById('grid-dias')
const data_escolhida = document.getElementById('data-escolhida')


// Verificaçõ de CEP
cep.addEventListener('input', function(e){
    let valor = e.target.value.replace(/\D/g,'')
    if(valor.length > 8){
        valor = valor.slice(0,8)
    }

    const cepLimpo = valor

    if(valor.length > 5){
        valor = valor.replace(/^(\d{5})(\d)/, '$1-$2')
    }
    e.target.value = valor

    if(cepLimpo.length === 8){
        ValidarCEP(cepLimpo)
    }else{
        statusCEP.textContent = ''
        rua.value = ''
        bairro.value = ''
        cidade.value = ''
        estado.value = '' 
    }
})

async function ValidarCEP(cepLimpo) {
    statusCEP.textContent = 'Buscando endereço...'
    statusCEP.style.color = '#64748b'
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const dados = await resposta.json()

        if(!resposta.ok || dados.erro){
           statusCEP.textContent = 'CEP não encontrado'
           statusCEP.style.color = '#dc2626'
            return;
        }

        statusCEP.textContent = ''
        rua.value = dados.logradouro 
        bairro.value = dados.bairro
        cidade.value = dados.localidade
        estado.value = `${dados.estado} (${dados.uf})`

    } catch (error) {
        console.log('Erro na requisição',error)
        statusCEP.textContent = 'Erro ao consultar o CEP. Tente novamente.';
        statusCEP.style.color = '#dc2626';
    }
}

// Validação de Senha
senha.addEventListener('input', function(){
    const valor = senha.value

    // 1. Mínimo de 8 caracteres
    const temTamanho = valor.length >=8
    req_tamanho.classList.toggle('válido', temTamanho)

    // 2. Pelo menos uma maiúscula E uma Miinúscula
    const temMaiusculaEMinuscula = /[A-Z]/.test(valor) && /[a-z]/.test(valor)
    req_maiuscula.classList.toggle('válido', temMaiusculaEMinuscula)

    // 3. Pelo menos um número
    const temNumero = /\d/.test(valor)
    req_numero.classList.toggle('válido',temNumero)

    // 4. Pelo menos um caractere especial
    const temSImbolo = /[!@#$%^&*(),.?":{}|<>]/.test(valor)
    req_simbolo.classList.toggle('valido', temSimbolo)

    // 5. Não pode conter "senha" ou "123456" (só fica verde se o usuário já digitou algo e não usou palavras proibidas)
    const semProibidas = valor.length > 0 && !valor.toLowerCase().includes('senha') && !valor.includes('123456');
    req_proibidas.classList.toggle('valido', semProibidas);
})

btn_mostrar_senha.addEventListener('click', function() {
    // Se estiver oculto (password), muda para texto e troca o ícone
    if (senha.type === 'password') {
        senha.type = 'text';
        btn_mostrar_senha.textContent = '🙈'; // Macaco a tapar os olhos (ou use outro emoji)
    } else {
        // Se estiver visível, volta para password
        senha.type = 'password';
        btn_mostrar_senha.textContent = '👁️'; // Olho aberto
    }
});

// 3. Calendário

//Pegamos o mês e ano do momento atual
let dataAtual = new Date()
let mesAtual = dataAtual.getMonth()
let anoAtual = dataAtual.getFullYear()

const nomesMeses = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
]

function renderizarCalendario(){
    // 1. Atualiza o título com o Mês e Ano corretos
    mes_ano.textContent = `${nomesMeses[mesAtual]} ${anoAtual}`

    // Limpa a grade antes de desenhar (para os dias não se acumularem ao trocar de mês)
    grid_dias.innerHTML = ''

    // 2. Descobre o 1º dia da semana e o total de dias do mês atual
    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay()
    const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate()

    // 3. Cria "casas vazias" para alinhar o dia 1 no dia da semana correto
    for(let i = 0 ; i < totalDias; i++ ){
        const espacoVazio = document.createElement('div')
        grid_dias.appendChild(espacoVazio)
    }

    // 4. Cria os botões de todos os dias do mês
    for(let dia = 1; dia <= totalDias; dia++){
        const botaoDia = document.createElement('button')
        botaoDia.type = 'button'
        botaoDia.textContent = dia

        // Quando o usuário clicar num dia:
        botaoDia.addEventListener('click',function(){
            // Remove a seleção azul dos outros dias
            const botoes = grid_dias.querySelectorAll('button')
            botoes.forEach(b => b.classList.remove('selecionado'))

            // Pinta o botão clicado de azul
            botaoDia.classList.add('selecionado')

            // Atualiza o texto de resumo (formatando com zeros: ex. 05/09/2026)
            const diaFormatado = String(dia).padStart(2,'0')
            const mesFormatado = String(mesAtual + 1).padStart(2,'0')
            data_escolhida.textContent = `${diaFormatado}/${mesFormatado}/${anoAtual}`
        })

        // Joga o botão dentro da grade no HTML
        grid_dias.appendChild(botaoDia)
    }
}

// 5. Botões de navegação (Voltar e Avançar mês)
mes_anterior.addEventListener('click',function(){
    mesAtual--
    if(mesAtual < 0){
        mesAtual = 11
        anoAtual--
    }
    renderizarCalendario()
})

mes_proximo.addEventListener('click',function(){
    mesAtual++
    if(mesAtual > 11){
        mesAtual = 0
        anoAtual++
    }
    renderizarCalendario()
})
renderizarCalendario()