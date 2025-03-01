# SCPODS Site - Frontend do sistema para cadastro de projetos relacionados aos ODS na UFES

## Objetivos deste trabalho

- Servir de exemplo de um possível projeto envolvendo mapeamento na universidade.
- Listar as diferentes ações envolvendo os Objetivos de Desenvolvimento Sustentável (ODS) realizadas em diferentes locais na universidade.
- A ideia de ser colaborativo é justamente permitir que a comunidade acadêmica enviem seus projetos para serem adicionados em uma base de dados comum com enfoque nos ODS.

## Tecnologias e Materiais utilizados

- [**NuxtJS**](https://nuxtjs.org/): Framework para criação de páginas _web_ baseado no [VueJS](https://vuejs.org/).

- [**Vuetify**](https://vuetifyjs.com/en/): Biblioteca para VueJS com componentes de interface de usuário prontos para uso.

- [**Leaflet**](https://leafletjs.com/): Biblioteca javascript para exibição e manipulação de mapas.
  Utilizado como módulo Nuxt via [nuxt-leaflet](https://github.com/schlunsen/nuxt-leaflet).

- [**OpenStreetMap**](https://www.openstreetmap.org/): Iniciativa de mapas colaborativos utilizada para diversos fins.
  É utilizada a _tile_ (layer de fundo do mapa) disponibilizada pela Equipe Humanitária do OpenStreetMap (_Humanitarian OpenStreetMap Team_) servida pelo [OpenStreetMap France](https://openstreetmap.fr/).

- [**Mapas da UFES**](https://mapa.ufes.br): Foram utilizados os mapas dos _campus_ criados pela equipe [**Prodesign**](https://prodesign.ufes.br/).

- [**UfesSans**](https://prodesign.ufes.br/ufessans/): Família tipográfica _opensource_ criada pela equipe **Prodesing**.

- Imagens das logos para representar cada ODS foram obtidas em https://brasil.un.org/pt-br/sdgs.

## Build para deploy do projeto

### Node

- Para realizar o build e servir o projeto com um servidor node (padrão em `localhost:3000`):

```bash
yarn build
node .output/server/index.mjs
```

### Servidor HTTP

- Para gerar um site estático, sem que as rotas sejam pré-renderizadas é preciso definir a opção `ssr: false`:

```bash
yarn generate
```

- O site será gerado em um diretório chamado `dist` e pode então ser servido usando um servidor http:

```bash
python -m http.server 8001 --directory dist
```

## Algumas referências utilizadas

- [Nuxt 3 | Repository pattern: organising and managing your calls to APIs (Typescript)](https://medium.com/@luizzappa/nuxt-3-repository-pattern-organising-and-managing-your-calls-to-apis-with-typescript-acd563a4e046)
- [Vue Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
