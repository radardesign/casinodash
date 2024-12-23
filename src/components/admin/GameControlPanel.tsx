import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, Pause, Settings, RefreshCw } from "lucide-react";

interface GameControlPanelProps {
  isGameRunning?: boolean;
  currentMultiplier?: number;
  rtp?: number;
  minBet?: number;
  maxBet?: number;
  onStartGame?: () => void;
  onStopGame?: () => void;
  onMultiplierChange?: (value: number) => void;
  onRTPChange?: (value: number) => void;
  onBetLimitsChange?: (min: number, max: number) => void;
}

const GameControlPanel = ({
  isGameRunning = false,
  currentMultiplier = 1.0,
  rtp = 97,
  minBet = 1,
  maxBet = 1000,
  onStartGame = () => {},
  onStopGame = () => {},
  onMultiplierChange = () => {},
  onRTPChange = () => {},
  onBetLimitsChange = () => {},
}: GameControlPanelProps) => {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Crash Game Controls */}
        <Card className="p-6 space-y-4 bg-[#1C1C1E] border-[#2C2C2E]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Crash Game Controls
            </h3>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isGameRunning}
                onCheckedChange={(checked) =>
                  checked ? onStartGame() : onStopGame()
                }
                className="bg-[#2C2C2E] data-[state=checked]:bg-[#007AFF] data-[state=unchecked]:bg-[#2C2C2E]"
              />
              <Label className="text-[#8E8E93]">Auto Mode</Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">
                {currentMultiplier.toFixed(2)}x
              </span>
              <Button
                variant={isGameRunning ? "destructive" : "default"}
                onClick={isGameRunning ? onStopGame : onStartGame}
                className={`${isGameRunning ? "bg-[#FF3B30] hover:bg-[#FF3B30]/90" : "bg-[#007AFF] hover:bg-[#007AFF]/90"} text-white`}
              >
                {isGameRunning ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Stop Game
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Game
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-[#8E8E93]">
                Manual Multiplier Adjustment
              </Label>
              <Slider
                value={[currentMultiplier]}
                min={1}
                max={10}
                step={0.1}
                onValueChange={(value) => onMultiplierChange(value[0])}
                className="[&_.slider-thumb]:bg-[#007AFF] [&_.slider-track]:bg-[#007AFF]"
              />
            </div>
          </div>
        </Card>

        {/* RTP Settings */}
        <Card className="p-6 space-y-4 bg-[#1C1C1E] border-[#2C2C2E]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">RTP Settings</h3>
            <Settings className="h-5 w-5 text-[#8E8E93]" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#8E8E93]">Return to Player (%)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={rtp}
                  onChange={(e) => onRTPChange(Number(e.target.value))}
                  min={1}
                  max={100}
                  className="bg-[#2C2C2E] border-[#3C3C3E] text-white focus:border-[#007AFF] focus:ring-[#007AFF]"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-[#2C2C2E] border-[#3C3C3E] text-[#8E8E93] hover:bg-[#3C3C3E] hover:text-white hover:border-[#3C3C3E]"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Betting Limits */}
        <Card className="p-6 space-y-4 bg-[#1C1C1E] border-[#2C2C2E]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Betting Limits</h3>
            <Settings className="h-5 w-5 text-[#8E8E93]" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#8E8E93]">Minimum Bet</Label>
              <Input
                type="number"
                value={minBet}
                onChange={(e) =>
                  onBetLimitsChange(Number(e.target.value), maxBet)
                }
                min={0}
                className="bg-[#2C2C2E] border-[#3C3C3E] text-white focus:border-[#007AFF] focus:ring-[#007AFF]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#8E8E93]">Maximum Bet</Label>
              <Input
                type="number"
                value={maxBet}
                onChange={(e) =>
                  onBetLimitsChange(minBet, Number(e.target.value))
                }
                min={minBet}
                className="bg-[#2C2C2E] border-[#3C3C3E] text-white focus:border-[#007AFF] focus:ring-[#007AFF]"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GameControlPanel;
