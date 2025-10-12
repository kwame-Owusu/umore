import { Card, CardContent } from "./ui/card";

interface ZenQuoteProps {
  quote: string;
  author: string;
}

const ZenQuote = ({ quote, author }: ZenQuoteProps) => {
  return (
    <Card className="text-center italic border-0 bg-green-20">
      <CardContent className="space-y-4">
        <p>"{quote}"</p>
        <p className="text-sm text-muted-foreground">— {author}</p>
      </CardContent>
    </Card>
  );
};

export default ZenQuote;
