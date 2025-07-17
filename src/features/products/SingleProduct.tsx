import type { IProduct } from "@/@types/product"; // adjust path as needed
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams() as { id: string };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <div className="flex justify-self-center">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-fit max-h-80 object-fill rounded-xl"
          />
        )}
      </div>

      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        {product.isAvailable && product.stock > 0 ? (
          <Badge className="bg-green-100 text-green-700">Available</Badge>
        ) : (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
      </div>

      <p className="text-gray-600">
        {product.description || "No description available."}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-primary">
          ₹ {product.price}
        </span>
        <span className="text-sm text-gray-500 font-medium">
          <span className="font-bold">Stock: </span>
          {product.stock}
        </span>
      </div>

      {product.category && (
        <p className="text-sm text-gray-500">
          <span className="font-bold">Category: &nbsp;</span>
          {product.category}
        </p>
      )}

      <Button className="w-full mt-4" disabled={!product.isAvailable}>
        {product.isAvailable ? "Add to Cart" : "Notify Me"}
      </Button>
    </div>
  );
}

export default SingleProduct;
