'use client';

import { columns } from '@/app/(root)/admin/users/_components/columns';
import { DataTable } from '@/app/(root)/admin/users/_components/data-table';
import { useUsers } from '@/app/(root)/admin/users/_hooks/use-users';
import { Roles } from '@/graphql/generated';

enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

import { useDebounce } from '@/hooks/use-debounce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ArrowDown,
  ArrowUp,
  Filter,
  Plus,
  PlusCircle,
  Search,
} from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import CreateUserButton from '@/app/(root)/admin/users/_components/create-user-button';

const sortFields = [
  { label: 'Created Date', value: 'createdAt' },
  { label: 'Name', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Updated Date', value: 'updatedAt' },
] as const;

export default function UserDataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<Roles | 'ALL'>('ALL');
  const [sortField, setSortField] =
    useState<(typeof sortFields)[number]['value']>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortOrder>(SortOrder.Desc);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading } = useUsers({
    pagination: { page, limit: pageSize },
    sort: { [sortField]: sortDirection },
    ...(debouncedSearch ? { email: debouncedSearch } : {}),
    ...(selectedRole !== 'ALL' ? { role: selectedRole } : {}),
  });

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleSortDirectionChange = () => {
    setSortDirection((prev: SortOrder) =>
      prev === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-96">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Search by email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Role</h4>
                  <Select
                    value={selectedRole}
                    onValueChange={value => {
                      setSelectedRole(value as Roles | 'ALL');
                      setPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Roles</SelectItem>
                      {Object.values(Roles).map(role => (
                        <SelectItem key={role} value={role}>
                          {role.charAt(0) + role.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Sort By</h4>
                  <div className="flex gap-2">
                    <Select
                      value={sortField}
                      onValueChange={value => {
                        setSortField(value as typeof sortField);
                        setPage(1);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortFields.map(field => (
                          <SelectItem key={field.value} value={field.value}>
                            {field.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={handleSortDirectionChange}
                    >
                      {sortDirection === SortOrder.Asc ? (
                        <div className="flex items-center gap-2">
                          <ArrowDown className="h-4 w-4" />
                          DSC
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <ArrowUp className="h-4 w-4" />
                          ASC
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CreateUserButton />
      </div>
      <DataTable
        data={data?.users.items ?? []}
        columns={columns}
        pageCount={data?.users.meta.totalPages ?? 1}
        currentPage={page}
        pageSize={pageSize}
        totalItems={data?.users.meta.total ?? 0}
        isLoading={isLoading}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
