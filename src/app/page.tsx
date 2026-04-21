import { SummaryCards } from "@/components/dashboard/SummaryCards"
import { ExpenseChart } from "@/components/dashboard/ExpenseChart"
import { RecentTransactions } from "@/components/dashboard/RecentTransactions"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return (
    <div className="flex-col md:flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <div className="flex-1 space-y-6 p-4 sm:p-8 pt-6 max-w-7xl mx-auto w-full">
        <DashboardHeader />
        <div className="space-y-4">
          <SummaryCards />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <ExpenseChart />
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  )
}
