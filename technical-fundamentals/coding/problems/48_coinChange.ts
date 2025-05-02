/*
Coin Change: https://leetcode.com/problems/coin-change-ii/description/
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
*/

export function coinChange_2D(amount: number, coins: Array<number>): number {
  const dp: number[][] = Array.from({ length: amount + 1 }, () => Array(coins.length).fill(0));

  dp[0].fill(1);

  for (let j = 0; j < coins.length; j += 1) {
    for (let i = 1; i <= amount; i += 1) {
      const subAmount = i - coins[j];

      if (subAmount >= 0) dp[i][j] = dp[subAmount][j];
      if (j > 0) dp[i][j] += dp[i][j - 1];
    }
  }

  return dp[amount][coins.length - 1] || 0;
}

export function coinChange(amount: number, coins: Array<number>): number {
  const dp: number[] = Array(amount + 1).fill(0);

  dp[0] = 1;

  for (const coin of coins) {
    for (let j = coin; j <= amount; j += 1) {
      dp[j] += dp[j - coin];
    }
  }

  return dp[amount];
}

