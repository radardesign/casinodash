import React from "react";
import { Card } from "@/components/ui/card";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Users,
  DollarSign,
  Percent,
} from "lucide-react";

interface StatisticCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const StatisticCard = ({
  title = "Statistic",
  value = "0",
  change = 0,
  icon = <DollarSign className="h-6 w-6" />,
}: StatisticCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-6 bg-[#1C1C1E] border-[#2C2C2E] hover:bg-[#2C2C2E] transition-all duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[#8E8E93] text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
          <div
            className={`flex items-center mt-2 ${isPositive ? "text-[#34C759]" : "text-[#FF3B30]"}`}
          >
            {isPositive ? (
              <ArrowUpCircle className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownCircle className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm">{Math.abs(change)}%</span>
          </div>
        </div>
        <div className="p-3 bg-[#2C2C2E] rounded-xl">{icon}</div>
      </div>
    </Card>
  );
};

interface StatisticsGridProps {
  statistics?: {
    deposits: number;
    activeUsers: number;
    betVolume: number;
    winLossRatio: number;
  };
}

const StatisticsGrid = ({
  statistics = {
    deposits: 1234567,
    activeUsers: 8562,
    betVolume: 9876543,
    winLossRatio: 1.23,
  },
}: StatisticsGridProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          title="Total Deposits/Withdrawals"
          value={`$${statistics.deposits.toLocaleString()}`}
          change={12.5}
          icon={<DollarSign className="h-6 w-6 text-[#007AFF]" />}
        />
        <StatisticCard
          title="Active Users"
          value={statistics.activeUsers.toLocaleString()}
          change={-5.2}
          icon={<Users className="h-6 w-6 text-[#34C759]" />}
        />
        <StatisticCard
          title="Total Bet Volume"
          value={`$${statistics.betVolume.toLocaleString()}`}
          change={8.7}
          icon={<DollarSign className="h-6 w-6 text-[#5856D6]" />}
        />
        <StatisticCard
          title="Win/Loss Ratio"
          value={statistics.winLossRatio.toFixed(2)}
          change={3.1}
          icon={<Percent className="h-6 w-6 text-[#FF9500]" />}
        />
      </div>
    </div>
  );
};

export default StatisticsGrid;
