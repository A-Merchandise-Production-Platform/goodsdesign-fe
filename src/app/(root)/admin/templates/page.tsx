'use client';

import type React from 'react';

import {
  useGetTemplateProductDesignsQuery,
  useRemoveProductDesignMutation,
  useUpdateProductDesignMutation,
} from '@/graphql/generated/graphql';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Info, MoreVertical, Pencil, Trash2, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

// Define types for our data
interface PositionType {
  id: string;
  positionName: string;
  basePrice: number;
}

interface DesignJSON {
  src: string;
  top: number;
  left: number;
  type: string;
  view: string;
  angle: number;
  layer: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
}

interface DesignPosition {
  positionType: PositionType;
  designJSON: DesignJSON[];
}

interface SystemConfigVariant {
  id: string;
  price: number;
  color: string;
  size: string;
  model: string | null;
}

interface Design {
  id: string;
  isPublic: boolean;
  isTemplate: boolean;
  isFinalized: boolean;
  thumbnailUrl: string;
  designPositions: DesignPosition[];
  systemConfigVariant: SystemConfigVariant;
}

type FilterType = 'all' | 'public' | 'private';

export default function Page() {
  const { data, loading, refetch } = useGetTemplateProductDesignsQuery();
  const [removeProductDesign] = useRemoveProductDesignMutation();
  const [updatePublicStatus] = useUpdateProductDesignMutation();
  const router = useRouter();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState<string | null>(null);

  // Initialize designs when data is loaded
  useEffect(() => {
    if (data?.getTemplateProductDesigns) {
      setDesigns(data.getTemplateProductDesigns as Design[]);
    }
  }, [data]);

  // Apply filter when designs or filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredDesigns(designs);
    } else if (filter === 'public') {
      setFilteredDesigns(designs.filter(design => design.isPublic));
    } else {
      setFilteredDesigns(designs.filter(design => !design.isPublic));
    }
  }, [designs, filter]);

  function calculateTotalPrice(design: Design): number {
    // Start with the variant price
    let totalPrice = design.systemConfigVariant?.price || 0;

    // Add the price of each position that has designs
    design.designPositions.forEach(position => {
      if (position.designJSON && position.designJSON.length > 0) {
        totalPrice += position.positionType.basePrice;
      }
    });

    return totalPrice;
  }

  function handleCardClick(id: string): void {
    router.push(`/product/tshirt/${id}`);
  }

  function handleTogglePublic(
    e: React.MouseEvent,
    designId: string,
    currentStatus: boolean,
  ): void {
    e.stopPropagation();

    // Optimistically update the UI
    setDesigns(prevDesigns =>
      prevDesigns.map(design =>
        design.id === designId
          ? { ...design, isPublic: !design.isPublic }
          : design,
      ),
    );

    // Call the mutation to update the public status
    updatePublicStatus({
      variables: {
        updateProductDesignId: designId,
        input: {
          isPublic: !currentStatus,
          isTemplate: true,
          isFinalized: false,
        },
      },
      onCompleted: () => {
        toast.success(`Design is now ${!currentStatus ? 'public' : 'private'}`);
        refetch(); // Refresh data to ensure UI is in sync with server
      },
      onError: error => {
        // Revert the optimistic update on error
        setDesigns(prevDesigns =>
          prevDesigns.map(design =>
            design.id === designId
              ? { ...design, isPublic: currentStatus }
              : design,
          ),
        );
        toast.error(`Failed to update status: ${error.message}`);
      },
    });
  }

  function handleEdit(e: React.MouseEvent, designId: string): void {
    e.stopPropagation();
    // Navigate to the same route as clicking the card
    router.push(`/product/tshirt/${designId}`);
  }

  function openDeleteDialog(e: React.MouseEvent, designId: string): void {
    e.stopPropagation();
    setDesignToDelete(designId);
    setDeleteDialogOpen(true);
  }

  function confirmDelete(): void {
    if (!designToDelete) return;

    // Call the mutation to remove the design
    removeProductDesign({
      variables: {
        removeProductDesignId: designToDelete,
      },
      onCompleted: () => {
        refetch();
        setDeleteDialogOpen(false);
        setDesignToDelete(null);
        toast.success('Design deleted successfully!');
      },
      onError: error => {
        toast.error(`Error deleting design: ${error.message}`);
      },
    });
  }

  function handleCreateNew(): void {
    router.push('/product/tshirt');
  }

  return (
    <div className="bg-background container mx-auto rounded-lg py-6">
      <div className="mb-6 flex items-center justify-between">
        <Tabs
          defaultValue="all"
          value={filter}
          onValueChange={value => setFilter(value as FilterType)}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={handleCreateNew}>
          <PlusCircle className="h-4 w-4" />
          Create New Template
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-square w-full">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredDesigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted mb-4 rounded-full p-3">
            <PlusCircle className="text-muted-foreground h-10 w-10" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">No designs found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {filter !== 'all'
              ? `There are no ${filter} designs available. Try changing your filter or create a new design.`
              : "You don't have any template product designs yet. Create your first design to get started."}
          </p>
          <Button onClick={handleCreateNew}>Create New Design</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDesigns.map(design => (
            <Card
              key={design.id}
              className="relative cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
              onClick={() => handleCardClick(design.id)}
            >
              <div className="relative aspect-square w-full">
                {design.thumbnailUrl ? (
                  <Image
                    src={design.thumbnailUrl || '/placeholder.svg'}
                    alt="Design thumbnail"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No thumbnail</p>
                  </div>
                )}

                {/* Position badges */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {design.designPositions.map(position =>
                    position.designJSON.length > 0 ? (
                      <Badge
                        key={position.positionType.id}
                        variant="secondary"
                        className="backdrop-blur-sm"
                      >
                        {position.positionType.positionName}
                      </Badge>
                    ) : null,
                  )}
                </div>

                {/* Action dropdown */}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={e => e.stopPropagation()}
                    >
                      <button className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={e => handleEdit(e, design.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center justify-between"
                        onClick={e => e.stopPropagation()}
                      >
                        <span>Public</span>
                        <Switch
                          checked={design.isPublic}
                          onCheckedChange={() => {
                            const event = {
                              stopPropagation: () => {},
                            } as React.MouseEvent;
                            handleTogglePublic(
                              event,
                              design.id,
                              design.isPublic,
                            );
                          }}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={e => openDeleteDialog(e, design.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-5 w-5 rounded-full border"
                      style={{
                        backgroundColor:
                          design.systemConfigVariant?.color || '#cccccc',
                      }}
                      title={design.systemConfigVariant?.color}
                    />
                    {design.isPublic ? (
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700"
                      >
                        Public
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-gray-200 bg-gray-50 text-gray-700"
                      >
                        Private
                      </Badge>
                    )}
                    {design.isFinalized && (
                      <Badge variant="outline">Finalized</Badge>
                    )}
                  </div>

                  {design.systemConfigVariant && (
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger
                          asChild
                          onClick={e => e.stopPropagation()}
                        >
                          <button className="hover:text-primary">
                            <Info className="h-4 w-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-64"
                          onClick={e => e.stopPropagation()}
                        >
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">Base Price:</span>
                              <span>
                                {formatPrice(design.systemConfigVariant.price)}
                              </span>
                            </div>
                            {design.designPositions.map(position =>
                              position.designJSON.length > 0 ? (
                                <div
                                  key={position.positionType.id}
                                  className="flex justify-between"
                                >
                                  <span>
                                    {position.positionType.positionName}:
                                  </span>
                                  <span>
                                    +
                                    {formatPrice(
                                      position.positionType.basePrice,
                                    )}
                                  </span>
                                </div>
                              ) : null,
                            )}
                            <div className="mt-2 flex justify-between border-t pt-2 font-bold">
                              <span>Total:</span>
                              <span>
                                {formatPrice(calculateTotalPrice(design))}
                              </span>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <p className="text-lg font-medium">
                        {formatPrice(calculateTotalPrice(design))}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this design? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
