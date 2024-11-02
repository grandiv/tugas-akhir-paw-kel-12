import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, price }) => {
  return (
    <Card className="max-w-sm">
      <CardHeader className="h-[20vw]">
        <Image
          src={imageUrl}
          alt={name}
          width={250}
          height={250}
          className="rounded-t-lg object-cover mx-auto"
        />
      </CardHeader>
      <CardContent className="h-[6vw]">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="mt-2">
          Rp {price.toLocaleString()}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full">
          Tambah
        </button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
