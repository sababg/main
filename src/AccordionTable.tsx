import {
  columnWidths,
  columnWidthsAccordionDetails,
  columnWidthsAccordionSummary,
} from "./CollapsedBalanceSheetTableColumnSizes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type AccordionTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  skeleton?: {
    show: boolean;
    rows: number;
  };
};

export default function AccordionTable<
  T extends { id?: string; children?: any[] }
>({ data, columns, skeleton }: AccordionTableProps<T>) {
  const showSkeleton = skeleton?.show === true;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row, index) => (row as any).id ?? String(index),
  });

  function ChildTable({
    rows,
    columns: childColumns,
    columnWidths,
  }: {
    rows: T[];
    columns: ColumnDef<T>[];
    columnWidths: string[];
  }) {
    const childTable = useReactTable({
      data: rows,
      columns: childColumns,
      getCoreRowModel: getCoreRowModel(),
      getRowId: (row, index) => (row as any).id ?? String(index),
    });

    return (
      <Table
        size="small"
        sx={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        <TableBody>
          {childTable.getRowModel().rows.map((childRow) => (
            <TableRow key={childRow.id}>
              {childRow.getVisibleCells().map((cell, i) => (
                <TableCell key={cell.id} sx={{ width: columnWidths[i] }}>
                  <Typography sx={{ color: "#696563" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <TableContainer sx={{ border: "1px solid #D1CFCF", borderRadius: "8px" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#FDF8F6" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <TableCell key={header.id} sx={{ width: columnWidths[i] }}>
                  <Typography sx={{ color: "#696563" }}>
                    {header.isPlaceholder
                      ? null
                      : (header.column.columnDef.header as React.ReactNode)}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {showSkeleton &&
            Array.from({ length: skeleton.rows }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: table.getAllColumns().length }).map(
                  (_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton />
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          {!showSkeleton &&
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow>
                  <TableCell colSpan={columns.length} sx={{ p: 0 }}>
                    <Accordion
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "none",
                        px: "20px",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />}
                      >
                        <Box sx={{ display: "flex", width: "100%" }}>
                          {row.getVisibleCells().map((cell, i) => (
                            <Box
                              key={cell.id}
                              sx={{ width: columnWidthsAccordionSummary[i] }}
                            >
                              <Typography sx={{ color: "#696563" }}>
                                {cell.getValue() as React.ReactNode}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {row.original.children && (
                          <ChildTable
                            rows={row.original.children as T[]}
                            columns={columns}
                            columnWidths={columnWidthsAccordionDetails}
                          />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
