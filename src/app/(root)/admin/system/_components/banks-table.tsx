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
import { useBanks } from '../_hooks/use-banks';

export function BanksTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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
    isActive: true,
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
  } = useBanks(true); // Include soft-deleted banks

  const filteredBanks = banks.filter(
    bank =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.swiftCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false,
  );

  const handleSubmit = async () => {
    try {
      if (editingBank) {
        await updateBank({ id: editingBank, data: formData });
      } else {
        await createBank(formData);
      }
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving bank:', error);
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
    setFormData({
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
      isActive: true,
    });
    setEditingBank(null);
  };

  if (error) return <div>Error loading banks</div>;

  return (
    <div className="bg-background space-y-4 rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder="Search banks..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog
          open={isAddDialogOpen}
          onOpenChange={open => {
            setIsAddDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Bank
            </Button>
          </DialogTrigger>
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={e =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bin" className="text-right">
                  BIN
                </Label>
                <Input
                  id="bin"
                  value={formData.bin}
                  onChange={e =>
                    setFormData({ ...formData, bin: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shortName" className="text-right">
                  Short Name
                </Label>
                <Input
                  id="shortName"
                  value={formData.shortName}
                  onChange={e =>
                    setFormData({ ...formData, shortName: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logo" className="text-right">
                  Logo URL
                </Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={e =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="swiftCode" className="text-right">
                  SWIFT Code
                </Label>
                <Input
                  id="swiftCode"
                  value={formData.swiftCode}
                  onChange={e =>
                    setFormData({ ...formData, swiftCode: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Options</Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="transferSupported"
                      checked={formData.transferSupported}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          transferSupported: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor="transferSupported">
                      Transfer Supported
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="lookupSupported"
                      checked={formData.lookupSupported}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          lookupSupported: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor="lookupSupported">Lookup Supported</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isTransfer"
                      checked={formData.isTransfer}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          isTransfer: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor="isTransfer">Is Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={e =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                    />
                    <Label htmlFor="isActive">Is Active</Label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="support" className="text-right">
                  Support Level
                </Label>
                <Input
                  id="support"
                  type="number"
                  value={formData.support}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      support: parseInt(e.target.value) || 0,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? (
                  <LoadingSpinner className="mr-2" />
                ) : null}
                Save
              </Button>
            </DialogFooter>
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
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <LoadingSpinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredBanks.length > 0 ? (
              filteredBanks.map(bank => (
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
                                  b => b.id === bank.id,
                                );
                                if (bankToEdit) {
                                  setEditingBank(bank.id);
                                  setFormData({
                                    name: bankToEdit.name,
                                    code: bankToEdit.code,
                                    bin: bankToEdit.bin,
                                    shortName: bankToEdit.shortName,
                                    logo: bankToEdit.logo,
                                    transferSupported:
                                      bankToEdit.transferSupported,
                                    lookupSupported: bankToEdit.lookupSupported,
                                    support: bankToEdit.support,
                                    isTransfer: bankToEdit.isTransfer,
                                    swiftCode: bankToEdit.swiftCode ?? '',
                                    isActive: bankToEdit.isActive,
                                  });
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
                <TableCell colSpan={7} className="h-24 text-center">
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
