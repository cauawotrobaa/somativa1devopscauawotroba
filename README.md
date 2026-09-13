# Atlas DevOps

Projeto Node pequeno para a somativa de DevOps.

## O que ele mostra

- Uma pagina inicial simples, com visual proposito para a atividade.
- Endpoint `GET /health` para validar que o container esta vivo.
- Endpoint `GET /api/facts` com informacoes do projeto.
- Testes automatizados com `node:test`.
- Dockerfile para build e execucao em container.
- Workflows de CI e CD no GitHub Actions.

## Como executar localmente

```bash
npm test
npm start
```

Depois abra `http://localhost:3000`.

## Docker

```bash
docker build -t atlas-devops .
docker run --rm -p 3000:3000 atlas-devops
```