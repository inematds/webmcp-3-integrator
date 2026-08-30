export const course = {
  repo: 'webmcp-3-integrator',
  phase: '3',
  role: 'WebMCP Integrator',
  shortRole: 'Integrator',
  track: '2',
  accent: 'blue',
  icon: '🔗',
  description: 'Transforme jornadas reais, sites existentes e aplicações modernas em integrações WebMCP coerentes, recuperáveis e sem duplicação de regras.',
  promise: 'Saia de tools isoladas para uma integração completa com estado, erros, migração e frameworks.',
  labName: 'Estúdio de migração WebMCP',
  labDescription: 'Audite uma jornada existente, desenhe o catálogo contextual e gere um plano de migração verificável.'
};

export const modules = [
  {
    id: '2-1', number: '1.1', icon: '🧭', title: 'Design de ferramentas', duration: '3h', type: 'Arquitetura',
    promise: 'Uma intenção por contrato',
    description: 'Converta jornadas humanas em ferramentas pequenas, distintas e fáceis de escolher.',
    lab: 'Refatorar um catálogo ambíguo em uma sequência de tools com responsabilidade única e critérios de escolha.',
    svg: ['Jornada humana', 'Catálogo coerente', 'Escolha do agente'],
    topics: [
      ['Comece pela jornada crítica', 'Uma tool nasce de um objetivo real do usuário, não de cada botão ou função existente no código.', 'Mapear início, decisão, efeito e evidência impede que a integração copie a interface sem compreender a intenção.', ['objetivo observável', 'estado inicial', 'efeito esperado', 'evidência final'], `jornada: "encontrar e reservar uma vaga"
estado_inicial: "catálogo aberto"
resultado: "reserva preparada, ainda não confirmada"`],
      ['Dê uma responsabilidade a cada tool', 'Ferramentas pequenas realizam uma intenção completa e não competem pela mesma chamada.', 'Quando duas descrições parecem responder ao mesmo pedido, a LLM precisa adivinhar e a taxa de escolha correta cai.', ['sem sobreposição', 'verbo preciso', 'fronteira clara', 'saída própria'], `buscar_cursos({ tema, nivel })
consultar_curso({ cursoId })
verificar_vagas({ cursoId, turmaId })`],
      ['Projete entradas para o agente', 'A entrada deve pedir apenas dados necessários e representar alternativas fechadas com enums quando possível.', 'Schemas focados reduzem argumentos inventados, mas a validação real continua obrigatória no execute e no backend.', ['campos mínimos', 'enum útil', 'descrição concreta', 'validação real'], `nivel: {
  type: "string",
  enum: ["iniciante", "intermediario", "avancado"]
}`],
      ['Escolha IDs e nomes compreensíveis', 'O agente pode conhecer o nome dito pelo usuário antes de conhecer o identificador interno do sistema.', 'Separar busca, resolução e ação evita exigir IDs opacos cedo demais ou aceitar nomes ambíguos tarde demais.', ['nome descobre', 'ID identifica', 'resolução explícita', 'ambiguidade tratada'], `const curso = await buscar_cursos({ tema: "WebMCP" });
await consultar_curso({ cursoId: curso.id });`],
      ['Registre somente o que faz sentido agora', 'O catálogo deve acompanhar rota, seleção, autenticação e etapa atual da jornada.', 'Menos ferramentas disponíveis significam menos contexto e menos chamadas impossíveis.', ['catálogo contextual', 'registro dinâmico', 'sessão visível', 'cleanup'], `await modelContext.registerTool(confirmarInscricao, {
  signal: etapaConfirmacao.signal
});`],
      ['Refatore um catálogo ruim', 'Nomes genéricos e sobrepostos precisam virar uma sequência que revele intenção e efeito.', 'A entrega prova que o catálogo orienta o agente e também explica o fluxo para produto, segurança e QA.', ['inventário', 'refatoração', 'teste de escolha', 'documentação'], `// antes
curso(); gerenciar_curso(); resolver_inscricao();
// depois
buscar_cursos(); iniciar_inscricao(); confirmar_inscricao();`]
    ]
  },
  {
    id: '2-2', number: '1.2', icon: '🔄', title: 'Estado, erros e recuperação', duration: '3h', type: 'Resiliência',
    promise: 'O agente sabe como continuar',
    description: 'Modele dependências, stale state, idempotência, timeout, cancelamento e recuperação.',
    lab: 'Implementar uma inscrição em etapas que bloqueia chamadas fora de ordem e devolve instruções de recuperação.',
    svg: ['Estado atual', 'Tool permitida', 'Próxima ação'],
    topics: [
      ['Modele a jornada como estados', 'Cada etapa declara o que já aconteceu, quais ações estão disponíveis e qual transição é válida.', 'Sem um modelo de estado, o agente pode confirmar antes de iniciar ou repetir um efeito já concluído.', ['estado explícito', 'transição válida', 'pré-condição', 'efeito'], `rascunho -> iniciado -> aguardando_confirmacao -> confirmado`],
      ['Separe erros recuperáveis e definitivos', 'Erros recuperáveis indicam uma próxima ação; erros definitivos encerram a tentativa com motivo verificável.', 'A classificação evita loops cegos e permite que o agente explique alternativas reais ao usuário.', ['código estável', 'mensagem acionável', 'próxima ação', 'fim honesto'], `return {
  ok: false,
  code: "INSCRICAO_NAO_INICIADA",
  recovery: { tool: "iniciar_inscricao" }
};`],
      ['Proteja contra stale state', 'O estado usado para decidir pode mudar antes da execução, especialmente em vagas, preços e permissões.', 'Revalidar no momento do efeito impede que uma tool use uma fotografia antiga como autorização atual.', ['revalidação', 'versão de estado', 'conflito', 'nova leitura'], `if (input.version !== inscricao.version) {
  throw new ConflictError("Estado mudou; consulte novamente.");
}`],
      ['Faça mutações idempotentes', 'Uma chave de idempotência permite repetir uma solicitação sem duplicar inscrição, cobrança ou envio.', 'Agentes, redes e usuários podem repetir chamadas; a operação precisa distinguir retry de novo efeito.', ['idempotency key', 'retry seguro', 'resultado anterior', 'efeito único'], `headers: { "Idempotency-Key": executionId }`],
      ['Cancele e limite o tempo', 'AbortSignal e timeout encerram trabalho que perdeu relevância ou excedeu a janela operacional.', 'Cancelar de verdade preserva recursos e evita que a interface mostre sucesso depois que a pessoa desistiu.', ['AbortSignal', 'timeout', 'cleanup visual', 'resultado cancelado'], `const signal = AbortSignal.any([
  executionSignal,
  AbortSignal.timeout(8000)
]);`],
      ['Teste a recuperação ponta a ponta', 'A integração deve provar caminho feliz, ordem inválida, retry, cancelamento e mudança concorrente.', 'Uma matriz de falhas transforma resiliência em comportamento verificável, não em intenção de arquitetura.', ['cenários', 'evidência', 'reprodução', 'regressão'], `confirmar antes de iniciar -> recovery: iniciar_inscricao
retry com mesma chave -> mesmo resultado
timeout -> interface volta ao estado estável`]
    ]
  },
  {
    id: '2-3', number: '1.3', icon: '🏗️', title: 'Migração de sites existentes', duration: '3h', type: 'Migração',
    promise: 'Adapte sem redesenhar tudo',
    description: 'Audite jornadas, reaproveite lógica existente e introduza WebMCP como enhancement progressivo.',
    lab: 'Produzir inventário, mapa de tools, riscos, plano de migração e uma primeira implementação em um site real.',
    svg: ['Site existente', 'Camada WebMCP', 'Jornada preservada'],
    topics: [
      ['Faça um inventário funcional', 'Mapeie formulários, handlers, serviços, endpoints e estados antes de propor tools.', 'A auditoria revela onde a regra já existe e onde a interface contém lógica que precisa ser separada.', ['formulários', 'funções JS', 'APIs', 'estado'], `form -> submitHandler -> enrollmentService -> POST /api/enrollments`],
      ['Priorize jornadas por valor e risco', 'Nem toda funcionalidade merece migrar primeiro; combine frequência, valor, estabilidade e reversibilidade.', 'O recorte correto entrega aprendizado cedo sem começar por uma ação crítica ou mal compreendida.', ['valor', 'frequência', 'risco', 'estabilidade'], `prioridade = valor * frequencia * estabilidade / risco`],
      ['Extraia lógica da interface', 'A mesma função de domínio deve atender clique humano e execução WebMCP.', 'Compartilhar a lógica evita divergência entre o fluxo visual e o caminho do agente.', ['serviço comum', 'UI adaptadora', 'tool adaptadora', 'regra única'], `async function iniciarInscricao(input, context) {
  return enrollmentService.start(input, context);
}`],
      ['Crie wrappers finos', 'A tool traduz argumentos, chama o serviço existente, atualiza a UI e devolve uma resposta estruturada.', 'Wrappers pequenos são mais fáceis de revisar e não recriam a aplicação dentro do registro WebMCP.', ['tradução', 'serviço existente', 'UI sincronizada', 'retorno'], `execute: async (input, { signal }) => {
  const result = await service.start(input, { signal });
  ui.showDraft(result);
  return result;
}`],
      ['Publique por enhancement progressivo', 'O caminho humano continua funcional quando WebMCP não existe ou está desativado.', 'Uma tecnologia experimental entra como capacidade adicional, com observação e rollback.', ['feature detect', 'fallback', 'rollout', 'rollback'], `if (document.modelContext?.registerTool) {
  registerEnrollmentTools();
}`],
      ['Entregue o dossiê de migração', 'O dossiê conecta inventário, catálogo, riscos, implementação, testes e plano de publicação.', 'A migração se torna revisável por produto, desenvolvimento, segurança e operação.', ['mapa', 'risco', 'prova funcional', 'rollout'], `entrega/
  inventario.md
  catalogo-tools.json
  riscos.md
  prova-funcional/
  plano-rollout.md`]
    ]
  },
  {
    id: '2-4', number: '1.4', icon: '⚛️', title: 'Frameworks modernos', duration: '3h', type: 'Implementação',
    promise: 'Ciclo de vida sem duplicação',
    description: 'Integre WebMCP a SPA, React, Angular e Next.js com registro e cleanup previsíveis.',
    lab: 'Implementar o mesmo catálogo em JavaScript puro e em um framework, demonstrando montagem, atualização e desmontagem.',
    svg: ['Componente monta', 'Tools registradas', 'Cleanup'],
    topics: [
      ['Use JavaScript puro como referência', 'Uma implementação sem framework explicita registro, dependências e cleanup.', 'A referência reduz magia e ajuda a diagnosticar problemas escondidos por hooks ou injeção de dependência.', ['função pura', 'registro explícito', 'AbortController', 'baseline'], `const lifecycle = new AbortController();
registerTools(modelContext, services, lifecycle.signal);`],
      ['Modele um hook React idempotente', 'O efeito registra tools para o estado atual e o cleanup aborta os registros anteriores.', 'Strict Mode, rerenders e mudanças de dependência não podem duplicar nomes no catálogo.', ['useEffect', 'dependências', 'cleanup', 'Strict Mode'], `useEffect(() => {
  const controller = new AbortController();
  registerTools({ courseId, signal: controller.signal });
  return () => controller.abort();
}, [courseId]);`],
      ['Encapsule em serviço Angular', 'Um serviço recebe dependências, registra as tools e expõe cleanup ao componente ou rota.', 'A injeção de dependência mantém regras testáveis e separadas do ciclo visual.', ['service', 'DI', 'OnDestroy', 'testabilidade'], `ngOnDestroy() {
  this.webMcpRegistration.abort();
}`],
      ['Respeite cliente e servidor no Next.js', 'document.modelContext só existe no cliente e depois que o documento está ativo.', 'Separar componente cliente, carregamento e API do servidor evita acesso ao Document durante SSR.', ['use client', 'hydration', 'SSR', 'API route'], `"use client";
useEffect(() => registerPageTools(), []);`],
      ['Atualize tools ao trocar de rota', 'SPAs precisam retirar ferramentas da rota anterior e registrar apenas as capacidades da nova tela.', 'Catálogo obsoleto é stale UI: o agente vê uma ação que a pessoa já não pode executar.', ['router', 'unmount', 'catálogo atual', 'transição'], `routeController.abort("route changed");
routeController = new AbortController();`],
      ['Compare implementações com a mesma prova', 'Frameworks diferentes devem cumprir o mesmo contrato observável de registro, execução, UI e cleanup.', 'Uma matriz comum separa diferenças de ergonomia de diferenças reais de comportamento.', ['mesmo contrato', 'mesmos testes', 'cleanup provado', 'compatibilidade'], `| Implementação | registra 1x | atualiza UI | aborta | fallback |
| Vanilla       | sim         | sim        | sim    | sim      |
| React         | sim         | sim        | sim    | sim      |`]
    ]
  }
];

export const chapters = [
  { id: 'capitulo-1', number: '1', title: 'Núcleo de integração', status: 'disponivel', description: 'Quatro módulos para projetar, recuperar, migrar e integrar.', modules: modules.map(module => ({ number: module.number, title: module.title, href: `curso/integrator/modulo-${module.id}.html` })) },
  { id: 'capitulo-2', number: '2', title: 'Migração em escala', status: 'proximo', description: 'Inventário multipágina, priorização de portfólio e rollout em lotes.', modules: [{number:'2.1',title:'Crawler de jornadas'},{number:'2.2',title:'Catálogo corporativo'},{number:'2.3',title:'Migração por ondas'},{number:'2.4',title:'Governança de mudanças'}] },
  { id: 'capitulo-3', number: '3', title: 'Ecossistemas', status: 'proximo', description: 'Design systems, CMS, e-commerce e aplicações compostas.', modules: [{number:'3.1',title:'CMS e conteúdo'},{number:'3.2',title:'Comércio e checkout'},{number:'3.3',title:'Microfrontends'},{number:'3.4',title:'Aplicações embarcadas'}] },
  { id: 'capitulo-4', number: '4', title: 'Entrega Integrator', status: 'proximo', description: 'Qualidade, documentação, handoff e projeto aplicado.', modules: [{number:'4.1',title:'Contrato de integração'},{number:'4.2',title:'Matriz de compatibilidade'},{number:'4.3',title:'Handoff operacional'},{number:'4.4',title:'Projeto final Integrator'}] }
];

