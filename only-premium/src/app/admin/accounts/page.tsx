"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function AccountsAdminPage() {
  const [productStr, setProductStr] = useState("");
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Dummy API call Simulation
    // Normally, call an API that parses `email:password` per line,
    // and invokes `Account.create()` for each.
    setTimeout(() => {
      setResult({ success: true, count: rawText.split("\n").filter(l => l.trim() !== "").length });
      setRawText("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Administración de Cuentas</h1>

      <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-2xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <UploadCloud className="text-indigo-400" />
          Subida Masiva
        </h2>
        
        {result && (
          <div className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-xl flex items-center gap-3">
            <CheckCircle size={20} />
            Se han subido {result.count} cuentas exitosamente.
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm text-white/60 mb-2">ID o Nombre del Producto</label>
            <input 
              required
              type="text" 
              value={productStr}
              onChange={e => setProductStr(e.target.value)}
              className="w-full bg-[#131313] border border-white/10 rounded-xl px-4 py-3"
              placeholder="Ej: Netflix 1 Pantalla"
            />
          </div>
          
          <div>
            <label className="block text-sm text-white/60 mb-2">Lista de Cuentas (formato correo:contraseña)</label>
            <textarea 
              required
              rows={8}
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              className="w-full bg-[#131313] border border-white/10 font-mono text-sm leading-relaxed rounded-xl px-4 py-3 resize-y"
              placeholder="user1@email.com:pass123&#10;user2@email.com:pass456"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="bg-white text-black font-bold py-3 px-8 rounded-xl hover:bg-indigo-400 hover:text-white transition w-full md:w-auto"
          >
            {loading ? "Procesando..." : "Subir Cuentas"}
          </button>
        </form>
      </div>
    </div>
  );
}
