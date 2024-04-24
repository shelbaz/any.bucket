"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocalStorage } from "react-use";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const PdfReader = ({ file }: { file: string }) => {
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useLocalStorage(`pdf-page-${file}`, 1);

  const handleDocumentSuccess = ({ numPages }: { numPages: number }) => {
    setNumberOfPages(numPages);
  };

  const isFirstPage = !pageNumber || pageNumber <= 1;
  const isLastPage = !pageNumber || pageNumber >= numberOfPages;

  return (
    <>
      <Document file={file} onLoadSuccess={handleDocumentSuccess}>
        <Page
          pageNumber={pageNumber}
          onChange={(page) => setPageNumber(page)}
        />
      </Document>
      <div className="flex items-center group-hover:opacity-100 opacity-0 duration-100 absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 text-zinc-700 shadow-md border border-zinc-100 space-x-3">
        <div
          className={clsx(
            "p-1 rounded-full cursor-pointer hover:bg-zinc-100",
            isFirstPage && "opacity-40 pointer-events-none"
          )}
          onClick={() => {
            if (isFirstPage) return;
            setPageNumber(pageNumber - 1);
          }}
        >
          <ChevronLeftIcon className="text-zinc-900 h-4 w-4" />
        </div>
        <span className="text-sm">
          {pageNumber} of {numberOfPages}
        </span>
        <div
          className={clsx(
            "p-1 rounded-full cursor-pointer hover:bg-zinc-100",
            isLastPage && "opacity-40 pointer-events-none"
          )}
          onClick={() => {
            if (isLastPage) return;
            setPageNumber(pageNumber + 1);
          }}
        >
          <ChevronRightIcon className="text-zinc-900 h-4 w-4" />
        </div>
      </div>
    </>
  );
};
