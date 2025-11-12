# Azion AI Would You Rather - Serverless Function

Esta é uma função serverless que roda na plataforma Azion Web Computing para gerar dilemas "Would you rather" usando inteligência artificial.

## Descrição da Função

A função `function.js` implementa um gerador de dilemas "Would you rather" em português brasileiro com as seguintes características:

### Funcionalidades

- **Geração Automática de Dilemas**: Utiliza o modelo de IA `Qwen/Qwen3-30B-A3B-Instruct-2507-FP8` da Azion AI
- **Temas Predefinidos**: Seleciona aleatoriamente entre os temas:
  - Plataforma da Azion
  - Security
  - Build
  - Application
- **Dificuldade**: Configurada como "easy" por padrão
- **Resposta JSON**: Retorna um objeto JSON estruturado com `optionA`, `optionB`, `theme` e `difficulty`

### Como Funciona

1. A função recebe uma requisição HTTP
2. Seleciona um tema aleatório da lista predefinida
3. Envia um prompt para a IA da Azion solicitando um dilema "Would you rather"
4. Retorna a resposta da IA em formato JSON

### Estrutura da Resposta

```json
{
  "optionA": "Primeira opção do dilema",
  "optionB": "Segunda opção do dilema", 
  "theme": "Tema selecionado",
  "difficulty": "easy"
}
```

## Como Usar

### URL da Função

```
https://mupojq1z1uu.map.azionedge.net/
```

### Exemplo de Requisição

```bash
curl https://mupojq1z1uu.map.azionedge.net/
```

### Exemplo de Resposta

```json
{
  "optionA": "Trabalhar apenas com CDN da Azion",
  "optionB": "Trabalhar apenas com Functions da Azion",
  "theme": "Plataforma da Azion",
  "difficulty": "easy"
}
```

## Tecnologias Utilizadas

- **Azion Web Platform**: Plataforma de computação na borda
- **Azion AI**: Serviço de inteligência artificial integrado
- **JavaScript**: Linguagem de programação da função
- **Functions**: Tecnologia serverless da Azion

## Logs e Monitoramento

A função inclui logs para debug que podem ser visualizados no console da Azion:

- Log da requisição recebida
- Log da resposta do modelo de IA

## Tratamento de Erros

A função inclui tratamento de erros que retorna uma resposta JSON com status 500 em caso de falha na execução.

## CORS (Cross-Origin Resource Sharing)

A função está configurada para permitir requisições cross-origin:

- **Access-Control-Allow-Origin**: `*` (permite qualquer origem)
- **Access-Control-Allow-Methods**: `GET, POST, OPTIONS`
- **Access-Control-Allow-Headers**: `Content-Type, Authorization`
- **Suporte a Preflight**: Responde adequadamente a requisições OPTIONS

Isso permite que aplicações web rodando em diferentes domínios consumam a API sem problemas de CORS.
