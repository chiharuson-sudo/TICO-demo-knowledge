export type ApiKnowledge = {
  id: string;
  name: string;
  title: string;
  perspective: string;
  domain: string;
  product: string;
  customer: string;
  source: string;
  phase: string;
  workflow: string;
  body: string;
};

export type ApiRelationship = {
  from: string;
  to: string;
  type: string;
  description: string;
};

export type ApiResponse = {
  knowledges: ApiKnowledge[];
  relationships: ApiRelationship[];
};
