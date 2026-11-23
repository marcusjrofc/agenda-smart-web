# Portal de Cadastro & Agendamento

Aplicação web front-end para cadastro de usuários com busca automática de endereço via CEP, validação de senha em tempo real, seleção de data em calendário interativo e registro de agendamentos na tela.

🔗 **Acesse o projeto online:** [https://agenda-smart-web.vercel.app/](https://agenda-smart-web.vercel.app/)

## Funcionalidades

- **Consulta automática de CEP (ViaCEP):** Formatação automática do CEP e preenchimento dos campos de rua, bairro, cidade e estado.
- **Validação de senha:** Verificação em tempo real dos requisitos de segurança (mínimo de 8 caracteres, letra maiúscula e minúscula, número, caractere especial e bloqueio de termos proibidos como `"senha"` e `"123456"`), botão para mostrar/ocultar a senha e alerta caso alguma regra seja quebrada no envio.
- **Calendário interativo:** Navegação entre meses e seleção da data desejada para o agendamento.
- **Registro de agendamentos:** Exibição da lista de agendamentos realizados (com nome, CEP e data escolhida) e alerta de confirmação ao enviar o formulário.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- [API ViaCEP](https://viacep.com.br/)
- Deploy via Vercel

## Estrutura do Projeto

```text
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Como Executar

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/agenda-smart-web.git](https://github.com/SEU-USUARIO/agenda-smart-web.git)
   ```
2. Abra o arquivo `index.html` diretamente no navegador (ou utilize a extensão **Live Server** no VS Code).