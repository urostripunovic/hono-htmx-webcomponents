This project is a POC of how one can create SPA like application only using the server with some JS sprinkled in. The technologies used are [Hono](https://hono.dev/), [Vite](https://vitejs.dev/), [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and [HTMX](https://htmx.org/). The initial idea was to compare HTMX+Web Components with template engines vs Hono's JSX render but the conclusion is that template engines aren't type safe so for server sided rendering with Hono's JSX provides the best DX. When it comes to Web components and HTMX it was extremely easy to work with. Sprinkling in a little JS when needed was super easy and I even took it a step further by implementing [Astro's Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) to improve performance even further. To run the POC do the following:

```
npm install
npm run dev
```

```
open http://localhost:3000/jsxRender for JSX render
```

- [x] Look into how Hono's serves static files and how JSX render works.
    - it's just React..
- [x] Improve DX with Hono and Web Component
    - [x] [HMR hono with Vite](https://github.com/honojs/vite-plugins)
    - [x] ["HMR" Web component files](https://github.com/antfu/vite-plugin-restart) 
- [x] Understanding web components
- [x] Understanding how to render dynamic html from the server
- [x] Understanding HTMX
    - Not much to understand read the docs, everything is well written
- [x] Implement load and idle from Astro's client directives
    - [x] Implement my own template engine middleware.
- [ ] Implement the Todo app
    - [x] In JSX render 
        - [x] Change the database to support better id handling when it comes to inserting.
        - [ ] Put JSX todo in a different route
        - [ ] ~~[tRPC](https://trpc.io/)~~
            - I don't have any JSON end points so no point in doing this.
    - [ ] ~~HTML static files~~
        - This isn't type safe so Hono's JSX renderer is the best one out of a DX stand point.

### If I have time and energy!
- [ ] Create code snippets for my WC creations
    - [ ] "Standard" WC with render both open and not ShadowDOM
    - [ ] Snippets for shadow open only connectedCallback, slots and template
    - [ ] no shadow dom at all only connectedCallback, now slots and template