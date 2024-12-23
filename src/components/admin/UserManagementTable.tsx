import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ban, Mail, Search, ArrowUpDown } from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  bets: number;
  referrals: number;
  status: "active" | "suspended";
}

interface UserManagementTableProps {
  users?: User[];
  onBalanceAdjust?: (userId: string, amount: number) => void;
  onSuspendAccount?: (userId: string) => void;
  onTargetNewsletter?: (userId: string) => void;
}

const defaultUsers: User[] = [
  {
    id: "1",
    username: "player123",
    email: "player123@example.com",
    balance: 1000.0,
    bets: 150,
    referrals: 5,
    status: "active",
  },
  {
    id: "2",
    username: "gambler456",
    email: "gambler456@example.com",
    balance: 2500.5,
    bets: 300,
    referrals: 10,
    status: "active",
  },
  {
    id: "3",
    username: "suspended789",
    email: "suspended789@example.com",
    balance: 0,
    bets: 75,
    referrals: 2,
    status: "suspended",
  },
];

export default function UserManagementTable({
  users = defaultUsers,
  onBalanceAdjust = () => {},
  onSuspendAccount = () => {},
  onTargetNewsletter = () => {},
}: UserManagementTableProps) {
  return (
    <Card className="w-full p-4 bg-[#1C1C1E] border-[#2C2C2E]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Popular Campaigns</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search users..."
            className="w-64 bg-[#2C2C2E] border-[#3C3C3E] text-white placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:ring-[#007AFF]"
            type="search"
          />
        </div>
      </div>

      <div className="rounded-xl border border-[#2C2C2E] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#2C2C2E]">
            <TableRow className="hover:bg-[#3C3C3E] border-[#3C3C3E]">
              <TableHead className="text-[#8E8E93] font-medium">
                ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-[#8E8E93] font-medium">
                Username
              </TableHead>
              <TableHead className="text-[#8E8E93] font-medium">
                Email
              </TableHead>
              <TableHead className="text-[#8E8E93] font-medium text-right">
                Balance <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-[#8E8E93] font-medium text-right">
                Bets <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-[#8E8E93] font-medium text-right">
                Referrals <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-[#8E8E93] font-medium">
                Status
              </TableHead>
              <TableHead className="text-[#8E8E93] font-medium text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-[#2C2C2E] border-[#2C2C2E]"
              >
                <TableCell className="font-medium text-white">
                  {user.id}
                </TableCell>
                <TableCell className="text-white">{user.username}</TableCell>
                <TableCell className="text-white">{user.email}</TableCell>
                <TableCell className="text-right text-white">
                  ${user.balance.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-white">
                  {user.bets}
                </TableCell>
                <TableCell className="text-right text-white">
                  {user.referrals}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "destructive"
                    }
                    className={
                      user.status === "active"
                        ? "bg-[#34C759] text-white hover:bg-[#34C759]/90"
                        : "bg-[#FF3B30] text-white hover:bg-[#FF3B30]/90"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#2C2C2E] border-[#3C3C3E] text-white hover:bg-[#3C3C3E] hover:text-white hover:border-[#3C3C3E]"
                    >
                      Join
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
