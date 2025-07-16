import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductCard({ product }: { product: any }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-40 w-40"
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <h2 className="text-sm font-semibold line-clamp-2">{product.title}</h2>
        <p className="text-xs text-muted-foreground line-clamp-3">{product.description}</p>
        <p className="text-base font-bold">${product.price}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm">Buy Now</Button>
        <Button size="sm" variant="outline">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
