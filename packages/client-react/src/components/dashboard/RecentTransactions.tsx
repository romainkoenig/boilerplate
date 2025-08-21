
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTransactions, mockTags } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, MoveRightIcon } from "lucide-react";

export function RecentTransactions() {
  // Sort transactions by date (newest first) and take the first 5
  const recentTransactions = [...mockTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowDownIcon className="h-4 w-4 text-facebook-positive" />;
      case "expense":
        return <ArrowUpIcon className="h-4 w-4 text-destructive" />;
      case "transfer":
        return <MoveRightIcon className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getTagById = (tagId: string) => {
    return mockTags.find(tag => tag.id === tagId) || null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center transaction-row p-2 rounded-md">
              <div className="mr-4">
                {getTransactionIcon(transaction.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{transaction.description}</div>
                <div className="text-xs text-muted-foreground">{formatDate(transaction.date)}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className={transaction.amount < 0 ? "negative-amount" : "positive-amount"}>
                  {formatCurrency(transaction.amount)}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {transaction.tags.map((tagId) => {
                    const tag = getTagById(tagId);
                    if (!tag) return null;
                    return (
                      <Badge key={tagId} style={{ backgroundColor: tag.color }} variant="outline" className="text-[9px] h-4 text-white">
                        {tag.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
