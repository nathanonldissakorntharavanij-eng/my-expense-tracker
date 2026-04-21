import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"

export async function RecentTransactions() {
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching transactions:', error)
  }

  return (
    <Card className="col-span-3 bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {!transactions || transactions.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No recent transactions. Add one to get started!</p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${
                    transaction.type === "income"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-500"
                      : "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-500"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-5 w-5" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-4 flex-1 space-y-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-none truncate max-w-[150px] sm:max-w-xs">{transaction.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                  </p>
                </div>
                <div
                  className={`ml-auto font-bold whitespace-nowrap ${
                    transaction.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}฿{Number(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
