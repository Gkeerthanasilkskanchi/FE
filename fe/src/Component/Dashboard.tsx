import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { getUserList } from "../API/API";

const barData = [
  { name: "Mon", sales: 120 },
  { name: "Tue", sales: 180 },
  { name: "Wed", sales: 90 },
  { name: "Thu", sales: 200 },
  { name: "Fri", sales: 140 },
  { name: "Sat", sales: 170 },
  { name: "Sun", sales: 240 },
];

const pieData = [
  { name: "Sarees", value: 400 },
  { name: "Lehengas", value: 300 },
  { name: "Salwar Suits", value: 200 },
  { name: "Western Wear", value: 100 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];


const stats = [
  { title: "Total Users", value: "1,250", icon: "👥",bgColor: "#0d6efd"  },
  { title: "Products Sold (Today)", value: "75", icon: "🛍️",bgColor: "#0d6efd"  },
  { title: "Products Sold (This Week)", value: "420", icon: "📦",bgColor: "#0d6efd"  },
  { title: "Revenue (This Month)", value: "₹1.2L", icon: "💰" ,bgColor: "#0d6efd" },
];

export const Dashboard: React.FC = () => {
  const [users,setUsers] = useState<any>([]);
  const [barChat,setBarChat]=useState<any>([]);
  const [pieChat,setPieChat]=useState<any>([]);
  useEffect(()=>{
   getUser();
  },[])
  const getUser = async()=>{
    const response :any= await getUserList();
    if(response?.status>200) setUsers(response?.data?.data);
    console.log(response)
  }
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen p-8 space-y-8">
    <div className="row mb-4">
  {stats.map((stat, index) => (
    <div
      className="col-lg-4 mb-3"
      key={index}
    >
      <div
        className="d-flex p-3 rounded text-white dashboard-primary"
        style={{minHeight:"120px" }} // fallback to indigo if no color
      >
        <div className="me-3 d-flex align-items-center fs-4">
          {stat.icon}
        </div>
        <div>
          <h4 className="text-sm text-light">{stat.title}</h4>
          <p className="text-xl fw-bold text-white mt-1 mb-0">{stat.value}</p>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className=" p-6 rounded-2xl">
          <h2 className="text-clip-gradient mb-4">
            Weekly Product Sales
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#c98b8b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        
      </div>

      <div className="row mt-5 mb-5">
 
  <div className="col-lg-6 w-full rounded-2xl p-6">
    <h2 className="text-clip-gradient mb-4">
      Sales by Category
    </h2>
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

  {/* Table Section */}
  <div className="col-lg-6 w-full rounded-2xl p-6">
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
          {users.map((user:any, index:any) => (
            <tr key={user.id || index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-700">{index + 1}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

    </div>
  );
};
