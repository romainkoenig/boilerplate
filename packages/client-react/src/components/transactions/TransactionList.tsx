
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { mockTransactions, mockTags } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, MoveRightIcon, Pencil, Plus } from "lucide-react";
import { useState } from "react";

export function TransactionList() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...mockTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Transactions</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Transaction
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className={selectedTransaction === transaction.id ? "bg-muted/50" : ""}
                onClick={() => setSelectedTransaction(
                  selectedTransaction === transaction.id ? null : transaction.id
                )}
              >
                <TableCell className="w-12">
                  {getTransactionIcon(transaction.type)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {transaction.tags.map((tagId) => {
                      const tag = getTagById(tagId);
                      if (!tag) return null;
                      return (
                        <Badge key={tagId} style={{ backgroundColor: tag.color }} variant="outline" className="text-xs text-white">
                          {tag.name}
                        </Badge>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell className={`text-right ${transaction.amount < 0 ? "negative-amount" : "positive-amount"}`}>
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell className="w-12">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
