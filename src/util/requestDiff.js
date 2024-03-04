const  diff = (oldText, newText) =>{
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    const diffLines = [];

    const lcs = longestCommonSubsequence(oldLines, newLines);
   
    let oldIndex = 0;
    let newIndex = 0;
   
    while (oldIndex < oldLines.length || newIndex < newLines.length) {
       if (oldIndex < oldLines.length && newIndex < newLines.length && oldLines[oldIndex] === newLines[newIndex]) {
         // Unchanged line
         diffLines.push(' ' + oldLines[oldIndex]);
         oldIndex++;
         newIndex++;
       } else if (newIndex < newLines.length && (oldIndex >= oldLines.length || oldLines[oldIndex] !== newLines[newIndex])) {
         // Added line
         diffLines.push('+ ' + newLines[newIndex]);
         newIndex++;
       } else if (oldIndex < oldLines.length && (newIndex >= newLines.length || oldLines[oldIndex] !== newLines[newIndex])) {
         // Removed line
         diffLines.push('- ' + oldLines[oldIndex]);
         oldIndex++;
       }
    }
   
    return diffLines;
   }

   const longestCommonSubsequence = (a, b) =>{
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
   
    for (let i = 1; i <= m; i++) {
       for (let j = 1; j <= n; j++) {
         if (a[i - 1] === b[j - 1]) {
           dp[i][j] = dp[i - 1][j - 1] + 1;
         } else {
           dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
         }
       }
    }
   
    let i = m, j = n;
    const lcs = [];
   
    while (i > 0 && j > 0) {
       if (a[i - 1] === b[j - 1]) {
         lcs.unshift(a[i - 1]);
         i--;
         j--;
       } else if (dp[i - 1][j] > dp[i][j - 1]) {
         i--;
       } else {
         j--;
       }
    }
   
    return lcs;
   }
   
 
   export default diff
   
