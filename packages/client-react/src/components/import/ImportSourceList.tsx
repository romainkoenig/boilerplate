
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockImportSources } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utils/formatters";
import { Building, FileType, FileSpreadsheet, Globe, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ImportSourceList() {
  const [sources, setSources] = useState(mockImportSources);
  
  const getSourceIcon = (type: string) => {
    switch (type) {
      case "bank":
        return <Building className="h-5 w-5 text-primary" />;
      case "csv":
        return <FileSpreadsheet className="h-5 w-5 text-primary" />;
      case "pdf":
        return <FileType className="h-5 w-5 text-primary" />;
      case "api":
        return <Globe className="h-5 w-5 text-primary" />;
      default:
        return <FileType className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Import Sources</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Source
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Import Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sources.map((source) => (
              <Card key={source.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{source.name}</CardTitle>
                  {getSourceIcon(source.type)}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant={source.isConnected ? "default" : "outline"}>
                      {source.isConnected ? "Connected" : "Not Connected"}
                    </Badge>
                    {source.lastImport && (
                      <span className="text-xs text-muted-foreground">
                        Last import: {formatDateTime(source.lastImport)}
                      </span>
                    )}
                  </div>
                  <Button className="w-full mt-4" variant={source.isConnected ? "outline" : "default"}>
                    {source.isConnected ? "Import Data" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
