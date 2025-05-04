'use client';

import {
  useAllVouchersOfSystemQuery,
  useAllVouchersOfUserQuery,
} from '@/graphql/generated/graphql';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CalendarDays,
  Check,
  Clock,
  DollarSign,
  Gift,
  PercentIcon,
  ShoppingBag,
  X,
  Search,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { DashboardShell } from '@/components/dashboard-shell';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import AddVoucherForm from '@/app/(root)/manager/voucher/_components/add_voucher_form';

export default function Voucher() {
  const { data, loading, error } = useAllVouchersOfSystemQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredVouchers = data?.allSystemVouchers.filter(voucher => {
    if (!debouncedSearch) return true;
    const searchLower = debouncedSearch.toLowerCase();
    return (
      voucher.id.toLowerCase().includes(searchLower) ||
      voucher.code.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">My Vouchers</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="overflow-hidden border-0 shadow-md">
              <div className="h-2 bg-gray-200" />
              <div className="p-6">
                <Skeleton className="mb-2 h-8 w-3/4" />
                <Skeleton className="mb-4 h-4 w-1/2" />
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded-md bg-red-50 p-4 text-red-500">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5" />
            <span className="font-medium">Error loading vouchers</span>
          </div>
          <p className="mt-1 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell title="Vouchers" subtitle="Manage system vouchers">
      <div className="mb-6 flex items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by ID or code..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-96 pl-10"
          />
        </div>
        <AddVoucherForm />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVouchers?.map(voucher => (
          <Card
            key={voucher.id}
            className="group overflow-hidden shadow-md transition-all hover:shadow-lg"
          >
            <CardContent className="flex flex-1 flex-col">
              {/* Voucher header */}
              <div className="mb-4 flex flex-1 items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-purple-500" />
                    <h3 className="text-xl font-bold tracking-tight">
                      {voucher.code}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {voucher.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {voucher.isPublic ? 'Public' : 'Private'}
                  </Badge>
                  <Badge
                    variant={voucher.isActive ? 'default' : 'outline'}
                    className={`${
                      voucher.isActive
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {voucher.isActive ? (
                      <span className="flex items-center gap-1">
                        <Check className="h-3 w-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <X className="h-3 w-3" /> Used
                      </span>
                    )}
                  </Badge>
                </div>
              </div>

              {/* Voucher value highlight */}
              <div
                className={`mb-4 rounded-md ${voucher.isActive ? 'bg-purple-50' : 'bg-gray-50'} p-3 text-center`}
              >
                <div className="flex items-center justify-center gap-1 text-lg font-bold">
                  {voucher.type === 'FIXED_VALUE' ? (
                    <>
                      <span className="text-purple-600">
                        - {formatPrice(voucher.value)}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-purple-600">
                        {voucher.value}% OFF
                        <div className="text-sm text-gray-500">
                          {voucher.maxDiscountValue &&
                            `(Max ${formatPrice(voucher.maxDiscountValue)})`}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Voucher details */}
              <div className="space-y-2 text-sm">
                {voucher.minOrderValue && (
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Min. Order:</span>
                    <span className="ml-auto font-medium">
                      {formatPrice(voucher.minOrderValue)}
                    </span>
                  </div>
                )}

                {/* {voucher.limitedUsage && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Usage Limit:</span>
                    <span className="ml-auto font-medium">
                      {voucher.limitedUsage} times
                    </span>
                  </div>
                )} */}

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Created:</span>
                  <span className="ml-auto font-medium">
                    {format(new Date(voucher.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>

                <div className="w-full">
                  <div className="mt-4 flex items-center gap-4">
                    <div className="w-full max-w-md">
                      <div className="relative">
                        <Progress
                          value={voucher.usages?.length ?? 0}
                          max={voucher.limitedUsage ?? 0}
                          className="h-4 w-full"
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white drop-shadow-sm">
                          {((voucher.usages?.length ?? 0) /
                            (voucher.limitedUsage ?? 0)) *
                            100}
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="whitespace-nowrap text-gray-600">
                        {voucher.usages?.length ?? 0} /{' '}
                        {voucher.limitedUsage ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="block space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
                <span>ID:</span>
                <span>{voucher.id}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
                <span>Created:</span>
                <span>{format(new Date(voucher.createdAt), 'PPPp')}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
