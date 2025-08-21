
export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  currency: string;
  provider: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  type: "income" | "expense" | "transfer";
  notes?: string;
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface ImportSource {
  id: string;
  name: string;
  type: "bank" | "csv" | "pdf" | "api";
  isConnected: boolean;
  lastImport?: string;
}
