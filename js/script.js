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
const btn_mostrar_senha = document.getElementById('btn-mostrar-senha')

// Calendário, Resumo e Registros
const mes_anterior = document.getElementById('mes-anterior')
const mes_ano = document.getElementById('mes-ano')
const mes_proximo = document.getElementById('mes-proximo')
const grid_dias = document.getElementById('grid-dias')
const data_escolhida = document.getElementById('data-escolhida')
const lista_agendamentos = document.getElementById('lista-agendamentos')

// 1. Verificação de CEP
cep.addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '')
    if (valor.length > 8) {
        valor = valor.slice(0, 8)
    }

    const cepLimpo = valor

    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, '$1-$2')
    }
    e.target.value = valor

    if (cepLimpo.length === 8) {
        ValidarCEP(cepLimpo)
    } else {
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

        if (!resposta.ok || dados.erro) {
            statusCEP.textContent = 'CEP não encontrado'
            statusCEP.style.color = '#dc2626'
            return
        }

        statusCEP.textContent = ''
        rua.value = dados.logradouro
        bairro.value = dados.bairro
        cidade.value = dados.localidade
        estado.value = `${dados.estado} (${dados.uf})`
    } catch (error) {
        console.log('Erro na requisição', error)
        statusCEP.textContent = 'Erro ao consultar o CEP. Tente novamente.'
        statusCEP.style.color = '#dc2626'
    }
}

// 2. Validação de Senha em tempo real
senha.addEventListener('input', function () {
    const valor = senha.value

    const temTamanho = valor.length >= 8
    req_tamanho.classList.toggle('valido', temTamanho)

    const temMaiusculaEMinuscula = /[A-Z]/.test(valor) && /[a-z]/.test(valor)
    req_maiuscula.classList.toggle('valido', temMaiusculaEMinuscula)

    const temNumero = /\d/.test(valor)
    req_numero.classList.toggle('valido', temNumero)

    const temSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(valor)
    req_simbolo.classList.toggle('valido', temSimbolo)

    const semProibidas =
        valor.length > 0 &&
        !valor.toLowerCase().includes('senha') &&
        !valor.includes('123456')
    req_proibidas.classList.toggle('valido', semProibidas)
})

btn_mostrar_senha.addEventListener('click', function () {
    if (senha.type === 'password') {
        senha.type = 'text'
        btn_mostrar_senha.textContent = '🙈'
    } else {
        senha.type = 'password'
        btn_mostrar_senha.textContent = '👁️'
    }
})

// 3. Calendário
let dataAtual = new Date()
let mesAtual = dataAtual.getMonth()
let anoAtual = dataAtual.getFullYear()

const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

function renderizarCalendario() {
    mes_ano.textContent = `${nomesMeses[mesAtual]} ${anoAtual}`
    grid_dias.innerHTML = ''

    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay()
    const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate()

    // Cria casas vazias para alinhar o dia 1 no dia da semana correto
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const espacoVazio = document.createElement('div')
        grid_dias.appendChild(espacoVazio)
    }

    // Cria os botões de todos os dias do mês
    for (let dia = 1; dia <= totalDias; dia++) {
        const botaoDia = document.createElement('button')
        botaoDia.type = 'button'
        botaoDia.textContent = dia

        botaoDia.addEventListener('click', function () {
            const botoes = grid_dias.querySelectorAll('button')
            botoes.forEach(b => b.classList.remove('selecionado'))

            botaoDia.classList.add('selecionado')

            const diaFormatado = String(dia).padStart(2, '0')
            const mesFormatado = String(mesAtual + 1).padStart(2, '0')
            data_escolhida.textContent = `${diaFormatado}/${mesFormatado}/${anoAtual}`
        })

        grid_dias.appendChild(botaoDia)
    }
}

mes_anterior.addEventListener('click', function () {
    mesAtual--
    if (mesAtual < 0) {
        mesAtual = 11
        anoAtual--
    }
    renderizarCalendario()
})

mes_proximo.addEventListener('click', function () {
    mesAtual++
    if (mesAtual > 11) {
        mesAtual = 0
        anoAtual++
    }
    renderizarCalendario()
})

renderizarCalendario()

// 4. Envio do Formulário, Validação da Senha e Registro do Agendamento
form.addEventListener('submit', function (e) {
    e.preventDefault()

    const valorNome = nome.value.trim()
    const valorCEP = cep.value.trim()
    const valorSenha = senha.value
    const valorData = data_escolhida.textContent

    // Verifica se a senha quebra alguma regra
    const errosSenha = []

    if (valorSenha.length < 8) {
        errosSenha.push('- Mínimo de 8 caracteres')
    }
    if (!(/[A-Z]/.test(valorSenha) && /[a-z]/.test(valorSenha))) {
        errosSenha.push('- Pelo menos 1 letra maiúscula e 1 minúscula')
    }
    if (!/\d/.test(valorSenha)) {
        errosSenha.push('- Pelo menos 1 número')
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(valorSenha)) {
        errosSenha.push('- Pelo menos 1 símbolo (!@#$...)')
    }
    if (valorSenha.toLowerCase().includes('senha') || valorSenha.includes('123456')) {
        errosSenha.push('- Não conter "senha" ou "123456"')
    }

    if (errosSenha.length > 0) {
        alert('A senha não atende às seguintes regras:\n\n' + errosSenha.join('\n'))
        return
    }

    // Cria o registro na lista (Seção 3 do HTML)
    const item = document.createElement('li')
    item.textContent = `Agendado: ${valorNome} | CEP: ${valorCEP} | Data: ${valorData}`
    lista_agendamentos.appendChild(item)

    // Alert de confirmação
    alert(`Agendamento realizado com sucesso!\n\nNome: ${valorNome}\nCEP: ${valorCEP}\nData: ${valorData}`)

    // Limpa o formulário e os indicadores visuais
    form.reset()
    statusCEP.textContent = ''
    data_escolhida.textContent = 'Nenhuma'
    document.querySelectorAll('.requisitos-senha li').forEach(li => li.classList.remove('valido'))
    grid_dias.querySelectorAll('button').forEach(b => b.classList.remove('selecionado'))
})