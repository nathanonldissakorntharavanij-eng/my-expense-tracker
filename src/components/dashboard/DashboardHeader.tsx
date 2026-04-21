"use client"

import { useState } from "react"
import { PlusCircle, X } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", amount: "", type: "expense", date: new Date().toISOString().split('T')[0] })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const { error } = await supabase.from('transactions').insert([
      { 
        name: formData.name, 
        amount: parseFloat(formData.amount), 
        type: formData.type,
        date: formData.date
      }
    ])

    setIsLoading(false)
    if (!error) {
      setIsOpen(false)
      setFormData({ name: "", amount: "", type: "expense", date: new Date().toISOString().split('T')[0] })
      router.refresh()
    } else {
      console.error("Supabase Error:", error)
      alert(`Error saving transaction: ${error.message || JSON.stringify(error)}`)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-8 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">ระบบจัดการรายรับ-รายจ่ายของคุณ</p>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <Button 
          onClick={() => setIsOpen(true)} 
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          เพิ่มรายการใหม่
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            style={{ animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">เพิ่มรายการบัญชี</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Type Toggle */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, type: 'income'})} 
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${formData.type === 'income' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                >
                  รายรับ
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, type: 'expense'})} 
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${formData.type === 'expense' ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                >
                  รายจ่าย
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">จำนวนเงิน (บาท)</label>
                  <input type="number" required min="0" step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" placeholder="0.00" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">วันที่</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">รายละเอียด</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" placeholder="เช่น เงินเดือน, ค่าไฟ" />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
                  ยกเลิก
                </button>
                <button type="submit" disabled={isLoading} className="flex-1 px-4 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-200 dark:shadow-none active:scale-95 disabled:opacity-50">
                  {isLoading ? "กำลังบันทึก..." : "บันทึกรายการ"}
                </button>
              </div>
            </form>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes modalSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}} />
        </div>
      )}
    </div>
  )
}
