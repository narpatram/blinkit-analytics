export const sampleData = {
  "sales-trend": {
    total: 150000,
    timeSeries: [
      { date: "2024-01-01", this_month: 5000, last_month: 4500 },
      { date: "2024-01-02", this_month: 5200, last_month: 4800 },
      { date: "2024-01-03", this_month: 4800, last_month: 4200 },
      { date: "2024-01-04", this_month: 5500, last_month: 5000 },
      { date: "2024-01-05", this_month: 6000, last_month: 5500 },
      { date: "2024-01-06", this_month: 5800, last_month: 5300 },
      { date: "2024-01-07", this_month: 6200, last_month: 5800 },
    ]
  },
  "revenue-trend": {
    total: 200000,
    timeSeries: [
      { date: "2024-01-01", this_month: 7000, last_month: 6500 },
      { date: "2024-01-02", this_month: 7200, last_month: 6800 },
      { date: "2024-01-03", this_month: 6800, last_month: 6200 },
      { date: "2024-01-04", this_month: 7500, last_month: 7000 },
      { date: "2024-01-05", this_month: 8000, last_month: 7500 },
      { date: "2024-01-06", this_month: 7800, last_month: 7300 },
      { date: "2024-01-07", this_month: 8200, last_month: 7800 },
    ]
  },
  "top-cities": {
    data: [
      { name: 'Mumbai', value: 400 },
      { name: 'Delhi', value: 300 },
      { name: 'Bangalore', value: 300 },
      { name: 'Others', value: 100 },
    ],
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  },
  "top-products": {
    rows: [
      {
        product_id: 1,
        product_name: "Organic Brown Rice",
        sales_mrp_sum: "₹42,500",
        qty_sold: 850,
        drr_7: "85%",
        drr_14: "82%",
        drr_30: "78%",
        days_of_inventory_14: 12,
        days_of_inventory_max: 15,
        on_shelf_availability: "95%",
        rank_avg: 4.5,
        selling_price_avg: "₹500",
        discount_avg: "10%"
      },
      {
        product_id: 2,
        product_name: "Almond Milk",
        sales_mrp_sum: "₹36,000",
        qty_sold: 720,
        drr_7: "88%",
        drr_14: "85%",
        drr_30: "80%",
        days_of_inventory_14: 10,
        days_of_inventory_max: 12,
        on_shelf_availability: "98%",
        rank_avg: 4.7,
        selling_price_avg: "₹450",
        discount_avg: "8%"
      },
      {
        product_id: 3,
        product_name: "Protein Bars",
        sales_mrp_sum: "₹34,000",
        qty_sold: 680,
        drr_7: "82%",
        drr_14: "80%",
        drr_30: "75%",
        days_of_inventory_14: 14,
        days_of_inventory_max: 16,
        on_shelf_availability: "92%",
        rank_avg: 4.3,
        selling_price_avg: "₹400",
        discount_avg: "12%"
      },
      {
        product_id: 4,
        product_name: "Greek Yogurt",
        sales_mrp_sum: "₹29,500",
        qty_sold: 590,
        drr_7: "90%",
        drr_14: "88%",
        drr_30: "85%",
        days_of_inventory_14: 8,
        days_of_inventory_max: 10,
        on_shelf_availability: "96%",
        rank_avg: 4.6,
        selling_price_avg: "₹350",
        discount_avg: "5%"
      },
      {
        product_id: 5,
        product_name: "Quinoa",
        sales_mrp_sum: "₹26,000",
        qty_sold: 520,
        drr_7: "87%",
        drr_14: "85%",
        drr_30: "82%",
        days_of_inventory_14: 11,
        days_of_inventory_max: 13,
        on_shelf_availability: "94%",
        rank_avg: 4.4,
        selling_price_avg: "₹380",
        discount_avg: "7%"
      }
    ]
  },
  "top-categories": {
    rows: [
      {
        category_id: 1,
        category_name: "Health Foods",
        orders_count: 1250,
        revenue_sum: "₹425,000",
        avg_order_value: "₹340",
        unique_products: 45,
        drr_7: "86%",
        drr_14: "84%",
        drr_30: "80%",
        days_of_inventory_14: 13,
        days_of_inventory_max: 15
      },
      {
        category_id: 2,
        category_name: "Dairy Alternatives",
        orders_count: 980,
        revenue_sum: "₹360,000",
        avg_order_value: "₹367",
        unique_products: 32,
        drr_7: "89%",
        drr_14: "87%",
        drr_30: "83%",
        days_of_inventory_14: 11,
        days_of_inventory_max: 13
      },
      {
        category_id: 3,
        category_name: "Snacks & Bars",
        orders_count: 850,
        revenue_sum: "₹340,000",
        avg_order_value: "₹400",
        unique_products: 28,
        drr_7: "85%",
        drr_14: "82%",
        drr_30: "78%",
        days_of_inventory_14: 14,
        days_of_inventory_max: 16
      },
      {
        category_id: 4,
        category_name: "Beverages",
        orders_count: 720,
        revenue_sum: "₹295,000",
        avg_order_value: "₹410",
        unique_products: 35,
        drr_7: "88%",
        drr_14: "85%",
        drr_30: "82%",
        days_of_inventory_14: 10,
        days_of_inventory_max: 12
      },
      {
        category_id: 5,
        category_name: "Grains & Cereals",
        orders_count: 680,
        revenue_sum: "₹260,000",
        avg_order_value: "₹382",
        unique_products: 40,
        drr_7: "87%",
        drr_14: "84%",
        drr_30: "81%",
        days_of_inventory_14: 12,
        days_of_inventory_max: 14
      }
    ]
  }
}; 