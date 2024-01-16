# LISTA DE TAREFAS

1. Revisão geral

   - Definir o build do projeto como um contêiner (core/deploy-docker)

   - Finalizar correções de migração para o nuxt 3 (core/upgrade-nuxt)

     - Consultar os guias de migração e ajustar o que estiver presente no projeto
       - https://vuetifyjs.com/en/getting-started/upgrade-guide/ (core/upgrade-vuetify)
       - https://nuxt.com/docs/getting-started/upgrade
       - https://pinia.vuejs.org/introduction.html
     - Converter o código javascript em typescript (core/typescript)

   - Utilizar nomenclaturas em português (checkout em nova branch refactor/nomenclaturas)

   - Verificar as alterações em branches de teste (checkout da main em refactor/teste-de-features)

     - core/testes-vuetify
     - teste/cardsText
     - teste/separando-dialogo-para-acao
     - feat/exibicao-alternada-mapa

   - Remover páginas de teste (selecionar o que for útil e remover as páginas desnecessárias, mergear refactor/teste-de-featuras na main)

2. Revisar as configurações do projeto (checkout em nova branch core/revisao-configs)

   - package.lock
   - .editorconfig
   - nuxt.config
   - json.config
   - eslint
   - prettier
   - vscode
   - pinia
   - vuetify

3. Revisar as páginas criadas (checkout em nova branch feat/revisao-paginas)

   - INICIAL
   - SOBRE
   - SUGERIR-ACAO

4. Utilização das STORES (checkout em nova branch feat/consumir-backend)

   - Criar uma para cada api do backend: ações, objetivos e etc
