
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTransactions } from "@/data/mockData";
import { formatCurrency } from "@/utils/formatters";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export function SpendingOverview() {
  // Get only expense transactions
  const expenses = mockTransactions.filter(tx => tx.type === "expense");
  
  // Group expenses by category and calculate total amount per category
  const categoryTotals = expenses.reduce((acc, tx) => {
    const category = tx.category;
    const amount = Math.abs(tx.amount);
    
    if (!acc[category]) {
      acc[category] = 0;
    }
    
    acc[category] += amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Convert to array for chart
  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));
  
  // Sort by value (highest first)
  chartData.sort((a, b) => b.value - a.value);
  
  // Colors for the chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          {chartData.slice(0, 4).map((category, index) => (
            <div key={category.name} className="flex flex-col">
              <div className="text-sm font-medium">{category.name}</div>
              <div className="text-sm">{formatCurrency(category.value)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
