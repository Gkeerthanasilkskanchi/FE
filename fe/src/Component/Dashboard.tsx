//dashboard


import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { getUserList } from "../API/API";

const barData = [
  { year: '2003', count: 500 },
  { year: '2004', count: 2000 },
  { year: '2005', count: 1500 },
  { year: '2006', count: 5000 },
  { year: '2007', count: 3500 },
  { year: '2008', count: 9000 },
  { year: '2009', count: 7000 },
  { year: '2010', count: 15000 },
  { year: '2011', count: 12000 },
  { year: '2012', count: 25000 },
  { year: '2013', count: 22000 },
  { year: '2014', count: 40000 },
  { year: '2015', count: 37000 },
  { year: '2016', count: 55000 },
  { year: '2017', count: 50000 },
  { year: '2018', count: 70000 },
  { year: '2019', count: 66000 },
  { year: '2020', count: 85000 },
  { year: '2021', count: 80000 },
  { year: '2022', count: 95000 },
  { year: '2023', count: 90000 },
  { year: '2024', count: 100000 },
];



const pieData = [
  { name: "Sarees", value: 400 },
  { name: "Lehengas", value: 300 },
  { name: "Salwar Suits", value: 200 },
  { name: "Western Wear", value: 100 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];


const stats = [
  { title: "Total Users", value: "1,250", icon: "👥", bgColor: "#0d6efd" },
  { title: "Products Sold (Today)", value: "75", icon: "🛍️", bgColor: "#0d6efd" },
  { title: "Products Sold (This Week)", value: "420", icon: "📦", bgColor: "#0d6efd" },
  { title: "Revenue (This Month)", value: "₹1.2L", icon: "💰", bgColor: "#0d6efd" },
];



export const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any>([]);
  const [barChat, setBarChat] = useState<any>([]);
  const [pieChat, setPieChat] = useState<any>([]);
  useEffect(() => {
    getUser();
  }, [])
  const getUser = async () => {
    const response: any = await getUserList();
    if (response?.status > 200) setUsers(response?.data?.data);
    console.log(response)
  }
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen p-8 space-y-8">
      {/* Stats Cards */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div className="col-lg-3 mb-4" key={index}>
            <div
              className='cardContainer'     >
              <div className='cardIcon'>{stat.icon}</div>
              <div>
                <h6 className='cardTitle'>{stat.title}</h6>
                <p className='cardValue'>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>



<div className="container mt-5 mb-5">
  <div className="row g-4 align-items-stretch">
    
    {/* Left - Line Chart - chart-color */}
  <div className="col-md-6">
  <div className="rounded-3 p-3 bg-dark text-white h-100">
    <h4 className="mb-4">
      Year-wise Product Count
    </h4>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
        <XAxis dataKey="year" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#2d2d2d",
            color: "#fff",
            borderRadius: "10px"
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#facc15"
          strokeWidth={3}
          dot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

    {/* Right - Pie Chart */}
    <div className="col-md-6">
      <div className="rounded-3 p-3 bg-dark text-white h-100">
        <h4 className="mb-4">
          Sales by Category
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

  </div>
</div>




      {/* Table Section */}
      {/* <div className="col-lg-6 w-full rounded-2xl p-6">
          <h2 className="text-clip-gradient mb-4">
            User Email List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left text-sm text-gray-600">S.No</th>
                  <th className="px-4 py-2 border-b text-left text-sm text-gray-600">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, index: any) => (
                  <tr key={user.id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-sm text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 border-b text-sm text-gray-800">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}


    </div>
  );
};
