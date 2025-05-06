'use client';

import { useState } from 'react';
import { Eye, Download, FileText, CheckCircle, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

interface OrderCustomer {
  name?: string | null;
  email?: string | null;
}

interface OrderAddress {
  formattedAddress?: string | null;
}

interface ProductInfo {
  name?: string | null;
}

interface SystemConfigVariant {
  product?: ProductInfo | null;
}

interface ProductDesign {
  systemConfigVariant?: SystemConfigVariant | null;
}

interface OrderDetail {
  design?: ProductDesign | null;
  quantity: number;
  price: number;
}

interface OrderPriceDetails {
  basePrice: number;
  discountPercentage: number;
  priceAfterDiscount: number;
  priceAfterVoucher: number;
  shippingPrice: number;
  finalPrice: number;
  voucher?: {
    code: string;
    description?: string | null;
  } | null;
}

interface DownloadBillButtonProps {
  order: {
    id: string;
    status: string;
    orderDate: string;
    customer?: OrderCustomer | null;
    address?: OrderAddress | null;
    orderDetails?: OrderDetail[] | null;
    totalPrice: number;
    shippingPrice: number;
    orderPriceDetails?: OrderPriceDetails | null;
  };
  companyName?: string;
  companyLogo?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyWebsite?: string;
}

export function DownloadBillButtonWithPreview({
  order,
  companyName = 'Your Company Name',
  companyLogo = '',
  companyAddress = '123 Business Street, City, Country',
  companyPhone = '+84 123 456 789',
  companyEmail = 'contact@company.com',
  companyWebsite = 'www.company.com',
}: DownloadBillButtonProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const generateOrderPDF = (forPreview = false) => {
    if (!order) return null;

    // Create new document with custom font support
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // Primary color from theme (--primary: 265 50% 60%)
    const primaryColor = { r: 149, g: 90, b: 255 }; // Converted from HSL
    const mutedColor = { r: 100, g: 100, b: 100 };

    // Set background color for header
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Add white text for header
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', margin, 25);

    // Add invoice number in header
    doc.setFontSize(12);
    doc.text(
      `#${order.id}`,
      pageWidth - margin - doc.getTextWidth(`#${order.id}`),
      25,
    );

    // Reset text color for body
    doc.setTextColor(33, 33, 33);

    // Company details section
    const startY = 50;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(companyName, margin, startY);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(companyAddress, margin, startY + 7);
    doc.text(`Phone: ${companyPhone}`, margin, startY + 14);
    doc.text(`Email: ${companyEmail}`, margin, startY + 21);
    doc.text(`Website: ${companyWebsite}`, margin, startY + 28);

    // Bill To section
    const billToY = startY + 40;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', margin, billToY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    if (order.customer) {
      doc.text(`${order.customer.name || 'N/A'}`, margin, billToY + 7);
      doc.text(`${order.customer.email || 'N/A'}`, margin, billToY + 14);
    }
    if (order.address) {
      doc.text(
        `${order.address.formattedAddress || 'N/A'}`,
        margin,
        billToY + 21,
      );
    }

    // Invoice details section
    const invoiceDetailsY = billToY;
    const rightColumnX = pageWidth - margin - 60;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE DETAILS:', rightColumnX, invoiceDetailsY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Invoice Date:', rightColumnX, invoiceDetailsY + 7);
    doc.text(
      formatDate(order.orderDate),
      rightColumnX + 30,
      invoiceDetailsY + 7,
    );

    doc.text('Status:', rightColumnX, invoiceDetailsY + 14);
    doc.text(order.status, rightColumnX + 30, invoiceDetailsY + 14);

    doc.text('Payment Terms:', rightColumnX, invoiceDetailsY + 21);
    doc.text('Due on receipt', rightColumnX + 30, invoiceDetailsY + 21);

    // Add a separator line
    const lineY = billToY + 35;
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin, lineY, pageWidth - margin, lineY);

    // Order items table
    const tableStartY = lineY + 10;

    const tableData =
      order.orderDetails?.map(detail => [
        detail.design?.systemConfigVariant?.product?.name || 'N/A',
        detail.quantity.toString(),
        formatCurrency(detail.price || 0),
        formatCurrency((detail.price || 0) * (detail.quantity || 0)),
      ]) || [];

    autoTable(doc, {
      startY: tableStartY,
      head: [['Product', 'Quantity', 'Unit Price', 'Subtotal']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [primaryColor.r, primaryColor.g, primaryColor.b],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 40, halign: 'right' },
        3: { cellWidth: 40, halign: 'right' },
      },
      margin: { left: margin, right: margin },
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
    });

    // Summary section
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Add summary box with price breakdown
    doc.setFillColor(249, 250, 251);
    doc.setDrawColor(220, 220, 220);
    const summaryBoxWidth = 100;
    const summaryBoxX = pageWidth - margin - summaryBoxWidth;
    const summaryBoxY = finalY;
    let summaryBoxHeight = 50; // Base height

    // Add extra height for discount and voucher if present
    if (order.orderPriceDetails?.discountPercentage) summaryBoxHeight += 20;
    if (order.orderPriceDetails?.voucher) summaryBoxHeight += 20;

    doc.roundedRect(
      summaryBoxX,
      summaryBoxY,
      summaryBoxWidth,
      summaryBoxHeight,
      2,
      2,
      'FD',
    );

    // Add summary text with price breakdown
    let currentY = summaryBoxY + 10;
    const leftX = summaryBoxX + 5;
    const rightX = summaryBoxX + summaryBoxWidth - 5;

    // Base Price
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(mutedColor.r, mutedColor.g, mutedColor.b);
    doc.text('Base Price:', leftX, currentY);
    doc.setTextColor(33, 33, 33);
    const basePriceText = formatCurrency(
      order.orderPriceDetails?.basePrice || 0,
    );
    doc.text(basePriceText, rightX - doc.getTextWidth(basePriceText), currentY);
    currentY += 10;

    // Discount if applicable
    if (
      order.orderPriceDetails?.discountPercentage &&
      order.orderPriceDetails.discountPercentage > 0
    ) {
      doc.setTextColor(239, 68, 68); // Red for discount
      doc.text(
        `Discount (${order.orderPriceDetails.discountPercentage}%):`,
        leftX,
        currentY,
      );
      const discountAmount =
        (order.orderPriceDetails?.basePrice || 0) -
        (order.orderPriceDetails?.priceAfterDiscount || 0);
      const discountText = `-${formatCurrency(discountAmount)}`;
      doc.text(discountText, rightX - doc.getTextWidth(discountText), currentY);
      currentY += 10;

      // Price after discount
      doc.setTextColor(mutedColor.r, mutedColor.g, mutedColor.b);
      doc.text('Price after discount:', leftX, currentY);
      doc.setTextColor(33, 33, 33);
      const priceAfterDiscountText = formatCurrency(
        order.orderPriceDetails?.priceAfterDiscount || 0,
      );
      doc.text(
        priceAfterDiscountText,
        rightX - doc.getTextWidth(priceAfterDiscountText),
        currentY,
      );
      currentY += 10;
    }

    // Voucher if applicable
    if (order.orderPriceDetails?.voucher) {
      doc.setTextColor(16, 185, 129); // Green for voucher
      doc.text(
        `Voucher (${order.orderPriceDetails.voucher.code}):`,
        leftX,
        currentY,
      );
      const voucherAmount =
        (order.orderPriceDetails?.priceAfterDiscount || 0) -
        (order.orderPriceDetails?.priceAfterVoucher || 0);
      const voucherText = `-${formatCurrency(voucherAmount)}`;
      doc.text(voucherText, rightX - doc.getTextWidth(voucherText), currentY);
      currentY += 10;

      // Price after voucher
      doc.setTextColor(mutedColor.r, mutedColor.g, mutedColor.b);
      doc.text('Price after voucher:', leftX, currentY);
      doc.setTextColor(33, 33, 33);
      const priceAfterVoucherText = formatCurrency(
        order.orderPriceDetails?.priceAfterVoucher || 0,
      );
      doc.text(
        priceAfterVoucherText,
        rightX - doc.getTextWidth(priceAfterVoucherText),
        currentY,
      );
      currentY += 10;
    }

    // Shipping Fee
    doc.setTextColor(mutedColor.r, mutedColor.g, mutedColor.b);
    doc.text('Shipping Fee:', leftX, currentY);
    doc.setTextColor(33, 33, 33);
    const shippingText = formatCurrency(
      order.orderPriceDetails?.shippingPrice || 0,
    );
    doc.text(shippingText, rightX - doc.getTextWidth(shippingText), currentY);
    currentY += 15;

    // Final Total
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(33, 33, 33);
    doc.text('TOTAL:', leftX, currentY);
    const totalText = formatCurrency(order.orderPriceDetails?.finalPrice || 0);
    doc.text(totalText, rightX - doc.getTextWidth(totalText), currentY);

    // Add thank you note
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const thankYouText = 'Thank you for your business!';
    doc.text(
      thankYouText,
      pageWidth / 2 - doc.getTextWidth(thankYouText) / 2,
      finalY + summaryBoxHeight + 15,
    );

    // Add footer
    const footerY = pageHeight - 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);

    // Add page number
    const pageText = `Page 1 of 1`;
    doc.text(pageText, pageWidth / 2 - doc.getTextWidth(pageText) / 2, footerY);

    // Add footer line
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    if (forPreview) {
      // Return as data URL for preview
      const pdfDataUrl = doc.output('datauristring');
      return pdfDataUrl;
    } else {
      // Save the PDF
      doc.save(`invoice-${order.id}.pdf`);
      return null;
    }
  };

  const handlePreview = () => {
    const pdfDataUrl = generateOrderPDF(true);
    if (pdfDataUrl) {
      setPdfUrl(pdfDataUrl);
      setShowPreview(true);
    }
  };

  const handleDownload = () => {
    generateOrderPDF(false);
  };

  const isDownloadable =
    order?.status &&
    !['PENDING', 'CANCELED', 'REJECTED'].includes(order.status);

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELED':
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              Order #{order.id}
            </CardTitle>
            <div className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              {formatDate(order.orderDate)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer Information */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                <p className="text-base font-semibold">
                  {order.customer?.name || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  {order.customer?.email || 'N/A'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-600">
                  {order.address?.formattedAddress || 'N/A'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Order Status
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status === 'COMPLETED' && (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    )}
                    {(order.status === 'CANCELED' ||
                      order.status === 'REJECTED') && (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="font-medium">Order Summary</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price:</span>
                  <span>
                    {formatCurrency(order.orderPriceDetails?.basePrice || 0)}
                  </span>
                </div>

                {order.orderPriceDetails?.discountPercentage &&
                  order.orderPriceDetails.discountPercentage > 0 && (
                    <>
                      <div className="flex justify-between text-red-600">
                        <span>
                          Discount ({order.orderPriceDetails.discountPercentage}
                          %):
                        </span>
                        <span>
                          -
                          {formatCurrency(
                            (order.orderPriceDetails?.basePrice || 0) -
                              (order.orderPriceDetails?.priceAfterDiscount ||
                                0),
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Price after discount:
                        </span>
                        <span>
                          {formatCurrency(
                            order.orderPriceDetails?.priceAfterDiscount || 0,
                          )}
                        </span>
                      </div>
                    </>
                  )}

                {order.orderPriceDetails?.voucher && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <span>
                        Voucher ({order.orderPriceDetails.voucher.code}):
                      </span>
                      <span>
                        -
                        {formatCurrency(
                          (order.orderPriceDetails?.priceAfterDiscount || 0) -
                            (order.orderPriceDetails?.priceAfterVoucher || 0),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Price after voucher:
                      </span>
                      <span>
                        {formatCurrency(
                          order.orderPriceDetails?.priceAfterVoucher || 0,
                        )}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Fee:</span>
                  <span>
                    {formatCurrency(
                      order.orderPriceDetails?.shippingPrice || 0,
                    )}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-lg font-medium">
                  <span>Total:</span>
                  <span className="text-purple-700">
                    {formatCurrency(order.orderPriceDetails?.finalPrice || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-8">
            <h3 className="mb-4 font-medium">Order Items</h3>
            <div className="overflow-hidden rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Unit Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {order.orderDetails?.map((detail, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {detail.design?.systemConfigVariant?.product?.name ||
                            'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500">
                        {detail.quantity}
                      </td>
                      <td className="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
                        {formatCurrency(detail.price || 0)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap text-gray-900">
                        {formatCurrency(
                          (detail.price || 0) * (detail.quantity || 0),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button
                  onClick={handlePreview}
                  disabled={!isDownloadable}
                  variant="outline"
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Preview Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[90vh] max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Invoice Preview</DialogTitle>
                </DialogHeader>
                {pdfUrl && (
                  <iframe
                    src={pdfUrl}
                    className="h-full w-full"
                    title="Invoice Preview"
                  />
                )}
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleDownload}
              disabled={!isDownloadable}
              variant={isDownloadable ? 'default' : 'secondary'}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {isDownloadable ? 'Download Invoice' : 'Invoice not available'}
            </Button>

            {!isDownloadable && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <FileText className="mr-1 h-4 w-4" />
                Invoice will be available once the order is processed
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
