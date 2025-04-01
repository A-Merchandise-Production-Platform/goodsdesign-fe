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

      setPaymentDetails(details);
    }
  }, []);

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
            Transaction information and status
          </p>
        </div>

        <Card className="mb-8">
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
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Amount</div>
                <div className="text-2xl font-bold">{amount}</div>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Date & Time</div>
                <div className="text-lg">{paymentDate}</div>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Bank</div>
                <div className="flex items-center text-lg">
                  <Building className="mr-2 h-4 w-4" />
                  {paymentDetails.find(d => d.key === 'vnp_BankCode')?.value ||
                    'N/A'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">
                  Payment Method
                </div>
                <div className="flex items-center text-lg">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {paymentDetails.find(d => d.key === 'vnp_CardType')?.value ||
                    'N/A'}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <div className="text-muted-foreground text-sm">
                Order Information
              </div>
              <div className="bg-muted rounded-md p-3">
                {paymentDetails.find(d => d.key === 'vnp_OrderInfo')?.value ||
                  'N/A'}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between">
            <div className="text-muted-foreground text-sm">Transaction ID</div>
            <div className="font-mono">
              {paymentDetails.find(d => d.key === 'vnp_TransactionNo')?.value ||
                'N/A'}
            </div>
          </CardFooter>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              Complete information about this transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentDetails
                .filter(detail => detail.key !== 'vnp_SecureHash') // Hide the hash in the detailed list
                .map((detail, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-2 border-b py-3 last:border-0 md:grid-cols-3"
                  >
                    <div className="font-medium">{detail.label}</div>
                    <div className="md:col-span-2">
                      <div>{detail.value}</div>
                      {detail.description && (
                        <div className="text-muted-foreground mt-1 text-sm">
                          {detail.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
