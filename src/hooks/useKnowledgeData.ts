import { useState, useEffect, useCallback } from "react";
import type { KnowledgeNode, RelationshipEdge, Perspective, TechDomain, CustomerLayer } from "../types/knowledge";
import { PERSPECTIVES } from "../types/knowledge";
import { defaultKnowledgeNodes, defaultRelationshipEdges } from "../data/defaultData";
import {
  productMapping,
  customerMapping,
  phaseMapping,
  workflowMapping,
  resolveGuid,
} from "../data/guidMappings";
import { parseSource } from "../utils/parseSource";
import { parseBody } from "../utils/parseBody";
import { perspectiveToLayers } from "../utils/perspectiveToLayers";
import type { ApiResponse } from "../types/api";

const API_URL = import.meta.env.VITE_KNOWLEDGE_API_URL as string | undefined;

const REL_TYPES = ["因果", "前提", "波及", "対策"] as const;
function normalizeEdgeType(t: string): "因果" | "前提" | "波及" | "対策" {
  if (REL_TYPES.includes(t as (typeof REL_TYPES)[number])) return t as (typeof REL_TYPES)[number];
  return "前提";
}

const DEFAULT_PERSPECTIVE: Perspective = "①判断ルール";
const DEFAULT_DOMAIN: TechDomain = "組み込みソフト";

function normalizePerspective(apiPerspective: string): Perspective {
  if (!apiPerspective || typeof apiPerspective !== "string") return DEFAULT_PERSPECTIVE;
  const key = apiPerspective.charAt(0);
  const found = PERSPECTIVES.find((p) => p.startsWith(key));
  return (found as Perspective) ?? DEFAULT_PERSPECTIVE;
}

function normalizeDomain(apiDomain: string): TechDomain {
  const domains: TechDomain[] = ["電力変換", "組み込みソフト", "通信/車載NW", "機能安全/信頼性", "回路/実装"];
  if (!apiDomain || typeof apiDomain !== "string") return DEFAULT_DOMAIN;
  return domains.includes(apiDomain as TechDomain) ? (apiDomain as TechDomain) : DEFAULT_DOMAIN;
}

export function useKnowledgeData() {
  const [nodes, setNodes] = useState<KnowledgeNode[]>(defaultKnowledgeNodes);
  const [edges, setEdges] = useState<RelationshipEdge[]>(defaultRelationshipEdges);
  const [isLoading, setIsLoading] = useState(!!API_URL);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!API_URL) {
      setNodes(defaultKnowledgeNodes);
      setEdges(defaultRelationshipEdges);
      setIsLive(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data: ApiResponse = await response.json();

      const apiNodes: KnowledgeNode[] = (data.knowledges ?? []).map((k) => {
        const parsed = parseSource(k.name);
        const bodyParsed = parseBody(k.body ?? "");
        const perspective = normalizePerspective(k.perspective);
        const domain = normalizeDomain(k.domain);
        const layers = perspectiveToLayers(k.perspective) as CustomerLayer[];
        return {
          id: k.id,
          title: k.title ?? "",
          perspective,
          domain,
          product: resolveGuid(k.product, productMapping),
          source: k.name ?? "",
          sourceDate: parsed.date ?? "unknown",
          sourceType: parsed.name ?? "",
          customerLayers: Array.isArray(layers) ? layers : [],
          customer: resolveGuid(k.customer, customerMapping),
          phase: resolveGuid(k.phase, phaseMapping),
          workflow: resolveGuid(k.workflow, workflowMapping),
          body: k.body,
          quote: bodyParsed.quote,
        };
      });

      const apiEdges: RelationshipEdge[] = (data.relationships ?? [])
        .filter((r) => r.from !== r.to)
        .map((r) => ({
          from: r.from,
          to: r.to,
          type: normalizeEdgeType(r.type),
          description: r.description ?? "",
        }));

      setNodes(apiNodes);
      setEdges(apiEdges);
      setIsLive(true);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Knowledge API fetch failed, using fallback:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setNodes(defaultKnowledgeNodes);
      setEdges(defaultRelationshipEdges);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { nodes, edges, isLoading, isLive, error, refetch: fetchData, lastUpdated };
}
