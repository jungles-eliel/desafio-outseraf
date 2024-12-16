# Outsera Test

API RESTful desenvolvida em Node.js para análise dos intervalos entre prêmios do Golden Raspberry Awards. O objetivo é identificar os produtores com o menor e maior intervalo entre prêmios consecutivos na categoria "Pior Filme".

---

## **Índice**

- [Descrição](#descrição)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## **Descrição**

Esta API processa os dados de um arquivo CSV fornecido e carrega as informações em um banco de dados em memória. Através dos dados carregados, é possível identificar:
- O produtor com o menor intervalo entre dois prêmios consecutivos.
- O produtor com o maior intervalo entre dois prêmios consecutivos.

A aplicação segue o nível 2 de maturidade de Richardson, suportando testes de integração e mantendo todas as configurações necessárias no código.

---

## **Pré-requisitos**

Antes de começar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) (v6 ou superior)

---

## **Instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/outsera-test.git
