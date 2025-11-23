import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listEmployees } from "../services/employees";
import { createTeam, getTeam, updateTeam, assignToTeam, deleteTeam } from "../services/teams";
import Loading from "../components/Loading";

export default function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [form, setForm] = useState({ name: "", description: "" });
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const emps = await listEmployees();
        setEmployees(Array.isArray(emps) ? emps : []);
        if (id) {
          const team = await getTeam(Number(id));
          setForm({ name: team?.name || "", description: team?.description || "" });
        }
      } catch (err) {
        console.error("TeamForm load error:", err);
        alert("Failed to load data. Check console for details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loading />;

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (id) {
        await updateTeam(Number(id), form);
        alert("Team updated");
      } else {
        await createTeam(form);
        alert("Team created");
      }
      navigate("/dashboard/teams");
    } catch (err) {
      console.error("Save team error:", err);
      alert(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleAssign() {
    if (!id) {
      alert("Save the team first before assigning employees.");
      return;
    }
    if (!selected.length) {
      alert("Select at least one employee to assign.");
      return;
    }
    setAssigning(true);
    try {
      await assignToTeam(Number(id), { employeeIds: selected });
      alert("Assigned employees to team");
      setSelected([]);
    } catch (err) {
      console.error("Assign error:", err);
      alert(err?.response?.data?.message || "Assign failed");
    } finally {
      setAssigning(false);
    }
  }

  function toggleSelect(empId) {
    const v = Number(empId);
    setSelected((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
  }

  async function handleDelete() {
    if (!id) return;
    if (!confirm("Delete this team? This is irreversible.")) return;
    try {
      await deleteTeam(Number(id));
      alert("Team deleted");
      navigate("/dashboard/teams");
    } catch (err) {
      console.error("Delete team error:", err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 900 }}>
      <h3>{id ? "Edit Team" : "New Team"}</h3>

      <form onSubmit={handleSave} style={{ display: "grid", gap: 8 }}>
        <input className="input" placeholder="Team name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <textarea className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" className="btn ghost" onClick={() => navigate("/dashboard/teams")}>Cancel</button>

          {id && (
            <button type="button" className="btn ghost" style={{ marginLeft: "auto", color: "crimson" }} onClick={handleDelete}>
              Delete Team
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: "16px 0" }} />

      <div>
        <h4>Assign employees</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {employees.map((emp) => (
            <label key={emp.id} style={{ border: "1px solid #eee", padding: 8, borderRadius: 6, display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" value={emp.id} checked={selected.includes(emp.id)} onChange={(ev) => toggleSelect(ev.currentTarget.value)} />
              <div>
                <div>{emp.first_name} {emp.last_name}</div>
                <div className="small">{emp.email}</div>
              </div>
            </label>
          ))}
        </div>

        <div style={{ marginTop: 8 }}>
          <button className="btn" onClick={handleAssign} disabled={assigning}>{assigning ? "Assigning..." : "Assign selected"}</button>
        </div>
      </div>
    </div>
  );
}