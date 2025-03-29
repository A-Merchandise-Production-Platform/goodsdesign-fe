import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GetProductByIdQuery } from '@/graphql/generated/graphql';
import { CubeCamera } from '@react-three/drei';
import { format } from 'date-fns';
import { Calendar, Check, Tag, User, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProductOverviewProps {
  product: GetProductByIdQuery['product'];
}

export default function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <div className="container mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="">
          <CardTitle className="flex items-center justify-between text-2xl">
            <span>Product Details</span>
            <span className="text-muted-foreground text-sm">
              ID: {product.id}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="grid gap-0 md:grid-cols-3">
            {/* Product Image */}
            <div className="relative h-[300px] md:h-full">
              <Image
                src={product.imageUrl || 'https://picsum.photos/1000/1000'}
                alt={product.name}
                fill
                className="rounded-md object-cover"
              />
            </div>

            {/* Product Information */}
            <div className="space-y-6 px-4 md:col-span-2">
              {/* Basic Info */}
              <div>
                <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
                <div className="mb-4 flex items-center gap-2">
                  <Badge
                    variant={product.isActive ? 'default' : 'outline'}
                    className="gap-1"
                  >
                    {product.isActive ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    {product.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  {product.isDeleted && (
                    <Badge variant="destructive" className="gap-1">
                      <X className="h-3 w-3" />
                      Deleted
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                  Category
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Tag className="text-muted-foreground h-4 w-4" />
                    <span>{product?.category?.name || ''}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Creation Details
                  </h3>
                  <div className="space-y-2">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm">
                        Created:{' '}
                        <span className="text-foreground ml-2">
                          {format(
                            new Date(product.createdAt),
                            'dd/MM/yyyy HH:mm',
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <User className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm">
                        Created by:{' '}
                        <span className="text-foreground ml-2">
                          {product.createdBy}
                        </span>
                      </span>
                    </div>
                    {product.updatedAt && (
                      <div className="text-primaryflex items-center gap-2">
                        <Calendar className="text-muted-foreground h-4 w-4" />
                        <span className="text-sm">
                          Updated:{' '}
                          <span className="text-foreground ml-2">
                            {format(
                              new Date(product.updatedAt),
                              'dd/MM/yyyy HH:mm',
                            )}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Resources
                  </h3>
                  <div className="space-y-2">
                    {product.model3DUrl && (
                      <div className="flex items-center gap-2">
                        />
                        <a
                          href={product.model3DUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm hover:underline"
                        >
                          View 3D Model
                        </a>
                      </div>
                    )}
                  </div>
                </div> */}
              </div>

              <Separator />

              {/* Technical Info */}
              <div>
                <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                  Technical Information
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Product Type:</div>
                  <div>{product.__typename}</div>
                  <div className="text-muted-foreground">Category Type:</div>
                  <div>{product?.category?.__typename || ''}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
