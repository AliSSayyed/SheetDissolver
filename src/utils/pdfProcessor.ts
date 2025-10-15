import { PDFDocument } from 'pdf-lib';

export async function extractPdfPages(
  file: File,
  startPage: number,
  endPage: number
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const totalPages = pdfDoc.getPageCount();

  if (startPage < 1 || endPage > totalPages) {
    throw new Error(`Invalid page range. PDF has ${totalPages} pages.`);
  }

  const newPdf = await PDFDocument.create();

  const pageIndices = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage - 1 + i
  );

  const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  const base64 = btoa(
    Array.from(new Uint8Array(pdfBytes))
      .map((byte) => String.fromCharCode(byte))
      .join('')
  );

  return base64;
}
