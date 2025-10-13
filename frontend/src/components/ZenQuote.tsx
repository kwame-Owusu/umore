import { Card, CardContent } from "./ui/card";

interface ZenQuoteProps {
  quote: string;
  author: string;
}

const ZenQuote = ({ quote, author }: ZenQuoteProps) => {
  return (
    <Card className="text-center italic border-0 bg-green-20 dark:bg-green-70 animate-in fade-in slide-in-from-top-4 duration-700">
      <CardContent className="space-y-4">
        <p className="text-xl">"{quote}"</p>
        <p className="text-sm text-muted-foreground">— {author}</p>
      </CardContent>
    </Card>
  );
};

export default ZenQuote;
