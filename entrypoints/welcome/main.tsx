import React from "react";
import { createRoot } from "react-dom/client";
import { BrandMark, Button, Icon } from "../../src/components";
import "../../src/styles/welcome.css";

function App() {
  return (
    <main className="welcome-shell">
      <header className="hero">
        <div className="welcome-brand-lockup">
          <BrandMark />
          <span>Copia e <strong>Cola</strong></span>
        </div>
        <p className="eyebrow">Extensão instalada</p>
        <h1>Tudo pronto para copiar menos e colar melhor</h1>
        <p className="hero__subtitle">Salve os textos que você repete e copie de volta com um clique — organizados pelo site em que você está.</p>
      </header>
      <section className="steps" aria-label="Como funciona">
        <article><span><Icon name="globe" size={20} /></span><small>Passo 1</small><h2>Contexto por site</h2><p>Cada site mostra só os textos salvos para ele. Sem listas infinitas para rolar.</p></article>
        <article><span><Icon name="plus" size={20} /></span><small>Passo 2</small><h2>Salve em segundos</h2><p>Cole o texto, dê um título opcional e salve. Pronto para reutilizar.</p></article>
        <article><span><Icon name="copy" size={20} /></span><small>Passo 3</small><h2>Copie com 1 clique</h2><p>Reutilize sem reescrever — direto da lista, na hora.</p></article>
      </section>
      <section className="privacy-card">
        <Icon name="shield-check" size={18} />
        <p>Seus dados ficam neste navegador. Local-first por padrão. Nada é enviado para servidores.</p>
      </section>
      <div className="hero__actions">
        <Button id="start-button" variant="primary" size="lg" icon="check" onClick={() => window.close()}>Começar a salvar</Button>
        <a id="options-link" className="button button--ghost button--lg" href="/options.html">Ver no GitHub</a>
      </div>
      <p className="welcome-hint"><Icon name="plus" size={14} /> Dica: fixe o ícone na barra do navegador para abrir ainda mais rápido.</p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
