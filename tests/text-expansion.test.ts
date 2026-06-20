import test from "node:test";
import assert from "node:assert/strict";
import { normalizeItem } from "../src/lib/storage";
import { findTextExpansion } from "../src/lib/text-expansion";

const data = normalizeItem({
  id: "data",
  scope: "global",
  title: "Data",
  content: "20/06/2026",
  commandEnabled: true,
  commandTrigger: "/data"
});

test("encontra comando no sufixo do texto antes do cursor", () => {
  assert.deepEqual(findTextExpansion("Hoje e /data", [data]), {
    start: 7,
    end: 12,
    replacement: "20/06/2026",
    itemId: "data"
  });
});

test("ignora comando desconhecido", () => {
  assert.equal(findTextExpansion("Hoje e /hora", [data]), null);
});

test("faz matching case-insensitive", () => {
  assert.equal(findTextExpansion("Hoje e /DATA", [data])?.replacement, "20/06/2026");
});

test("marca somente o comando como range de substituicao", () => {
  const match = findTextExpansion("Ola amigo /data", [data]);
  assert.equal(match?.start, "Ola amigo ".length);
  assert.equal(match?.end, "Ola amigo /data".length);
});
