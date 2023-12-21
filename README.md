```
npm install
npm run dev
```

```
open http://localhost:3000
```

- [x] See if static html files can be severed along with [Web Components](https://www.webcomponents.org/)
    - Be careful when serving static files, using a wildcard can lead to all the files being accessible.
- [x] See if working with a renderer can use web as well as render children
- [ ] Try and see if ts files can be compiled to js while ```npm run dev``` is on
- [ ] Implement the Todo app, use [tRPC](https://trpc.io/) or just [htmx](https://htmx.org/) for the client component
    - [ ] In JSX render 
        - [ ] Put JSX todo in a different route
    - [ ] HTML static files with template engines? Maybe pug?
        - [ ] Put HTML todo in a different route
- [ ] add yarn and pnpm support