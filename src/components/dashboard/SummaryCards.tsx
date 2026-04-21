import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown } from "lucide-react"
import { supabase } from "@/lib/supabase"

export async function SummaryCards() {
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('amount, type')

  if (error) {
    console.error('Error fetching transactions for summary:', error)
  }

  const income = transactions?.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0) || 0
  const expense = transactions?.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0) || 0
  const balance = income - expense

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount)
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-0 shadow-lg shadow-indigo-200 dark:shadow-none transition-transform duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10 relative">
          <CardTitle className="text-sm font-medium text-indigo-100">ยอดเงินคงเหลือ (Total Balance)</CardTitle>
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Wallet className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="z-10 relative">
          <div className="text-4xl font-bold tracking-tight mb-1">{formatCurrency(balance)}</div>
          <p className="text-xs text-indigo-200">คำนวณจากทุกรายการ</p>
        </CardContent>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </Card>

      <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm transition-transform duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">รายรับทั้งหมด (Total Income)</CardTitle>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white mb-1">{formatCurrency(income)}</div>
          <p className="text-xs text-slate-400">คำนวณจากทุกรายการ</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm transition-transform duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">รายจ่ายทั้งหมด (Total Expense)</CardTitle>
          <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
            <TrendingDown className="h-5 w-5 text-rose-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white mb-1">{formatCurrency(expense)}</div>
          <p className="text-xs text-slate-400">คำนวณจากทุกรายการ</p>
        </CardContent>
      </Card>
    </div>
  )
}
