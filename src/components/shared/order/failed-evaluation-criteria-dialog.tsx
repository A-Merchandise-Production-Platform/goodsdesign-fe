'use client';

import { useState } from 'react';
import { AlertTriangle, Star, Check } from 'lucide-react';

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

interface EvaluationCriteriaItem {
  id: string;
  createdAt: string;
  evaluationCriteria: {
    id: string;
    name: string;
    description?: string | null;
  };
}

interface FailedEvaluationCriteriaDialogProps {
  criteria: Partial<EvaluationCriteriaItem>[] | null;
  selectedFailedIds: string[];
  onSelectFailedCriteria: (criteriaIds: string[]) => void;
  loading?: boolean;
  disabled?: boolean;
}

export function FailedEvaluationCriteriaDialog({
  criteria,
  selectedFailedIds,
  onSelectFailedCriteria,
  loading = false,
  disabled = false,
}: FailedEvaluationCriteriaDialogProps) {
  const [open, setOpen] = useState(false);
  const [tempSelectedIds, setTempSelectedIds] =
    useState<string[]>(selectedFailedIds);

  const handleCriteriaToggle = (criteriaId: string, isChecked: boolean) => {
    if (isChecked) {
      setTempSelectedIds(prev => [...prev, criteriaId]);
    } else {
      setTempSelectedIds(prev => prev.filter(id => id !== criteriaId));
    }
  };

  const handleSave = () => {
    onSelectFailedCriteria(tempSelectedIds);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedIds(selectedFailedIds);
    setOpen(false);
  };

  const validCriteria = criteria?.filter(c => c.evaluationCriteria) || [];

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        if (disabled) return;
        setOpen(isOpen);
        if (!isOpen) {
          setTempSelectedIds(selectedFailedIds);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
          disabled={loading || disabled}
        >
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Failed Evaluation Criteria
          </span>
          {selectedFailedIds.length > 0 && (
            <Badge variant="destructive">
              {selectedFailedIds.length} selected
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Failed Evaluation Criteria</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Choose which evaluation criteria failed during quality check
          </p>
        </DialogHeader>

        <div className="max-h-[400px]">
          {!loading ? (
            <>
              <ScrollArea className="h-full">
                <div className="space-y-3 pr-3">
                  {validCriteria.length > 0 ? (
                    validCriteria.map(item => {
                      if (!item.evaluationCriteria) return null;

                      const criteriaId = item.evaluationCriteria.id;
                      const isSelected = tempSelectedIds.includes(criteriaId);

                      return (
                        <div
                          key={criteriaId}
                          className={`rounded-lg border p-3 transition-colors ${
                            isSelected
                              ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
                              : 'border-border'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id={criteriaId}
                              checked={isSelected}
                              onCheckedChange={checked =>
                                handleCriteriaToggle(
                                  criteriaId,
                                  checked as boolean,
                                )
                              }
                              className="mt-1"
                            />
                            <div className="flex-1 space-y-1">
                              <label
                                htmlFor={criteriaId}
                                className="cursor-pointer font-medium"
                              >
                                {item.evaluationCriteria.name}
                              </label>
                              {item.evaluationCriteria.description && (
                                <p className="text-muted-foreground text-sm">
                                  {item.evaluationCriteria.description}
                                </p>
                              )}
                            </div>
                            {isSelected && (
                              <Check className="mt-1 h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">
                        No evaluation criteria available for this order
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
            </div>
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
