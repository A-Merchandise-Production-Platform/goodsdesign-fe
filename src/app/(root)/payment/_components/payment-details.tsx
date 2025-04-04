'use client';

import { ArrowLeft, Building, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

interface PaymentDetail {
  key: string;
  value: string;
  label: string;
  description?: string;
}

export default function PaymentDetails() {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentProvider, setPaymentProvider] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== 'undefined') {
      // Get the query string from the URL
      const queryString = window.location.search.substring(1); // Remove the leading '?'

      if (!queryString) {
        console.error('No query parameters found in URL');
        return;
      }

      const params = new URLSearchParams(queryString);
      const details: PaymentDetail[] = [];

      // Determine payment provider based on URL parameters
      const hasVnpParams = Array.from(params.keys()).some(key =>
        key.startsWith('vnp_'),
      );
      const isPayOS = !hasVnpParams; // If no VNPay params are found, assume it's PayOS

      setPaymentProvider(isPayOS ? 'PayOS' : 'VNPay');

      // Set order ID
      const orderCodeParam = params.get('orderCode') || '';
      setOrderId(orderCodeParam);

      if (isPayOS) {
        // Handle PayOS response
        processPayOSResponse(params, details);
      } else {
        // Handle VNPay response (existing code)
        processVNPayResponse(params, details);
      }

      setPaymentDetails(details);
    }
  }, []);

  const processVNPayResponse = (
    params: URLSearchParams,
    details: PaymentDetail[],
  ) => {
    // Check if transaction was successful
    const responseCode = params.get('vnp_ResponseCode') || '';
    const transactionStatus = params.get('vnp_TransactionStatus') || '';
    setIsSuccess(responseCode === '00' && transactionStatus === '00');

    // Format amount
    const rawAmount = params.get('vnp_Amount') || '0';
    const formattedAmount =
      (Number.parseInt(rawAmount) / 100).toLocaleString() + ' VND';
    setAmount(formattedAmount);

    // Format date
    const rawDate = params.get('vnp_PayDate') || '';
    if (rawDate.length >= 14) {
      const year = rawDate.substring(0, 4);
      const month = rawDate.substring(4, 6);
      const day = rawDate.substring(6, 8);
      const hour = rawDate.substring(8, 10);
      const minute = rawDate.substring(10, 12);
      const second = rawDate.substring(12, 14);
      setPaymentDate(`${day}/${month}/${year} ${hour}:${minute}:${second}`);
    }

    // Map all parameters to more readable labels
    params.forEach((value, key) => {
      let label = key.replace('vnp_', '');
      let description = '';

      // Create more readable labels and descriptions
      switch (key) {
        case 'vnp_Amount':
          label = 'Amount';
          description = 'Transaction amount (in VND)';
          value = formattedAmount;
          break;
        case 'vnp_BankCode':
          label = 'Bank Code';
          description = 'Code of the bank processing the transaction';
          break;
        case 'vnp_BankTranNo':
          label = 'Bank Transaction Number';
          description = 'Transaction reference number from the bank';
          break;
        case 'vnp_CardType':
          label = 'Card Type';
          description = 'Type of card used for payment';
          break;
        case 'vnp_OrderInfo':
          label = 'Order Information';
          description = 'Description of the order';
          break;
        case 'vnp_PayDate':
          label = 'Payment Date';
          description = 'Date and time of the payment';
          value = paymentDate;
          break;
        case 'vnp_ResponseCode':
          label = 'Response Code';
          description = 'Code indicating the result of the transaction';
          break;
        case 'vnp_TmnCode':
          label = 'Terminal Code';
          description = "Merchant's terminal code";
          break;
        case 'vnp_TransactionNo':
          label = 'Transaction Number';
          description = 'Unique transaction identifier';
          break;
        case 'vnp_TransactionStatus':
          label = 'Transaction Status';
          description = 'Status code of the transaction';
          break;
        case 'vnp_TxnRef':
          label = 'Transaction Reference';
          description = "Merchant's transaction reference number";
          break;
        case 'vnp_SecureHash':
          label = 'Secure Hash';
          description = 'Security signature for verification';
          value = value.substring(0, 20) + '...'; // Truncate for display
          break;
      }

      details.push({
        key,
        value,
        label,
        description,
      });
    });
  };

  const processPayOSResponse = (
    params: URLSearchParams,
    details: PaymentDetail[],
  ) => {
    // Get status and code parameters
    const status = params.get('status') || '';
    const code = params.get('code') || '';
    const isCancelled =
      status === 'CANCELLED' || params.get('cancel') === 'true';

    // Determine success based on PayOS's response codes and status
    // code 00 means success, any other status besides PAID indicates failure
    const isPaymentSuccess = code === '00' && status === 'PAID';
    setIsSuccess(isPaymentSuccess);

    // For PayOS, handle the specific parameters
    const id = params.get('id') || 'N/A';
    const orderCode = params.get('orderCode') || 'N/A';
    const cancelStatus = params.get('cancel') || 'N/A';

    // Get current date for timestamp
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    setPaymentDate(formattedDate);

    // Hide the amount for failed payments as requested
    // For successful payments, set a mock amount (in a real app, you'd get this from your backend)
    if (isPaymentSuccess) {
      setAmount('0 VND'); // In production, get the real amount from your backend
    } else {
      setAmount('');
    }

    // Map the status code to a readable description
    let statusDescription;
    switch (status) {
      case 'PAID':
        statusDescription = 'Payment completed successfully';
        break;
      case 'PENDING':
        statusDescription = 'Waiting for payment';
        break;
      case 'PROCESSING':
        statusDescription = 'Processing payment';
        break;
      case 'CANCELLED':
        statusDescription = 'Payment was cancelled';
        break;
      default:
        statusDescription = 'Unknown status';
    }

    // Map the code to a readable description
    let codeDescription;
    switch (code) {
      case '00':
        codeDescription = 'Success';
        break;
      case '01':
        codeDescription = 'Invalid parameters';
        break;
      default:
        codeDescription = 'Unknown error code';
    }

    // Add PayOS specific details
    details.push(
      {
        key: 'payos_id',
        value: id,
        label: 'Payment Link ID',
        description: 'Unique PayOS transaction identifier',
      },
      {
        key: 'payos_orderCode',
        value: orderCode,
        label: 'Order Code',
        description: 'Reference code for this order',
      },
      {
        key: 'payos_status',
        value: status,
        label: 'Payment Status',
        description: statusDescription,
      },
      {
        key: 'payos_cancel',
        value: cancelStatus,
        label: 'Cancelled',
        description:
          cancelStatus === 'true'
            ? 'Payment was cancelled'
            : 'Payment was not cancelled',
      },
      {
        key: 'payos_code',
        value: code,
        label: 'Response Code',
        description: codeDescription,
      },
    );
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Payment Details</h1>
          <p className="text-muted-foreground">
            Transaction information and status via {paymentProvider}
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Transaction Summary</CardTitle>
              <Badge
                variant={isSuccess ? 'default' : 'destructive'}
                className={
                  isSuccess
                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                    : ''
                }
              >
                {isSuccess ? 'Successful' : 'Failed'}
              </Badge>
            </div>
            <CardDescription>
              Overview of your payment transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Only show amount if it has a value (will be hidden for failed PayOS payments) */}
              {amount && (
                <div className="space-y-2">
                  <div className="text-muted-foreground text-sm">Amount</div>
                  <div className="text-2xl font-bold">{amount}</div>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Date & Time</div>
                <div className="text-lg">{paymentDate}</div>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">
                  Payment Provider
                </div>
                <div className="flex items-center text-lg">
                  <Building className="mr-2 h-4 w-4" />
                  {paymentProvider}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">
                  Payment Method
                </div>
                <div className="flex items-center text-lg">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {paymentProvider === 'VNPay'
                    ? paymentDetails.find(d => d.key === 'vnp_CardType')
                        ?.value || 'N/A'
                    : 'Electronic Payment'}
                </div>
              </div>

              {/* Add payment status with more descriptive text for PayOS */}
              {paymentProvider === 'PayOS' && (
                <div className="space-y-2">
                  <div className="text-muted-foreground text-sm">
                    Payment Status
                  </div>
                  <div className="text-lg">
                    {paymentDetails.find(d => d.key === 'payos_status')
                      ?.value || 'N/A'}
                    {paymentDetails.find(d => d.key === 'payos_cancel')
                      ?.value === 'true' && ' (Cancelled by user)'}
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <div className="text-muted-foreground text-sm">
                Order Information
              </div>
              <div className="bg-muted rounded-md p-3">
                {paymentProvider === 'VNPay'
                  ? paymentDetails.find(d => d.key === 'vnp_OrderInfo')
                      ?.value || 'N/A'
                  : `Order Code: ${orderId}`}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between">
            <div className="text-muted-foreground text-sm">Transaction ID</div>
            <div className="font-mono">
              {paymentProvider === 'VNPay'
                ? paymentDetails.find(d => d.key === 'vnp_TransactionNo')
                    ?.value || 'N/A'
                : paymentDetails.find(d => d.key === 'payos_id')?.value ||
                  'N/A'}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
