'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import {
  Bank,
  CreateBankDto,
  UpdateBankDto,
  useBanks,
} from '../_hooks/use-banks';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const bankFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z
    .string()
    .min(1, 'Code is required')
    .regex(
      /^[A-Z0-9]+$/,
      'Code must contain only uppercase letters and numbers',
    ),
  bin: z
    .string()
    .min(1, 'BIN is required')
    .regex(/^[0-9]+$/, 'BIN must contain only numbers'),
  shortName: z.string().min(1, 'Short name is required'),
  logo: z.string().url('Must be a valid URL').or(z.string().length(0)),
  transferSupported: z.boolean().default(false),
  lookupSupported: z.boolean().default(false),
  support: z.number().int().min(0).default(0),
  isTransfer: z.boolean().default(false),
  swiftCode: z.string().optional(),
});

type BankFormValues = z.infer<typeof bankFormSchema>;

export function BanksTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [filterTransfer, setFilterTransfer] = useState<'all' | 'yes' | 'no'>(
    'all',
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      name: '',
      code: '',
      bin: '',
      shortName: '',
      logo: '',
      transferSupported: false,
      lookupSupported: false,
      support: 0,
      isTransfer: false,
      swiftCode: '',
    },
  });

  const {
    banks,
    isLoading,
    error,
    createBank,
    updateBank,
    deleteBank,
    restoreBank,
    isCreating,
    isUpdating,
    isDeleting,
    isRestoring,
  } = useBanks(true);

  const filteredBanks = banks.filter((bank: Bank) => {
    const matchesSearch =
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.swiftCode?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      false;

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
          ? bank.isActive
          : !bank.isActive;

    const matchesTransfer =
      filterTransfer === 'all'
        ? true
        : filterTransfer === 'yes'
          ? bank.isTransfer
          : !bank.isTransfer;

    return matchesSearch && matchesStatus && matchesTransfer;
  });

  const handleSubmit = async (values: BankFormValues) => {
    try {
      setServerError(null);
      if (editingBank) {
        const updateData: UpdateBankDto = {
          ...values,
        };
        await updateBank({ id: editingBank, data: updateData });
      } else {
        const createData: CreateBankDto = {
          ...values,
        };
        await createBank(createData);
      }
      setIsAddDialogOpen(false);
      form.reset();
      setEditingBank(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setServerError(errorMessage);

      // Set specific field errors
      if (errorMessage.includes('code already exists')) {
        form.setError('code', {
          type: 'manual',
          message: 'A bank with this code already exists',
        });
      } else if (errorMessage.includes('bin already exists')) {
        form.setError('bin', {
          type: 'manual',
          message: 'A bank with this BIN already exists',
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this bank?')) {
      await deleteBank(id);
    }
  };

  const handleRestore = async (id: string) => {
    await restoreBank(id);
  };

  const resetForm = () => {
    form.reset();
    setEditingBank(null);
  };

  if (error) return <div>Error loading banks</div>;

  return (
    <div className="bg-background space-y-4 rounded-md p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-64">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Search banks..."
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Select
            value={filterStatus}
            onValueChange={(value: 'all' | 'active' | 'inactive') =>
              setFilterStatus(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterTransfer}
            onValueChange={(value: 'all' | 'yes' | 'no') =>
              setFilterTransfer(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by transfer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transfer</SelectItem>
              <SelectItem value="yes">Transfer Enabled</SelectItem>
              <SelectItem value="no">Transfer Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Bank
        </Button>

        <Dialog
          open={isAddDialogOpen}
          onOpenChange={open => {
            setIsAddDialogOpen(open);
            if (!open) {
              resetForm();
              setServerError(null);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBank ? 'Edit Bank' : 'Add New Bank'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the{' '}
                {editingBank ? 'bank update' : 'new bank configuration'}.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                {serverError && (
                  <div className="bg-destructive/15 text-destructive rounded-md p-3 text-sm">
                    {serverError}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BIN</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="swiftCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SWIFT Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="transferSupported"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Transfer Supported</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lookupSupported"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Lookup Supported</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isTransfer"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Is Transfer</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="support"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Level</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      resetForm();
                      setServerError(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating || isUpdating}>
                    {isCreating || isUpdating ? (
                      <LoadingSpinner className="mr-2" />
                    ) : null}
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>BIN</TableHead>
              <TableHead>Short Name</TableHead>
              <TableHead>SWIFT Code</TableHead>
              <TableHead>Transfer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deleted</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <LoadingSpinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredBanks.length > 0 ? (
              filteredBanks.map((bank: Bank) => (
                <TableRow key={bank.id}>
                  <TableCell>{bank.name}</TableCell>
                  <TableCell>{bank.code}</TableCell>
                  <TableCell>{bank.bin}</TableCell>
                  <TableCell>{bank.shortName}</TableCell>
                  <TableCell>{bank.swiftCode}</TableCell>
                  <TableCell>
                    <Badge variant={bank.isTransfer ? 'success' : 'secondary'}>
                      {bank.isTransfer ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={bank.isActive ? 'success' : 'destructive'}>
                      {bank.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={bank.isDeleted ? 'destructive' : 'secondary'}
                    >
                      {bank.isDeleted ? 'Deleted' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {!bank.deletedAt ? (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                const bankToEdit = banks.find(
                                  (b: Bank) => b.id === bank.id,
                                );
                                if (bankToEdit) {
                                  setEditingBank(bank.id);
                                  form.reset(bankToEdit);
                                  setIsAddDialogOpen(true);
                                }
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(bank.id)}
                              className="text-destructive"
                            >
                              Delete
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleRestore(bank.id)}
                          >
                            Restore
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
