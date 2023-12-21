```
npm install
npm run start
```

```
open http://localhost:3000
```

- [x] See if static html files can be severed along with [Web Components](https://www.webcomponents.org/)
    - Be careful when serving static files, using a wildcard can lead to all the files being accessible. **DO NOT PLACE SENSETIVE FILES HERE**
- [x] See if working with a renderer can use web as well as render children
- [x] Try and see if ts files can be compiled to js while ```npm run dev``` is on
    - [x] Get vite to build the bundle file with all of the web components as wither ts or js files as well as watch them
    - [x] Run one command line to run both build and server together. ofc there's a [npm package](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)
    - [x] Add tailwind support for web components so that I can use the shadowDom without having to worry about document lvl css
        - A <link> can be added but that means that the component will have css added at run time and not compile time and if the link is dead then its GG.
        - Disabling the shadow dom will then let the document, style the component which isn't that bad seeing as I will be using tailwind css and not custom css. 
- [ ] Implement the Todo app, use [tRPC](https://trpc.io/) or just [htmx](https://htmx.org/) for the client component
    - [ ] In JSX render 
        - [ ] Put JSX todo in a different route
    - [ ] HTML static files with template engines? Maybe pug?
        - [ ] Put HTML todo in a different route
- [ ] add yarn and pnpm support