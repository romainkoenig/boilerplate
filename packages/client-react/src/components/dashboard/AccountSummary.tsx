
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAccounts } from "@/data/mockData";
import { formatCurrency } from "@/utils/formatters";
import { CreditCard, PiggyBank, Wallet, LineChart } from "lucide-react";

export function AccountSummary() {
  const totalBalance = mockAccounts.reduce((total, account) => total + account.balance, 0);
  
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Wallet className="h-5 w-5 text-primary" />;
      case "savings":
        return <PiggyBank className="h-5 w-5 text-primary" />;
      case "credit":
        return <CreditCard className="h-5 w-5 text-primary" />;
      case "investment":
        return <LineChart className="h-5 w-5 text-primary" />;
      default:
        return <Wallet className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Total Balance</CardTitle>
          <CardDescription>Across all accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockAccounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
              {getAccountIcon(account.type)}
            </CardHeader>
            <CardContent>
              <div className={`text-xl font-bold ${account.balance < 0 ? 'text-destructive' : ''}`}>
                {formatCurrency(account.balance)}
              </div>
              <p className="text-xs text-muted-foreground">{account.provider}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
