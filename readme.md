# 📅 Portal de Cadastro e Agendamento

Uma aplicação web front-end completa construída do zero, focada na experiência do utilizador, validação de dados em tempo real e agendamento dinâmico. 

Este projeto integra lógicas avançadas de validação e consumo de APIs utilizando puramente tecnologias nativas (Vanilla), reaproveitando conceitos previamente estruturados em scripts Python e agora adaptados para a web.

## 🚀 Funcionalidades

### 1. Formulário de Endereço Inteligente
- Máscara automática de CEP durante a digitação.
- Consumo da **API ViaCEP** (`fetch` API) para preenchimento assíncrono de Logradouro, Bairro, Cidade e Estado.
- Feedback visual de status (buscando, não encontrado, erro).

### 2. Validador de Senha Dinâmico
- Validação em tempo real (Regex) de requisitos de segurança:
  - Mínimo de 8 caracteres.
  - Pelo menos uma letra maiúscula e uma minúscula.
  - Pelo menos um número.
  - Pelo menos um caractere especial.
  - Restrição de palavras comuns (ex: "senha", "123456").
- Botão interativo para revelar/ocultar a senha (👁️).

### 3. Calendário Interativo Nativo
- Geração dinâmica da grelha de dias do mês atual usando o objeto `Date` do JavaScript.
- Navegação fluida entre os meses (avançar e recuar).
- Seleção de datas com atualização de status diretamente no formulário de agendamento.

### 4. Interface e Experiência (UI/UX)
- Design limpo e moderno.
- 100% responsivo: adaptado perfeitamente para dispositivos móveis através de *Media Queries*.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica do portal.
- **CSS3:** Estilização, Flexbox, CSS Grid e responsividade.
- **JavaScript (Vanilla):** Manipulação do DOM, requisições HTTP assíncronas e lógica de negócio.

## ⚙️ Como Executar o Projeto

1. Clone o repositório para a sua máquina local:
   ```bash
   git clone [https://github.com/marcusjrofc/nome-do-repositorio.git](https://github.com/marcusjrofc/nome-do-repositorio.git)