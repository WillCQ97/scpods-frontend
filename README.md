# SCPODS Site - Frontend do sistema para cadastro de projetos relacionados aos ODS na UFES

## Tecnologias utilizadas

- [**NuxtJS**](https://nuxtjs.org/): Framework para criação de páginas _web_ baseado no [VueJS](https://vuejs.org/).

- [**Vuetify**](https://vuetifyjs.com/en/): Biblioteca para VueJS com componentes de interface de usuário prontos para uso.

- [**Leaflet**](https://leafletjs.com/): Biblioteca javascript para exibição e manipulação de mapas.
  Utilizado como o módulo Nuxt via [nuxt-leaflet](https://github.com/schlunsen/nuxt-leaflet).

- [**OpenStreetMap**](https://www.openstreetmap.org/): Iniciativa de mapas colaborativos utilizada para diversos fins.
  É utilizada a tile (_layer de fundo do mapa_) disponibilizada pela Equipe Humanitária do OpenStreetMap (_Humanitarian OpenStreetMap Team_) servida pelo [OpenStreetMap France](https://openstreetmap.fr/).

- [**Netlify**](https://app.netlify.com/): Plataforma para a disponibilização do site.

## Outros projetos

- [**Mapas da UFES**](https://mapa.ufes.br): Foram utilizados os mapas dos _campus_ da universidade criados pela equipe [**Prodesign**](https://prodesign.ufes.br/).

- [**UfesSans**](https://prodesign.ufes.br/ufessans/): Família tipográfica _opensource_ criada pela equipe de **Prodesing**.

- Foi utilizado como referência o mapa para o [campus de Alegre](https://www.google.com/maps/d/u/0/viewer?mid=1MidKiIv_2cGcV17Hkva5TOaBCRI&ll=-20.761540683896165%2C-41.53662093947712&z=18).

## Objetivos deste trabalho

- Servir de exemplo de um possível projeto envolvendo mapeamento na universidade.
- Mapear as diferentes ações de ODS realizadas em diferentes locais na universidade.
- A ideia de ser colaborativo é justamente permitir que os diferentes atores informem seus projetos para serem adicionados em uma base de dados comum com enfoque em ODS.

## Assets

- Imagens das logos para representar cada ODS foram obtidas em https://brasil.un.org/pt-br/sdgs.

## Materiais

- [Nuxt 3 | Repository pattern: organising and managing your calls to APIs (Typescript)](https://medium.com/@luizzappa/nuxt-3-repository-pattern-organising-and-managing-your-calls-to-apis-with-typescript-acd563a4e046)
- [Vue Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)

## Build para deploy do projeto

- Para realizar o build e servir o projeto com um servidor node (padrão em localhost:3000):

```bash
yarn build
node .output/server/index.mjs
```

- Para gerar um site estático, sem que as rotas sejam pré-renderizadas é preciso definir a opção `ssr: false`:

```bash
yarn generate
```

- O site será gerado em um diretório chamado `dist` e pode então ser servido usando um servidor http:

```bash
python -m http.server 8001 --directory dist
```
