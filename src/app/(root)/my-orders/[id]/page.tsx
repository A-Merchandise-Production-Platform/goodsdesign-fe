'use client';
import { useParams, useRouter } from 'next/navigation';
import {
  useCreatePaymentGatewayUrlMutation,
  useGetUserOrderQuery,
} from '@/graphql/generated/graphql';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Loader2,
  Package,
  ShoppingBag,
  User,
  XCircle,
} from 'lucide-react';
import { formatDate, formatPrice } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Helper function to format time
const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [expandedPayments, setExpandedPayments] = useState<
    Record<string, boolean>
  >({});

  const [createPaymentGatewayUrl, { loading: createPaymentGatewayUrlLoading }] =
    useCreatePaymentGatewayUrlMutation({
      onCompleted: data => {
        if (data?.createPayment) {
          // Redirect to payment gateway URL
          window.location.href = data.createPayment;
        } else {
          toast({
            title: 'Payment Error',
            description: 'Failed to create payment link. Please try again.',
            variant: 'destructive',
          });
        }
      },
      onError: error => {
        toast({
          title: 'Payment Error',
          description:
            error.message || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      },
    });

  // Use the query hook
  const { data, loading, error, refetch } = useGetUserOrderQuery({
    variables: {
      userOrderId: id,
    },
  });

  const order = data?.userOrder;

  // Get status badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            Pending
          </Badge>
        );
      case 'IN_PRODUCTION':
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            In Production
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get quality check status badge
  const getQualityCheckBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            Pending
          </Badge>
        );
      case 'APPROVED':
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Approved
          </Badge>
        );
      case 'PARTIAL_APPROVED':
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            Partial
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get rework status badge
  const getReworkStatusBadge = (status: string) => {
    switch (status) {
      case 'NOT_REQUIRED':
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Not Required
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            In Progress
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            Pending
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Completed
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Handle payment balance
  const handlePayBalance = () => {
    if (!order) return;

    const pendingPayment = order.payments?.find(p => p.status === 'PENDING');

    if (pendingPayment) {
      createPaymentGatewayUrl({
        variables: {
          gateway: 'VNPAY', // Default gateway
          paymentId: pendingPayment.id,
        },
      });
    } else {
      toast({
        title: 'Payment Error',
        description: 'No pending payment found for this order.',
        variant: 'destructive',
      });
    }
  };

  // Toggle expanded payment
  const togglePayment = (paymentId: string) => {
    setExpandedPayments(prev => ({
      ...prev,
      [paymentId]: !prev[paymentId],
    }));
  };

  // Back to orders button
  const BackButton = () => (
    <div className="mb-6">
      <Button variant="outline" onClick={() => router.push('/my-orders')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>
    </div>
  );

  // Loading state with skeleton UI
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <BackButton />

        {/* Skeleton for Order Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <Skeleton className="h-8 w-40" />
                <Skeleton className="mt-2 h-4 w-32" />
              </div>
              <div className="mt-4 flex md:mt-0 md:gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Skeleton for Main Content */}
          <div className="md:col-span-2">
            <Skeleton className="mb-4 h-10 w-full" />
            <Card>
              <CardHeader>
                <Skeleton className="mb-2 h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skeleton for Customer Info */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i}>
                      <Skeleton className="mb-1 h-4 w-16" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Error or empty order state
  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-10">
        <BackButton />
        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center py-16">
            {error ? (
              <>
                <XCircle className="text-destructive mb-4 h-12 w-12" />
                <h2 className="mb-2 text-xl font-semibold">
                  Error Loading Order
                </h2>
                <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                  There was a problem loading this order. Please try again
                  later.
                </p>
              </>
            ) : (
              <>
                <ShoppingBag className="text-muted-foreground mb-4 h-12 w-12" />
                <h2 className="mb-2 text-xl font-semibold">Order Not Found</h2>
                <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                  The order you're looking for doesn't exist or you don't have
                  permission to view it.
                </p>
              </>
            )}
            <Button onClick={() => router.push('/my-orders')}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty order details
  if (order.orderDetails && order.orderDetails.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <BackButton />

        {/* Order Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Order #{order.id}
                </CardTitle>
                <CardDescription className="mt-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(order.orderDate)} at{' '}
                    {formatTime(order.orderDate)}
                  </div>
                </CardDescription>
              </div>
              <div className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:gap-4">
                {order.depositPaid < order.totalPrice && (
                  <Button
                    className="mb-2 md:mb-0"
                    onClick={handlePayBalance}
                    disabled={createPaymentGatewayUrlLoading}
                  >
                    {createPaymentGatewayUrlLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Balance (
                        {formatPrice(order.totalPrice - order.depositPaid)})
                      </>
                    )}
                  </Button>
                )}
                <div>{getStatusBadge(order.status)}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Total Amount
                </h3>
                <p className="text-xl font-bold">
                  {formatPrice(order.totalPrice)}
                </p>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Deposit Paid
                </h3>
                <p className="text-xl font-bold">
                  {formatPrice(order.depositPaid)}
                </p>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Shipping
                </h3>
                <p className="text-xl font-bold">
                  {formatPrice(order.shippingPrice)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="text-muted-foreground mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">
              No Items in This Order
            </h2>
            <p className="text-muted-foreground mb-6">
              This order doesn't contain any items. This might be due to a
              system error.
            </p>
            <Button onClick={() => router.push('/my-orders')}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <BackButton />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Order Header with Pay Balance Button */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Order #{order.id}
                </CardTitle>
                <CardDescription className="mt-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(order.orderDate)} at{' '}
                    {formatTime(order.orderDate)}
                  </div>
                </CardDescription>
              </div>
              <div className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:gap-4">
                {order.depositPaid < order.totalPrice && (
                  <Button
                    className="mb-2 md:mb-0"
                    onClick={handlePayBalance}
                    disabled={createPaymentGatewayUrlLoading}
                  >
                    {createPaymentGatewayUrlLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Balance (
                        {formatPrice(order.totalPrice - order.depositPaid)})
                      </>
                    )}
                  </Button>
                )}
                <div>{getStatusBadge(order.status)}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Total Amount
                </h3>
                <p className="text-xl font-bold">
                  {formatPrice(order.totalPrice)}
                </p>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Deposit Paid
                </h3>
                <p className="text-xl font-bold">
                  {formatPrice(order.depositPaid)}
                </p>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Shipping
                </h3>
                <p className="text-xl font-bold">
                  {formatPrice(order.shippingPrice)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="items">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="items">Order Items</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            {/* Order Items Tab */}
            <TabsContent value="items">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                  <CardDescription>
                    Details of items in this order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Design ID</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Item ID
                        </TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Quality Check
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Rework
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.orderDetails &&
                        order.orderDetails.map(item => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.designId}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {item.id.substring(0, 8)}...
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{formatPrice(item.price)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {getStatusBadge(item.status)}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {getQualityCheckBadge(item.qualityCheckStatus)}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {getReworkStatusBadge(item.reworkStatus)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab with Transactions included */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    All payments and transactions for this order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {order.payments && order.payments.length > 0 ? (
                    <div className="space-y-4">
                      {order.payments.map(payment => (
                        <div
                          key={payment.id}
                          className="overflow-hidden rounded-md border"
                        >
                          {/* Payment row (clickable to expand) */}
                          <div
                            className="hover:bg-muted/50 flex cursor-pointer items-center justify-between p-4"
                            onClick={() => togglePayment(payment.id)}
                          >
                            <div className="flex items-center space-x-4">
                              <CreditCard className="text-muted-foreground h-5 w-5" />
                              <div>
                                <p className="font-medium">
                                  Payment #{payment.id.substring(0, 8)}...
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {formatDate(payment.createdAt)} •{' '}
                                  {payment.type.toLowerCase()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="font-medium">
                                  {formatPrice(payment.amount)}
                                </p>
                                <div>
                                  {getPaymentStatusBadge(payment.status)}
                                </div>
                              </div>
                              {expandedPayments[payment.id] ? (
                                <ChevronDown className="text-muted-foreground h-5 w-5" />
                              ) : (
                                <ChevronRight className="text-muted-foreground h-5 w-5" />
                              )}
                            </div>
                          </div>

                          {/* Transactions for this payment */}
                          {expandedPayments[payment.id] && (
                            <div className="px-4 pb-4">
                              <Separator className="my-2" />
                              <h4 className="mb-2 text-sm font-medium">
                                Transactions
                              </h4>

                              {payment.transactions &&
                              payment.transactions.length > 0 ? (
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Transaction ID</TableHead>
                                      <TableHead>Payment Method</TableHead>
                                      <TableHead>Amount</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead className="hidden md:table-cell">
                                        Date
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {payment.transactions.map(transaction => (
                                      <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">
                                          {transaction.id.substring(0, 8)}...
                                        </TableCell>
                                        <TableCell className="capitalize">
                                          {transaction.paymentMethod?.toLowerCase() ||
                                            'N/A'}
                                        </TableCell>
                                        <TableCell>
                                          {formatPrice(transaction.amount)}
                                        </TableCell>
                                        <TableCell>
                                          {getPaymentStatusBadge(
                                            transaction.status,
                                          )}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                          {formatDate(transaction.createdAt)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              ) : (
                                <div className="bg-muted/30 rounded-md py-4 text-center">
                                  <p className="text-muted-foreground text-sm">
                                    No transactions found for this payment
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <CreditCard className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                      <p className="text-muted-foreground">
                        No payment records found
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Customer Information */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.customer ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-muted-foreground text-sm font-medium">
                      Name
                    </h3>
                    <p className="font-medium">{order.customer.name}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground text-sm font-medium">
                      Email
                    </h3>
                    <p className="font-medium">{order.customer.email}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground text-sm font-medium">
                      Phone
                    </h3>
                    <p className="font-medium">
                      {order.customer.phoneNumber || 'N/A'}
                    </p>
                  </div>
                  {order.customer.gender !== undefined &&
                    order.customer.gender !== null && (
                      <div>
                        <h3 className="text-muted-foreground text-sm font-medium">
                          Gender
                        </h3>
                        <p className="font-medium capitalize">
                          {order.customer.gender ? 'Male' : 'Female'}
                        </p>
                      </div>
                    )}
                  {order.customer.dateOfBirth && (
                    <div>
                      <h3 className="text-muted-foreground text-sm font-medium">
                        Date of Birth
                      </h3>
                      <p className="font-medium">
                        {formatDate(order.customer.dateOfBirth)}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <User className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                  <p className="text-muted-foreground">
                    Customer information not available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
