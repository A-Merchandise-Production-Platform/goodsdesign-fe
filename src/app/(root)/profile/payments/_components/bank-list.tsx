'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useDeleteUserBankMutation,
  useGetMyUserBanksQuery,
  useUpdateUserBankMutation,
} from '@/graphql/generated/graphql';
import {
  BuildingIcon,
  CheckCircle2,
  MoreVertical,
  Pencil,
  Star,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import AddBankButton from './add-bank-button';
import DeleteBankDialog from './delete-bank-dialog';
import EditBankButton from './edit-bank-button';

export default function BankList() {
  const { data, loading } = useGetMyUserBanksQuery();
  const [selectedBank, setSelectedBank] = useState<{
    id: string;
    bankId: string;
    accountName: string;
    accountNumber: string;
    isDefault: boolean;
    bankName?: string;
  } | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [makeDefault] = useUpdateUserBankMutation({
    refetchQueries: ['GetMyUserBanks'],
    onCompleted: () => {
      toast.success('Bank account updated');
    },
    onError: () => {
      toast.error('Failed to update bank account');
    },
  });

  const [deleteBank] = useDeleteUserBankMutation({
    refetchQueries: ['GetMyUserBanks'],
    onCompleted: () => {
      toast.success('Bank account deleted');
    },
  });

  // Loading state
  if (loading) {
    return <BankListSkeleton />;
  }

  // Empty state
  if (!data?.userBanks || data.userBanks.length === 0) {
    return (
      <Card className="text-center">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <h2 className="mb-2 text-xl font-semibold">No Bank Accounts</h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-md">
            You haven&apos;t added any bank accounts yet. Add a bank account to
            receive payments.
          </p>
          <AddBankButton />
        </CardContent>
      </Card>
    );
  }

  const handleEditBank = (bank: any) => {
    setSelectedBank({
      id: bank.id,
      bankId: bank.bank?.id || '',
      accountName: bank.accountName,
      accountNumber: bank.accountNumber,
      isDefault: bank.isDefault,
      bankName: bank.bank?.name,
    });
    setIsEditDialogOpen(true);
  };

  const handleMakeDefault = (bankId: string) => {
    makeDefault({
      variables: {
        updateUserBankId: bankId,
        updateUserBankInput: {
          isDefault: true,
        },
      },
    });
  };

  const handleDeleteBank = (bank: any) => {
    setSelectedBank({
      id: bank.id,
      bankId: bank.bank?.id || '',
      accountName: bank.accountName,
      accountNumber: bank.accountNumber,
      isDefault: bank.isDefault,
      bankName: bank.bank?.name,
    });
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Bank Accounts</h2>
        <AddBankButton />
      </div>

      {data.userBanks.map(bank => (
        <Card key={bank.id} className="overflow-hidden">
          <CardContent>
            <div className="flex items-start">
              {/* Bank Logo */}
              <div className="bg-muted mr-4 h-20 flex-shrink-0 overflow-hidden rounded-md">
                {bank.bank?.logo ? (
                  <Image
                    src={bank.bank.logo}
                    alt={bank.bank?.name || 'Bank logo'}
                    className="h-full w-full object-cover"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="bg-muted flex h-full w-full items-center justify-center">
                    <BuildingIcon className="text-muted-foreground h-6 w-6" />
                  </div>
                )}
              </div>

              {/* Bank Details */}
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {bank.bank?.name || 'Bank Account'}
                  </h3>
                  <div className="flex items-center gap-2">
                    {bank.isDefault && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Default
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditBank(bank)}
                          className="cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {!bank.isDefault && (
                          <DropdownMenuItem
                            onClick={() => handleMakeDefault(bank.id)}
                            className="cursor-pointer"
                          >
                            <Star className="mr-2 h-4 w-4" />
                            Make Default
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteBank(bank)}
                          className="text-destructive focus:text-destructive cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-muted-foreground flex-1 text-sm">
                  {bank.accountName}
                </p>
                <p className="text-sm">
                  {formatAccountNumber(bank.accountNumber)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Edit Dialog */}
      {selectedBank && (
        <EditBankButton
          bankId={selectedBank.id}
          initialData={{
            bankId: selectedBank.bankId,
            accountName: selectedBank.accountName,
            accountNumber: selectedBank.accountNumber,
            isDefault: selectedBank.isDefault,
          }}
          onOpenChange={setIsEditDialogOpen}
          open={isEditDialogOpen}
        />
      )}

      {/* Delete Dialog */}
      {selectedBank && (
        <DeleteBankDialog
          bankId={selectedBank.id}
          bankName={selectedBank.accountName}
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        />
      )}
    </div>
  );
}

// Helper function to format account number (show only last 4 digits)
function formatAccountNumber(accountNumber: string) {
  if (!accountNumber) return '';

  const lastFourDigits = accountNumber.slice(-4);
  const maskedPart = '*'.repeat(accountNumber.length - 4);

  return `${maskedPart}${lastFourDigits}`;
}

// Skeleton loader for bank list
function BankListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent>
            <div className="flex items-start">
              <Skeleton className="bg-muted mr-4 h-20 w-12 flex-shrink-0 rounded-md" />
              <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
