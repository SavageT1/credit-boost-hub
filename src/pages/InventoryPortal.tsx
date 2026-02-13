import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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

type OrderForm = {
  tradelineId: number | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  genderId: number;
  maritalStatusId: number;
  citizenshipStatusId: number;
  physicalAddress: string;
  city: string;
  stateCode: string;
  zipCode: string;
  creditReportAgencyURL: string;
  creditReportAgencyUsername: string;
  creditReportAgencyPassword: string;
};

const money = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const shortDate = (iso: string) => new Date(iso).toLocaleDateString();

const knownCountryNames: Record<number, string> = {
  1: "United States",
  2: "Afghanistan",
  3: "Albania",
  4: "Algeria",
  14: "Australia",
  15: "Austria",
  39: "Canada",
  45: "China",
  73: "France",
  81: "Germany",
  100: "India",
  105: "Ireland",
  106: "Israel",
  107: "Italy",
  110: "Jamaica",
  112: "Jordan",
  174: "Peru",
  191: "Saudi Arabia",
  203: "Spain",
  211: "Sweden",
  212: "Switzerland",
  223: "Turkey",
  229: "United Arab Emirates",
  230: "United Kingdom",
  236: "Venezuela",
  237: "Vietnam",
  246: "Zimbabwe",
};

const allCitizenshipOptions = Array.from({ length: 246 }, (_, idx) => {
  const id = idx + 1;
  return {
    id,
    name: knownCountryNames[id] ?? `Country ID ${id}`,
  };
});

const initialForm: OrderForm = {
  tradelineId: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  ssn: "",
  genderId: 1,
  maritalStatusId: 1,
  citizenshipStatusId: 1,
  physicalAddress: "",
  city: "",
  stateCode: "",
  zipCode: "",
  creditReportAgencyURL: "",
  creditReportAgencyUsername: "",
  creditReportAgencyPassword: "",
};

export default function InventoryPortal() {
  const [form, setForm] = useState<OrderForm>(initialForm);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [countrySearch, setCountrySearch] = useState("");
  const [portalKeyInput, setPortalKeyInput] = useState("");
  const [portalKey, setPortalKey] = useState<string>(() => sessionStorage.getItem("portal_key") || "");

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["vendor-tradelines"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("vendor-tradelines", {
        method: "GET",
        headers: { "x-portal-key": portalKey },
      });
      if (error) throw error;
      return data as { tradelines: TradelineRow[]; markupPct: number };
    },
    enabled: Boolean(portalKey),
    refetchInterval: 60_000,
  });

  const submitOrder = useMutation({
    mutationFn: async () => {
      if (!form.tradelineId) throw new Error("Select a tradeline first");
      const payload = {
        tradelineId: Number(form.tradelineId),
        client: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          dob: form.dob,
          ssn: form.ssn,
          genderId: form.genderId,
          maritalStatusId: form.maritalStatusId,
          citizenshipStatusId: form.citizenshipStatusId,
          physicalAddress: form.physicalAddress,
          city: form.city,
          stateCode: form.stateCode,
          zipCode: form.zipCode,
          creditReportAgencyURL: form.creditReportAgencyURL,
          creditReportAgencyUsername: form.creditReportAgencyUsername,
          creditReportAgencyPassword: form.creditReportAgencyPassword,
        },
      };

      const { data, error } = await supabase.functions.invoke("vendor-order-request", {
        method: "POST",
        headers: { "x-portal-key": portalKey },
        body: payload,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (res: any) => {
      setStatusMsg(`Order response: Status ${res?.Status ?? "?"} | OrderId ${res?.OrderId ?? "n/a"} ${res?.Message ? `| ${res.Message}` : ""}`);
    },
    onError: (err: any) => {
      setStatusMsg(`Order failed: ${err?.message ?? "Unknown error"}`);
    },
  });

  const selectedTradeline = useMemo(
    () => data?.tradelines?.find((t) => t.id === Number(form.tradelineId)),
    [data?.tradelines, form.tradelineId]
  );

  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return allCitizenshipOptions;
    return allCitizenshipOptions.filter((c) => c.name.toLowerCase().includes(q) || String(c.id) === q);
  }, [countrySearch]);

  if (!portalKey) {
    return (
      <main className="min-h-screen bg-black text-white p-6 md:p-10">
        <Seo title="Inventory Portal Access" description="Private inventory portal" path="/inventory-portal-x7k9" noindex />
        <div className="max-w-lg mx-auto mt-16 border border-gray-700 rounded-lg bg-gray-950 p-6">
          <h1 className="text-2xl font-bold mb-2">Private Portal Access</h1>
          <p className="text-sm text-gray-300 mb-4">Enter your portal key to access inventory and order tools.</p>
          <input
            type="password"
            className="bg-black border border-gray-700 rounded px-3 py-2 w-full mb-3"
            placeholder="Portal key"
            value={portalKeyInput}
            onChange={(e) => setPortalKeyInput(e.target.value)}
          />
          <button
            className="bg-cyan-400 text-black font-semibold px-4 py-2 rounded hover:bg-cyan-300"
            onClick={() => {
              if (!portalKeyInput.trim()) return;
              sessionStorage.setItem("portal_key", portalKeyInput.trim());
              setPortalKey(portalKeyInput.trim());
            }}
          >
            Unlock Portal
          </button>
        </div>
      </main>
    );
  }

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
          <div className="overflow-x-auto border border-gray-700 rounded-lg mb-8">
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
                  <tr
                    key={t.id}
                    className={`border-t border-gray-800 cursor-pointer ${Number(form.tradelineId) === t.id ? "bg-gray-900" : ""}`}
                    onClick={() => setForm((prev) => ({ ...prev, tradelineId: t.id }))}
                  >
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

        <section className="border border-gray-700 rounded-lg p-5 bg-gray-950">
          <h2 className="text-xl font-semibold mb-3">Phase 2: Place Order Request</h2>
          <p className="text-sm text-gray-300 mb-4">
            Select a tradeline above, then submit client details to vendor API. Test mode will validate payload without placing live orders.
          </p>

          {selectedTradeline && (
            <p className="text-sm mb-4 text-cyan-300">
              Selected: #{selectedTradeline.id} {selectedTradeline.lender} • Client Price {money(selectedTradeline.clientPrice)}
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-3 mb-3">
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="DOB (YYYY-MM-DD)" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="SSN (9 digits)" value={form.ssn} onChange={(e) => setForm({ ...form, ssn: e.target.value })} />
            <select className="bg-black border border-gray-700 rounded px-3 py-2" value={form.genderId} onChange={(e) => setForm({ ...form, genderId: Number(e.target.value) })}>
              <option value={1}>Gender: Male (1)</option>
              <option value={2}>Gender: Female (2)</option>
            </select>
            <select className="bg-black border border-gray-700 rounded px-3 py-2" value={form.maritalStatusId} onChange={(e) => setForm({ ...form, maritalStatusId: Number(e.target.value) })}>
              <option value={1}>Marital: Single (1)</option>
              <option value={2}>Marital: Married (2)</option>
            </select>
            <div className="md:col-span-1 space-y-2">
              <input
                className="bg-black border border-gray-700 rounded px-3 py-2 w-full"
                placeholder="Search citizenship country or ID"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
              />
              <select
                className="bg-black border border-gray-700 rounded px-3 py-2 w-full"
                value={form.citizenshipStatusId}
                onChange={(e) => setForm({ ...form, citizenshipStatusId: Number(e.target.value) })}
              >
                {filteredCountries.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                ))}
              </select>
            </div>
            <input className="bg-black border border-gray-700 rounded px-3 py-2 md:col-span-2" placeholder="Physical Address" value={form.physicalAddress} onChange={(e) => setForm({ ...form, physicalAddress: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="State Code (AZ)" value={form.stateCode} onChange={(e) => setForm({ ...form, stateCode: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="Zip Code" value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="Credit Report URL (optional)" value={form.creditReportAgencyURL} onChange={(e) => setForm({ ...form, creditReportAgencyURL: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="Credit Report Username (optional)" value={form.creditReportAgencyUsername} onChange={(e) => setForm({ ...form, creditReportAgencyUsername: e.target.value })} />
            <input className="bg-black border border-gray-700 rounded px-3 py-2" placeholder="Credit Report Password (optional)" value={form.creditReportAgencyPassword} onChange={(e) => setForm({ ...form, creditReportAgencyPassword: e.target.value })} />
          </div>

          <div className="flex items-center gap-3">
            <button
              className="bg-cyan-400 text-black font-semibold px-4 py-2 rounded hover:bg-cyan-300 disabled:opacity-60"
              disabled={submitOrder.isPending}
              onClick={() => {
                setStatusMsg("");
                submitOrder.mutate();
              }}
            >
              {submitOrder.isPending ? "Submitting…" : "Submit Order Request"}
            </button>
            {statusMsg && <p className="text-sm text-gray-300">{statusMsg}</p>}
          </div>
        </section>

        <p className="text-xs text-gray-500 mt-4">
          Keep this page unlisted. For stronger protection, add authentication before production use.
        </p>
      </div>
    </main>
  );
}
