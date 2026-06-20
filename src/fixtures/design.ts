import type { ClipboardItem } from "../types";

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export function designFixtureItems(): ClipboardItem[] {
  return [
    {
      id: "d1",
      scope: "domain",
      domain: "web.whatsapp.com",
      title: "Saudação inicial",
      content: "Olá! Tudo bem? Sou da equipe e já vou te ajudar por aqui. Pode me contar o que você precisa?",
      favorite: true,
      createdAt: daysAgo(7),
      updatedAt: daysAgo(2),
      lastCopiedAt: daysAgo(2)
    },
    {
      id: "d2",
      scope: "domain",
      domain: "web.whatsapp.com",
      title: "Pedido de documentos",
      content: "Para dar andamento, preciso de: RG, CPF e comprovante de residência atualizado. Pode enviar por aqui mesmo.",
      favorite: false,
      createdAt: daysAgo(10),
      updatedAt: daysAgo(5),
      lastCopiedAt: daysAgo(5)
    },
    {
      id: "d3",
      scope: "domain",
      domain: "web.whatsapp.com",
      title: "Encerramento do atendimento",
      content: "Fico à disposição! Qualquer dúvida, é só chamar por aqui. Tenha um ótimo dia.",
      favorite: false,
      createdAt: daysAgo(7),
      updatedAt: daysAgo(7),
      lastCopiedAt: null
    },
    {
      id: "t1",
      scope: "domain",
      domain: "portal.tjsp.jus.br",
      title: "Pedido de protocolo",
      content: "Por gentileza, informe o número de protocolo para localizar seu atendimento.",
      favorite: false,
      createdAt: daysAgo(12),
      updatedAt: daysAgo(3),
      lastCopiedAt: daysAgo(3)
    },
    {
      id: "t2",
      scope: "domain",
      domain: "portal.tjsp.jus.br",
      title: "Juntada de documentos",
      content: "Requer-se a juntada dos documentos anexos para a devida instrução do feito.",
      favorite: false,
      createdAt: daysAgo(14),
      updatedAt: daysAgo(14),
      lastCopiedAt: null
    },
    {
      id: "g1",
      scope: "global",
      domain: null,
      title: "Pedido de protocolo",
      content: "Por gentileza, me informe o número de protocolo para que eu localize seu atendimento.",
      favorite: false,
      createdAt: daysAgo(12),
      updatedAt: daysAgo(7),
      lastCopiedAt: daysAgo(7)
    },
    {
      id: "g2",
      scope: "global",
      domain: null,
      title: "Dados bancários — PIX",
      content: "Chave PIX (CNPJ): 12.345.678/0001-90 — Banco 077. Confirme o envio para liberar o serviço.",
      favorite: true,
      createdAt: daysAgo(8),
      updatedAt: daysAgo(1),
      lastCopiedAt: daysAgo(1)
    }
  ];
}

export function useDesignFixture() {
  return new URLSearchParams(window.location.search).get("fixture") === "design";
}
