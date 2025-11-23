import React from "react";


export default function Table({ columns = [], data = [] }) {
return (
<table className="table">
<thead>
<tr>
{columns.map((col) => (
<th key={col.key || col.label}>{col.label}</th>
))}
</tr>
</thead>


<tbody>
{data.length === 0 && (
<tr>
<td colSpan={columns.length} style={{ textAlign: "center", padding: "16px" }}>
No records found
</td>
</tr>
)}


{data.map((row, rowIndex) => (
<tr key={rowIndex}>
{columns.map((col) => (
<td key={col.key || col.label}>
{typeof col.render === "function" ? col.render(row) : row[col.key]}
</td>
))}
</tr>
))}
</tbody>
</table>
);
}