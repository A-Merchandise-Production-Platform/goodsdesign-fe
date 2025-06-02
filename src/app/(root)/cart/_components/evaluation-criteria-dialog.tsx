'use client';

import { useState } from 'react';
import { Check, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { OrderEvaluationCriteriaQuery } from '@/graphql/generated/graphql';

type EvaluationCriteriaType =
  OrderEvaluationCriteriaQuery['evaluationCriteriaByProduct'][0];

interface EvaluationCriteriaDialogProps {
  criteria: EvaluationCriteriaType[];
  selectedCriteriaIds: string[];
  onSelectCriteria: (criteriaIds: string[]) => void;
  maxSelection: number;
  loading?: boolean;
}

export function EvaluationCriteriaDialog({
  criteria,
  selectedCriteriaIds,
  onSelectCriteria,
  maxSelection,
  loading = false,
}: EvaluationCriteriaDialogProps) {
  const [open, setOpen] = useState(false);
  const [tempSelectedIds, setTempSelectedIds] =
    useState<string[]>(selectedCriteriaIds);

  const handleCriteriaToggle = (criteriaId: string, isChecked: boolean) => {
    if (isChecked) {
      // Check if we can add more
      if (tempSelectedIds.length >= maxSelection) {
        return; // Don't add if limit reached
      }
      setTempSelectedIds(prev => [...prev, criteriaId]);
    } else {
      setTempSelectedIds(prev => prev.filter(id => id !== criteriaId));
    }
  };

  const handleSave = () => {
    onSelectCriteria(tempSelectedIds);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedIds(selectedCriteriaIds);
    setOpen(false);
  };

  const activeCriteria = criteria.filter(c => c.isActive && !c.isDeleted);

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        setOpen(isOpen);
        if (!isOpen) {
          setTempSelectedIds(selectedCriteriaIds);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Evaluation Criteria
          </span>
          {selectedCriteriaIds.length > 0 && (
            <Badge variant="secondary">
              {selectedCriteriaIds.length} selected
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Evaluation Criteria</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Choose up to {maxSelection} criteria for your order evaluation
          </p>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-sm">
                <span>
                  Selected: {tempSelectedIds.length}/{maxSelection}
                </span>
                {tempSelectedIds.length >= maxSelection && (
                  <span className="text-amber-600">Maximum reached</span>
                )}
              </div>

              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {activeCriteria.length > 0 ? (
                    activeCriteria.map(criteria => {
                      const isSelected = tempSelectedIds.includes(criteria.id);
                      const canSelect =
                        tempSelectedIds.length < maxSelection || isSelected;

                      return (
                        <div
                          key={criteria.id}
                          className={`rounded-lg border p-3 transition-colors ${
                            isSelected
                              ? 'border-primary bg-primary/5'
                              : 'border-border'
                          } ${!canSelect ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id={criteria.id}
                              checked={isSelected}
                              onCheckedChange={checked =>
                                handleCriteriaToggle(
                                  criteria.id,
                                  checked as boolean,
                                )
                              }
                              disabled={!canSelect}
                              className="mt-1"
                            />
                            <div className="flex-1 space-y-1">
                              <label
                                htmlFor={criteria.id}
                                className="cursor-pointer font-medium"
                              >
                                {criteria.name}
                              </label>
                              {criteria.description && (
                                <p className="text-muted-foreground text-sm">
                                  {criteria.description}
                                </p>
                              )}
                            </div>
                            {isSelected && (
                              <Check className="text-primary mt-1 h-4 w-4" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">
                        No evaluation criteria available for this product
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
