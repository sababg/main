import AccordionTable from "./AccordionTable";
import { ColumnDef } from "@tanstack/react-table";

export type TreeRow = {
  id: string;
  name: string;
  quarter1: number;
  quarter2: number;
  quarter3: number;
  quarter4: number;
  quarter5: number;
  quarter6: number;
  quarter7: number;
  quarter8: number;
  children?: TreeRow[];
};

const columns: ColumnDef<TreeRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "quarter1", header: "Quarter 1" },
  { accessorKey: "quarter2", header: "Quarter 2" },
  { accessorKey: "quarter3", header: "Quarter 3" },
  { accessorKey: "quarter4", header: "Quarter 4" },
  { accessorKey: "quarter5", header: "Quarter 5" },
  { accessorKey: "quarter6", header: "Quarter 6" },
  { accessorKey: "quarter7", header: "Quarter 7" },
  { accessorKey: "quarter8", header: "Quarter 8" },
];

export const rows: TreeRow[] = [
  {
    id: "1",
    name: "Current Assets",
    quarter1: 3000,
    quarter2: 3000,
    quarter3: 3000.0,
    quarter4: 3000.0,
    quarter5: 3000.0,
    quarter6: 3000.0,
    quarter7: 3000.0,
    quarter8: 3000.0,
    children: [
      {
        id: "1-1",
        name: "Capital.",
        quarter1: 1000.0,
        quarter2: 1000.0,
        quarter3: 1000.0,
        quarter4: 1000.0,
        quarter5: 1000.0,
        quarter6: 1000.0,
        quarter7: 1000.0,
        quarter8: 1000.0,
      },
      {
        id: "1-2",
        name: "Marketable Securities",
        quarter1: 1000.0,
        quarter2: 1000.0,
        quarter3: 1000.0,
        quarter4: 1000.0,
        quarter5: 1000.0,
        quarter6: 1000.0,
        quarter7: 1000.0,
        quarter8: 1000.0,
      },
      {
        id: "1-3",
        name: "Accounts Receivable",
        quarter1: 1000.0,
        quarter2: 1000.0,
        quarter3: 1000.0,
        quarter4: 1000.0,
        quarter5: 1000.0,
        quarter6: 1000.0,
        quarter7: 1000.0,
        quarter8: 1000.0,
      },
    ],
  },
];

export default function App() {
  return (
    <>
      <AccordionTable data={rows} columns={columns} />
    </>
  );
}
