import { Card, CardContent } from "./ui/card";

interface ZenQuoteProps {
  quote: string;
  author: string;
}

const ZenQuote = ({ quote, author }: ZenQuoteProps) => {
  return (
    <Card className="text-center italic border-0 bg-green-20 dark:bg-green-70">
      <CardContent className="space-y-4">
        <p>"{quote}"</p>
        <p className="text-1xl text-muted-foreground">— {author}</p>
      </CardContent>
    </Card>
  );
};

export default ZenQuote;
