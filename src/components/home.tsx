import React from "react";
import StatisticsGrid from "./admin/StatisticsGrid";
import UserManagementTable from "./admin/UserManagementTable";
import GameControlPanel from "./admin/GameControlPanel";
import DateRangeFilter from "./admin/DateRangeFilter";

interface HomeProps {
  statistics?: {
    deposits: number;
    activeUsers: number;
    betVolume: number;
    winLossRatio: number;
  };
  users?: Array<{
    id: string;
    username: string;
    email: string;
    balance: number;
    bets: number;
    referrals: number;
    status: "active" | "suspended";
  }>;
  gameState?: {
    isGameRunning: boolean;
    currentMultiplier: number;
    rtp: number;
    minBet: number;
    maxBet: number;
  };
}

const defaultStatistics = {
  deposits: 5234567,
  activeUsers: 12543,
  betVolume: 8765432,
  winLossRatio: 1.45,
};

const defaultGameState = {
  isGameRunning: false,
  currentMultiplier: 1.5,
  rtp: 97,
  minBet: 1,
  maxBet: 1000,
};

export default function Home({
  statistics = defaultStatistics,
  gameState = defaultGameState,
}: HomeProps) {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
      <div className="max-w-[1512px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <p className="text-[#8E8E93] mt-1">
              Monitor and manage your casino operations
            </p>
          </div>
          <DateRangeFilter
            onRangeChange={(range) => {
              console.log("Date range changed:", range);
            }}
          />
        </div>

        <StatisticsGrid statistics={statistics} />

        <UserManagementTable
          onBalanceAdjust={(userId, amount) => {
            console.log("Adjust balance:", userId, amount);
          }}
          onSuspendAccount={(userId) => {
            console.log("Suspend account:", userId);
          }}
          onTargetNewsletter={(userId) => {
            console.log("Target newsletter:", userId);
          }}
        />

        <GameControlPanel
          isGameRunning={gameState.isGameRunning}
          currentMultiplier={gameState.currentMultiplier}
          rtp={gameState.rtp}
          minBet={gameState.minBet}
          maxBet={gameState.maxBet}
          onStartGame={() => {
            console.log("Start game");
          }}
          onStopGame={() => {
            console.log("Stop game");
          }}
          onMultiplierChange={(value) => {
            console.log("Multiplier changed:", value);
          }}
          onRTPChange={(value) => {
            console.log("RTP changed:", value);
          }}
          onBetLimitsChange={(min, max) => {
            console.log("Bet limits changed:", min, max);
          }}
        />
      </div>
    </div>
  );
}
