'use client';

import { Button } from '@/components/ui/button';
import { useOrderInvoiceQuery } from '@/graphql/generated/graphql';
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { formatPrice } from '@/lib/utils';

interface DownloadBillButtonWithPreviewProps {
  orderId: string;
}

export default function DownloadBillButtonWithPreview({
  orderId,
}: DownloadBillButtonWithPreviewProps) {
  const { data, loading } = useOrderInvoiceQuery({
    variables: {
      orderId,
    },
  });

  const generatePDF = () => {
    if (!data?.order || !data?.orderPriceDetails) return;

    const doc = new jsPDF();
    const order = data.order;
    const priceDetails = data.orderPriceDetails;

    // Add company logo and header
    doc.setFontSize(20);
    doc.text('INVOICE', 105, 20, { align: 'center' });

    // Add order information
    doc.setFontSize(12);
    doc.text(
      `Order Date: ${format(new Date(order.acceptedAt), 'dd/MM/yyyy')}`,
      20,
      40,
    );
    doc.text(`Order ID: ${orderId}`, 20, 50);

    // Add customer information
    doc.setFontSize(14);
    doc.text('Customer Information', 20, 70);
    doc.setFontSize(12);

    if (order.customer) {
      doc.text(`Name: ${order.customer.name}`, 20, 80);
      doc.text(`Email: ${order.customer.email}`, 20, 90);
      doc.text(`Phone: ${order.customer.phoneNumber || 'N/A'}`, 20, 100);
    }

    if (order.address) {
      doc.text(`Address: ${order.address.formattedAddress}`, 20, 110);
    }

    // Add order items table
    if (order.orderDetails) {
      const tableData = order.orderDetails.map(detail => {
        const variant = detail.systemConfigVariant;
        if (!variant)
          return ['N/A', 'N/A', '0', formatPrice(0), formatPrice(0)];

        return [
          variant.color || 'N/A',
          variant.size || 'N/A',
          detail.quantity.toString(),
          formatPrice(variant.price || 0),
          formatPrice(detail.quantity * (variant.price || 0)),
        ];
      });

      autoTable(doc, {
        startY: 130,
        head: [['Color', 'Size', 'Quantity', 'Unit Price', 'Total']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });
    }

    // Add price summary
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.text('Price Summary', 20, finalY);

    const priceSummary = [
      ['Base Price', formatPrice(priceDetails.basePrice)],
      ['Discount', `${priceDetails.discountPercentage}%`],
      ['Price After Discount', formatPrice(priceDetails.priceAfterDiscount)],
      ['Shipping', formatPrice(priceDetails.shippingPrice)],
      ['Final Price', formatPrice(priceDetails.finalPrice)],
    ];

    autoTable(doc, {
      startY: finalY + 10,
      body: priceSummary,
      theme: 'plain',
      styles: { fontSize: 12 },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 50, halign: 'right' },
      },
    });

    // Add footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 105, pageHeight - 20, {
      align: 'center',
    });
    doc.text(
      'This is a computer-generated invoice, no signature required.',
      105,
      pageHeight - 10,
      { align: 'center' },
    );

    // Save the PDF
    doc.save(`invoice-${orderId}.pdf`);
  };

  return (
    <div>
      <Button
        disabled={loading}
        onClick={generatePDF}
        className="flex items-center gap-2"
      >
        {loading ? 'Loading...' : 'Download Bill'}
      </Button>
    </div>
  );
}
