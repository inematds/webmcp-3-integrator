# Entrega e progressão — WebMCP Integrator

## Resultado esperado

Ao terminar esta fase, o aluno consegue:

1. transformar jornadas reais em tools com responsabilidade única;
2. modelar estado, erros, idempotência e recuperação;
3. migrar um site sem duplicar regras de domínio;
4. integrar registro e cleanup ao ciclo de vida de frameworks;
5. preservar a experiência humana como fallback;
6. entregar um dossiê de migração reproduzível.

## Evidências obrigatórias

| Módulo | Entrega | Evidência mínima |
|---|---|---|
| 1.1 | Catálogo refatorado | responsabilidades distintas e teste de escolha |
| 1.2 | Jornada recuperável | ordem inválida, retry, timeout e cancelamento |
| 1.3 | Dossiê de migração | inventário, wrappers, riscos e rollout |
| 1.4 | Duas implementações | mesmo contrato em JavaScript e framework |

## Portão para a Formação 4

A fase fica elegível quando:

- 24 tópicos estão marcados como lidos;
- quatro entregas possuem evidência registrada pelo aluno;
- o catálogo final foi analisado pelo validador;
- falhas críticas do relatório foram corrigidas;
- o aluno exportou a jornada ou confirmou que continuará na mesma origem.

O conteúdo da próxima fase pode ser consultado antes do portão. A ordem é requisito de certificação, não bloqueio artificial de estudo.

## Transporte do estado

O namespace é `inema.webmcp-zero-expert.*`. As páginas usam IDs estáveis como:

```text
modulo-2-1#topico-1
modulo-2-4#topico-6
```

No GitHub Pages, os repositórios da organização são caminhos sob `inematds.github.io`, portanto compartilham a origem e o `localStorage`. Em domínio distinto, use exportação/importação JSON. Um handoff assinado por backend fica reservado para a evolução da plataforma; o estado completo nunca deve ser colocado na URL.

## Próxima fase

`webmcp-4-agent-developer` construirá o agente que descobre, seleciona e executa as tools oferecidas pelas páginas, com permissões e loop conversacional controlado.
