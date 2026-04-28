export const getBarChartOptions = (categories) => ({
  chart: { toolbar: { show: false } },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 4,
      dataLabels: { position: 'top' },
    }
  },
  tooltip: { theme: "dark", y: { formatter: function (val) { return val >= 1000 ? "₹" + (val / 1000).toFixed(1) + "k" : "₹" + val; } } },
  dataLabels: { enabled: true, style: { fontSize: "10px", fontWeight: "bold", colors: ["#fff"] } },
  stroke: { show: true, width: 2, colors: ["transparent"] },
  xaxis: {
    categories: categories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" }, formatter: (value) => { if (typeof value === 'number') { return value >= 1000 ? `₹${(value / 1000).toFixed(1)}k` : `₹${value}`; } return value; } },
  },
  yaxis: {
    show: true,
    labels: {
      style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" },
    },
  },
  grid: { borderColor: "rgba(163, 174, 208, 0.3)", strokeDashArray: 4, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
  fill: { opacity: 1 },
  colors: ["#4318FF", "#39B8FF", "#6AD2FF", "#01B574", "#FFB547"],
  legend: { show: true, position: "top", horizontalAlign: "right", markers: { radius: 12 } },
});

export const getComparisonBarChartOptions = (categories, highlightedBranch = null) => ({
  chart: { toolbar: { show: false }, type: "bar" },
  tooltip: { theme: "dark", shared: true, intersect: false },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 1, colors: ["transparent"] },
  xaxis: {
    categories: categories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" } },
  },
  yaxis: {
    show: true,
    labels: {
      style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" },
      formatter: (value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value,
    },
  },
  grid: { borderColor: "rgba(163, 174, 208, 0.3)", strokeDashArray: 4, yaxis: { lines: { show: true } } },
  fill: {
    opacity: highlightedBranch ? [1, 0.3, 0.3, 0.3].map((o, i) => {
      const branches = ["Kochi", "Trivandrum", "Calicut", "Thrissur"];
      return branches[i] === highlightedBranch ? 1 : 0.3;
    }) : [1, 1, 1, 1],
  },
  colors: ["#4318FF", "#6AD2FF", "#01B574", "#FFB547"],
  legend: { show: true, position: "top", horizontalAlign: "right", markers: { radius: 12 } },
  plotOptions: { bar: { columnWidth: "55%", borderRadius: 4 } },
});

export const getLineChartOptions = (categories) => ({
  chart: { toolbar: { show: false }, dropShadow: { enabled: true, top: 13, left: 0, blur: 10, opacity: 0.1, color: "#4318FF" } },
  colors: ["#4318FF", "#39B8FF", "#6AD2FF"],
  markers: { size: 5, colors: "white", strokeColors: ["#4318FF", "#39B8FF", "#6AD2FF"], strokeWidth: 3, strokeOpacity: 0.9, strokeDashArray: 0, fillOpacity: 1, discrete: [], shape: "circle", radius: 2, offsetX: 0, offsetY: 0, hover: { size: 7 } },
  tooltip: { theme: "dark", y: { formatter: function (val) { return val >= 1000 ? "₹" + (val / 1000).toFixed(1) + "k" : "₹" + val; } } },
  dataLabels: { enabled: true, offsetY: -5, style: { fontSize: "10px", fontWeight: "bold", colors: ["#A3AED0"] }, background: { enabled: true, foreColor: "#fff", padding: 4, borderRadius: 2, borderWidth: 0, opacity: 0.9 } },
  stroke: { curve: "smooth", type: "line" },
  xaxis: {
    categories: categories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" } },
  },
  yaxis: {
    show: true,
    labels: {
      style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" },
      formatter: (value) => value >= 1000 ? `₹${(value / 1000).toFixed(1)}k` : `₹${value}`,
    },
  },
  legend: { show: true, position: "top", horizontalAlign: "right" },
  grid: { borderColor: "rgba(163, 174, 208, 0.3)", strokeDashArray: 4, yaxis: { lines: { show: true } } },
});

export const getPieChartOptions = (labels) => ({
  labels: labels,
  colors: ["#4318FF", "#6AD2FF", "#01B574", "#FFB547", "#E2E8F0"],
  chart: { width: "100%" },
  states: { hover: { filter: { type: "none" } } },
  legend: { show: true, position: "bottom" },
  dataLabels: { enabled: true, dropShadow: { enabled: false }, formatter: function (val) { return val.toFixed(1) + "%"; } },
  hover: { mode: null },
  plotOptions: { 
    pie: { 
      expandOnClick: false, 
      donut: { 
        size: "75%", 
        labels: { 
          show: true, 
          name: { show: true, fontSize: "14px", color: "#A3AED0" }, 
          value: { show: true, fontSize: "22px", fontWeight: "bold", color: "#003366", formatter: function (val) { return val >= 1000 ? (val / 1000).toFixed(1) + "k" : val; } },
          total: { show: true, showAlways: true, label: "Total", fontSize: "14px", color: "#A3AED0", formatter: function (w) { const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0); return total >= 1000 ? (total / 1000).toFixed(1) + "k" : total; } }
        } 
      } 
    } 
  },
  tooltip: { theme: "dark", y: { formatter: function (val) { return val >= 1000 ? (val / 1000).toFixed(1) + "k" : val; } } },
});

export const dashboardData = {
  branches: ["Kochi", "Trivandrum", "Calicut", "Thrissur", "Kollam", "Kannur", "Alappuzha", "Kottayam", "Palakkad"],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  products: ["Gold Loan", "Personal Loan", "Business Loan", "Vehicle Loan"],
  expenses: ["Salary", "Rent", "Marketing", "Operations"],
  
  aggregate: {
    revenue: { actual: [4000, 3000, 2500, 2000, 1800, 1600, 1400, 1200, 1000], expected: [4100, 2900, 2550, 2050, 1850, 1550, 1425, 1225, 1025], budget: [4200, 2800, 2600, 2100, 1900, 1500, 1450, 1250, 1050] },
    expense: { actual: [1500, 1200, 1000, 800, 700, 650, 550, 450, 400], expected: [1450, 1250, 975, 825, 725, 625, 575, 475, 400], budget: [1400, 1300, 950, 850, 750, 600, 600, 500, 400] },
    profit: { actual: [2500, 1800, 1500, 1200, 1100, 950, 850, 750, 600], expected: [2650, 1650, 1575, 1225, 1125, 925, 850, 750, 625], budget: [2800, 1500, 1650, 1250, 1150, 900, 850, 750, 650] },
    kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 450 Cr", customers: "15,240", revenue: "₹ 12.5 Cr" },
    productMix: [6000, 2500, 2000, 1000],
    expenseBreakdown: [2500, 1200, 500, 300],
    taskMetrics: { total: 1250, completed: 850, pending: 300, inProgress: 100 }
  },

  // Branch comparison by month – each branch's actual monthly data for each metric
  comparison: {
    revenue: [
      { name: "Kochi",      data: [600, 650, 700, 680, 750, 800] },
      { name: "Trivandrum", data: [450, 480, 500, 520, 510, 540] },
      { name: "Calicut",    data: [380, 400, 410, 420, 440, 450] },
      { name: "Thrissur",   data: [300, 320, 330, 340, 350, 360] },
    ],
    expense: [
      { name: "Kochi",      data: [200, 210, 205, 220, 230, 240] },
      { name: "Trivandrum", data: [180, 185, 190, 195, 200, 205] },
      { name: "Calicut",    data: [150, 155, 160, 165, 170, 175] },
      { name: "Thrissur",   data: [120, 125, 130, 135, 140, 145] },
    ],
    profit: [
      { name: "Kochi",      data: [400, 440, 495, 460, 520, 560] },
      { name: "Trivandrum", data: [270, 295, 310, 325, 310, 335] },
      { name: "Calicut",    data: [230, 245, 250, 255, 270, 275] },
      { name: "Thrissur",   data: [180, 195, 200, 205, 210, 215] },
    ],
  },
  
  branchDetails: {
    "Kochi": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 150 Cr", customers: "5,100", revenue: "₹ 4.0 Cr" },
      trend: {
        revenue: { actual: [600, 650, 700, 680, 750, 800], expected: [610, 645, 705, 690, 755, 805], budget: [620, 640, 710, 700, 760, 810] },
        expense: { actual: [200, 210, 205, 220, 230, 240], expected: [205, 213, 208, 223, 233, 243], budget: [210, 215, 210, 225, 235, 245] },
        profit: { actual: [400, 440, 495, 460, 520, 560], expected: [405, 433, 498, 468, 523, 563], budget: [410, 425, 500, 475, 525, 565] }
      },
      productMix: [2500, 800, 500, 200],
      expenseBreakdown: [1000, 300, 150, 50],
      taskMetrics: { total: 450, completed: 320, pending: 100, inProgress: 30 },
      compareData: {
        totalRevenue: "₹ 4.18 Cr",
        totalProfit: "₹ 2.87 Cr",
        topProduct: "Gold Loan (62%)",
        highestExpense: "Salary (66%)",
        staffCount: "14 Employees"
      }
    },
    "Trivandrum": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 120 Cr", customers: "4,200", revenue: "₹ 3.0 Cr" },
      trend: {
        revenue: { actual: [450, 480, 500, 520, 510, 540], expected: [455, 485, 505, 525, 515, 545], budget: [460, 490, 510, 530, 520, 550] },
        expense: { actual: [180, 185, 190, 195, 200, 205], expected: [183, 188, 193, 198, 203, 208], budget: [185, 190, 195, 200, 205, 210] },
        profit: { actual: [270, 295, 310, 325, 310, 335], expected: [273, 298, 313, 328, 313, 338], budget: [275, 300, 315, 330, 315, 340] }
      },
      productMix: [1800, 700, 400, 100],
      expenseBreakdown: [800, 250, 100, 50],
      taskMetrics: { total: 350, completed: 250, pending: 70, inProgress: 30 },
      compareData: {
        totalRevenue: "₹ 3.00 Cr",
        totalProfit: "₹ 1.84 Cr",
        topProduct: "Gold Loan (60%)",
        highestExpense: "Salary (66%)",
        staffCount: "11 Employees"
      }
    },
    "Calicut": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 100 Cr", customers: "3,500", revenue: "₹ 2.5 Cr" },
      trend: {
        revenue: { actual: [380, 400, 410, 420, 440, 450], expected: [385, 405, 415, 425, 445, 455], budget: [390, 410, 420, 430, 450, 460] },
        expense: { actual: [150, 155, 160, 165, 170, 175], expected: [153, 158, 163, 168, 173, 178], budget: [155, 160, 165, 170, 175, 180] },
        profit: { actual: [230, 245, 250, 255, 270, 275], expected: [233, 248, 253, 258, 273, 278], budget: [235, 250, 255, 260, 275, 280] }
      },
      productMix: [1000, 600, 600, 300],
      expenseBreakdown: [600, 200, 150, 50],
      taskMetrics: { total: 250, completed: 160, pending: 70, inProgress: 20 },
      compareData: {
        totalRevenue: "₹ 2.50 Cr",
        totalProfit: "₹ 1.52 Cr",
        topProduct: "Gold Loan (40%)",
        highestExpense: "Salary (60%)",
        staffCount: "9 Employees"
      }
    },
    "Thrissur": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 80 Cr", customers: "2,440", revenue: "₹ 2.0 Cr" },
      trend: {
        revenue: { actual: [300, 320, 330, 340, 350, 360], expected: [305, 325, 335, 345, 355, 365], budget: [310, 330, 340, 350, 360, 370] },
        expense: { actual: [120, 125, 130, 135, 140, 145], expected: [123, 128, 133, 138, 143, 148], budget: [125, 130, 135, 140, 145, 150] },
        profit: { actual: [180, 195, 200, 205, 210, 215], expected: [183, 198, 203, 208, 213, 218], budget: [185, 200, 205, 210, 215, 220] }
      },
      productMix: [700, 400, 500, 400],
      expenseBreakdown: [400, 150, 100, 100],
      taskMetrics: { total: 200, completed: 120, pending: 60, inProgress: 20 },
      compareData: {
        totalRevenue: "₹ 2.00 Cr",
        totalProfit: "₹ 1.20 Cr",
        topProduct: "Gold Loan (35%)",
        highestExpense: "Salary (53%)",
        staffCount: "7 Employees"
      }
    },
    "Kollam": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 70 Cr", customers: "2,100", revenue: "₹ 1.8 Cr" },
      trend: {
        revenue: { actual: [280, 290, 300, 310, 310, 310], expected: [285, 295, 305, 315, 320, 325], budget: [290, 300, 310, 320, 330, 340] },
        expense: { actual: [110, 115, 120, 120, 120, 115], expected: [113, 118, 123, 125, 125, 123], budget: [115, 120, 125, 130, 130, 130] },
        profit: { actual: [170, 175, 180, 190, 190, 195], expected: [173, 178, 183, 190, 195, 203], budget: [175, 180, 185, 190, 200, 210] }
      },
      productMix: [600, 300, 400, 300],
      expenseBreakdown: [350, 120, 90, 80],
      taskMetrics: { total: 180, completed: 100, pending: 60, inProgress: 20 },
      compareData: {
        totalRevenue: "₹ 1.80 Cr",
        totalProfit: "₹ 1.10 Cr",
        topProduct: "Gold Loan (37%)",
        highestExpense: "Salary (54%)",
        staffCount: "6 Employees"
      }
    },
    "Kannur": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 65 Cr", customers: "1,900", revenue: "₹ 1.6 Cr" },
      trend: {
        revenue: { actual: [250, 260, 270, 260, 280, 280], expected: [255, 265, 275, 265, 285, 285], budget: [260, 270, 280, 270, 290, 290] },
        expense: { actual: [100, 105, 110, 105, 115, 115], expected: [103, 108, 113, 108, 118, 118], budget: [105, 110, 115, 110, 120, 120] },
        profit: { actual: [150, 155, 160, 155, 165, 165], expected: [153, 158, 163, 158, 168, 168], budget: [155, 160, 165, 160, 170, 170] }
      },
      productMix: [500, 300, 300, 200],
      expenseBreakdown: [300, 100, 80, 70],
      taskMetrics: { total: 150, completed: 90, pending: 50, inProgress: 10 },
      compareData: {
        totalRevenue: "₹ 1.60 Cr",
        totalProfit: "₹ 0.95 Cr",
        topProduct: "Gold Loan (38%)",
        highestExpense: "Salary (54%)",
        staffCount: "5 Employees"
      }
    },
    "Alappuzha": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 60 Cr", customers: "1,800", revenue: "₹ 1.4 Cr" },
      trend: {
        revenue: { actual: [220, 230, 240, 230, 240, 240], expected: [225, 235, 245, 235, 245, 245], budget: [230, 240, 250, 240, 250, 250] },
        expense: { actual: [90, 95, 100, 95, 100, 100], expected: [93, 98, 103, 98, 103, 103], budget: [95, 100, 105, 100, 105, 105] },
        profit: { actual: [130, 135, 140, 135, 140, 140], expected: [133, 138, 143, 138, 143, 143], budget: [135, 140, 145, 140, 145, 145] }
      },
      productMix: [400, 200, 300, 200],
      expenseBreakdown: [250, 90, 70, 60],
      taskMetrics: { total: 130, completed: 80, pending: 40, inProgress: 10 },
      compareData: {
        totalRevenue: "₹ 1.40 Cr",
        totalProfit: "₹ 0.85 Cr",
        topProduct: "Gold Loan (36%)",
        highestExpense: "Salary (53%)",
        staffCount: "5 Employees"
      }
    },
    "Kottayam": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 55 Cr", customers: "1,600", revenue: "₹ 1.2 Cr" },
      trend: {
        revenue: { actual: [200, 200, 210, 200, 200, 190], expected: [205, 205, 215, 205, 205, 195], budget: [210, 210, 220, 210, 210, 200] },
        expense: { actual: [80, 80, 85, 80, 80, 75], expected: [83, 83, 88, 83, 83, 78], budget: [85, 85, 90, 85, 85, 80] },
        profit: { actual: [120, 120, 125, 120, 120, 115], expected: [123, 123, 128, 123, 123, 118], budget: [125, 125, 130, 125, 125, 120] }
      },
      productMix: [300, 200, 200, 100],
      expenseBreakdown: [200, 80, 60, 50],
      taskMetrics: { total: 110, completed: 70, pending: 30, inProgress: 10 },
      compareData: {
        totalRevenue: "₹ 1.20 Cr",
        totalProfit: "₹ 0.75 Cr",
        topProduct: "Gold Loan (37%)",
        highestExpense: "Salary (51%)",
        staffCount: "4 Employees"
      }
    },
    "Palakkad": {
      kpi: { goldRate: "₹ 7,100 / gm", aum: "₹ 50 Cr", customers: "1,400", revenue: "₹ 1.0 Cr" },
      trend: {
        revenue: { actual: [180, 180, 180, 170, 160, 150], expected: [185, 185, 185, 175, 165, 155], budget: [190, 190, 190, 180, 170, 160] },
        expense: { actual: [70, 70, 70, 65, 60, 55], expected: [73, 73, 73, 68, 63, 58], budget: [75, 75, 75, 70, 65, 60] },
        profit: { actual: [110, 110, 110, 105, 100, 95], expected: [113, 113, 113, 108, 103, 98], budget: [115, 115, 115, 110, 105, 100] }
      },
      productMix: [300, 150, 150, 50],
      expenseBreakdown: [150, 70, 50, 40],
      taskMetrics: { total: 90, completed: 50, pending: 30, inProgress: 10 },
      compareData: {
        totalRevenue: "₹ 1.00 Cr",
        totalProfit: "₹ 0.60 Cr",
        topProduct: "Gold Loan (46%)",
        highestExpense: "Salary (48%)",
        staffCount: "4 Employees"
      }
    }
  }
};
