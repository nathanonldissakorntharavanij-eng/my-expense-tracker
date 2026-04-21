import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { ExpenseChartUI } from "./ExpenseChartUI"

export async function ExpenseChart() {
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('amount, type, date')

  if (error) {
    console.error('Error fetching transactions for chart:', error)
  }

  // Initialize all 12 months with 0
  const groupedData = Array.from({ length: 12 }, (_, i) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return { name: monthNames[i], total: 0 }
  })

  // Populate data
  transactions?.forEach(t => {
    if (t.type === 'expense') {
      const date = new Date(t.date)
      // Only show current year expenses (optional, but good practice)
      if (date.getFullYear() === new Date().getFullYear()) {
        const month = date.getMonth()
        groupedData[month].total += Number(t.amount)
      }
    }
  })

  return (
    <Card className="col-span-4 bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">Expense Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ExpenseChartUI data={groupedData} />
      </CardContent>
    </Card>
  )
}
