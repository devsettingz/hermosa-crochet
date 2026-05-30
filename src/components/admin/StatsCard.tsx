import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#D4A574]/20 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#888] font-medium">{title}</p>
          <p className="mt-2 text-2xl font-bold text-[#F5F0EB]">{value}</p>
          {trend && <p className="mt-1 text-xs text-[#D4A574]">{trend}</p>}
        </div>
        <div className="p-3 bg-[#D4A574]/10 rounded-lg">
          <Icon className="w-6 h-6 text-[#D4A574]" />
        </div>
      </div>
    </div>
  );
}