import { useQuery } from "@tanstack/react-query";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

interface TradelineRow {
  id: number;
  lender: string;
  spotsAvailable: number;
  cycles: number;
  limit: number;
  dateOpened: string;
  statementDate: string;
  postingDate: string;
  vendorPrice: number;
  clientPrice: number;
}

const money = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const shortDate = (iso: string) => new Date(iso).toLocaleDateString();

export default function InventoryPortal() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["vendor-tradelines"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("vendor-tradelines", { method: "GET" });
      if (error) throw error;
      return data as { tradelines: TradelineRow[]; markupPct: number };
    },
    refetchInterval: 60_000,
  });

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <Seo
        title="Inventory Portal"
        description="Internal tradeline inventory portal"
        path="/inventory-portal-x7k9"
        noindex
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Tradeline Inventory Portal</h1>
            <p className="text-gray-300 mt-1">Internal page • Client pricing includes {data?.markupPct ?? 50}% markup.</p>
          </div>
          <button
            onClick={() => refetch()}
            className="bg-cyan-400 text-black font-semibold px-4 py-2 rounded hover:bg-cyan-300"
            disabled={isFetching}
          >
            {isFetching ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {isLoading && <p className="text-gray-300">Loading tradelines…</p>}
        {isError && <p className="text-red-300">Unable to load inventory. Check API function configuration.</p>}

        {data?.tradelines?.length ? (
          <div className="overflow-x-auto border border-gray-700 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-900 text-gray-200">
                <tr>
                  <th className="text-left p-3">Lender</th>
                  <th className="text-left p-3">Limit</th>
                  <th className="text-left p-3">Cycles</th>
                  <th className="text-left p-3">Spots</th>
                  <th className="text-left p-3">Date Opened</th>
                  <th className="text-left p-3">Posting</th>
                  <th className="text-left p-3">Vendor</th>
                  <th className="text-left p-3 text-cyan-300">Client Price</th>
                </tr>
              </thead>
              <tbody>
                {data.tradelines.map((t) => (
                  <tr key={t.id} className="border-t border-gray-800">
                    <td className="p-3">{t.lender}</td>
                    <td className="p-3">{money(t.limit)}</td>
                    <td className="p-3">{t.cycles}</td>
                    <td className="p-3">{t.spotsAvailable}</td>
                    <td className="p-3">{shortDate(t.dateOpened)}</td>
                    <td className="p-3">{shortDate(t.postingDate)}</td>
                    <td className="p-3 text-gray-400">{money(t.vendorPrice)}</td>
                    <td className="p-3 font-semibold text-cyan-300">{money(t.clientPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <p className="text-xs text-gray-500 mt-4">
          Keep this page unlisted. For stronger protection, add authentication before production use.
        </p>
      </div>
    </main>
  );
}
