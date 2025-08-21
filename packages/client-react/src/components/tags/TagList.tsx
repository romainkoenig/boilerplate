
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { mockTags } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, Trash2 } from "lucide-react";

export function TagList() {
  const [tags, setTags] = useState(mockTags);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Tags</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Tag
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {tags.map((tag) => (
              <div 
                key={tag.id} 
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: tag.color }}
                  />
                  <Badge 
                    style={{ backgroundColor: tag.color }} 
                    className="text-white"
                  >
                    {tag.name}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
