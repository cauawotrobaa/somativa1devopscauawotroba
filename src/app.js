const projectFacts = [
  {
    title: 'CI confiavel',
    text: 'Cada alteracao passa por testes automaticos antes de chegar ao main.'
  },
  {
    title: 'CD pratico',
    text: 'O fluxo de entrega publica a imagem do container no registro do GitHub.'
  },
  {
    title: 'Docker simples',
    text: 'A aplicacao sobe de forma previsivel em qualquer maquina com Docker.'
  },
  {
    title: 'Projeto humano',
    text: 'A interface foi escrita como um painel curto, limpo e direto ao ponto.'
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderHomePage() {
  const cards = projectFacts
    .map(
      (fact) => `
        <article class="card">
          <h2>${escapeHtml(fact.title)}</h2>
          <p>${escapeHtml(fact.text)}</p>
        </article>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Atlas DevOps</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #0f172a;
        --bg-soft: #111827;
        --surface: rgba(15, 23, 42, 0.78);
        --surface-border: rgba(148, 163, 184, 0.2);
        --text: #e2e8f0;
        --muted: #94a3b8;
        --accent: #38bdf8;
        --accent-strong: #22c55e;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 34%),
          radial-gradient(circle at right, rgba(34, 197, 94, 0.15), transparent 30%),
          linear-gradient(180deg, var(--bg), var(--bg-soft));
      }

      main {
        width: min(1080px, calc(100% - 32px));
        margin: 0 auto;
        padding: 72px 0 48px;
      }

      .hero {
        padding: 32px;
        border: 1px solid var(--surface-border);
        border-radius: 24px;
        background: var(--surface);
        backdrop-filter: blur(18px);
        box-shadow: 0 24px 80px rgba(2, 6, 23, 0.45);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(56, 189, 248, 0.12);
        color: #bae6fd;
        font-size: 0.875rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      h1 {
        margin: 18px 0 12px;
        font-size: clamp(2.4rem, 6vw, 4.8rem);
        line-height: 0.98;
        max-width: 12ch;
      }

      .lead {
        margin: 0;
        max-width: 60ch;
        color: var(--muted);
        font-size: 1.08rem;
        line-height: 1.7;
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 24px;
      }

      .pill {
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(148, 163, 184, 0.18);
        background: rgba(15, 23, 42, 0.6);
        color: var(--text);
        font-size: 0.95rem;
      }

      .pill strong {
        color: var(--accent);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
        margin-top: 20px;
      }

      .card {
        padding: 22px;
        border-radius: 20px;
        border: 1px solid var(--surface-border);
        background: rgba(15, 23, 42, 0.68);
      }

      .card h2 {
        margin: 0 0 10px;
        font-size: 1.1rem;
      }

      .card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.65;
      }

      footer {
        padding: 18px 2px 0;
        color: var(--muted);
        font-size: 0.95rem;
      }

      @media (max-width: 760px) {
        main {
          width: min(100% - 20px, 1080px);
          padding-top: 20px;
        }

        .hero {
          padding: 22px;
          border-radius: 20px;
        }

        .grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <span class="eyebrow">Atlas DevOps</span>
        <h1>Uma aplicacao Node simples para mostrar entrega real.</h1>
        <p class="lead">
          Este projeto foi feito para rodar localmente, dentro de container e com pipeline automatizado.
          Ele resume o que importa nesta somativa: codigo enxuto, build previsivel e entrega continua.
        </p>

        <div class="meta">
          <span class="pill"><strong>Status:</strong> pronto para Docker</span>
          <span class="pill"><strong>CI:</strong> npm test</span>
          <span class="pill"><strong>CD:</strong> imagem no GHCR</span>
        </div>
      </section>

      <section class="grid" aria-label="Resumo do projeto">
        ${cards}
      </section>

      <footer>
        Endpoint de saude: <a href="/health" style="color: var(--accent)">/health</a>
      </footer>
    </main>
  </body>
</html>`;
}

function createResponseBody(requestUrl) {
  if (requestUrl === '/health') {
    return {
      statusCode: 200,
      contentType: 'application/json; charset=utf-8',
      body: JSON.stringify({
        ok: true,
        service: 'atlas-devops',
        timestamp: new Date().toISOString()
      })
    };
  }

  if (requestUrl === '/api/facts') {
    return {
      statusCode: 200,
      contentType: 'application/json; charset=utf-8',
      body: JSON.stringify({
        project: 'Atlas DevOps',
        facts: projectFacts
      })
    };
  }

  if (requestUrl === '/' || requestUrl.startsWith('/?')) {
    return {
      statusCode: 200,
      contentType: 'text/html; charset=utf-8',
      body: renderHomePage()
    };
  }

  return {
    statusCode: 404,
    contentType: 'text/plain; charset=utf-8',
    body: 'Pagina nao encontrada.'
  };
}

export { createResponseBody, renderHomePage, projectFacts };