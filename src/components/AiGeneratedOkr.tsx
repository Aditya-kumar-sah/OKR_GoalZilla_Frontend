import { useContext, useState } from "react";
import axios from "axios";
import { OkrListContext } from "../context/OkrProvider";

type KeyResultType = {
  description: string;
  currentProgress: number;
  targetProgress: number;
  metric: string;
  isCompleted: boolean;
};

type OkrType = {
  title: string;
  keyResult: KeyResultType[];
};

export default function AiGeneratedOkr() {
  const [prompt, setPrompt] = useState("");
  const [okr, setOkr] = useState<OkrType>({ title: "", keyResult: [] });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {updateOkrList} = useContext(OkrListContext);

  const generateOkr = async () => {
    if (!prompt.trim()) return;
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:3002/ai/generate", { prompt });
      setOkr(data);
      setShowModal(true);
    } catch {
      alert("Failed to generate OKR");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyResultChange = (index: number, field: string, value: any) => {
    const updated = [...okr.keyResult];
    updated[index][field] =
      field === "currentProgress" || field === "targetProgress" ? Number(value) : value;
    updated[index].isCompleted =
      updated[index].currentProgress === updated[index].targetProgress;
    setOkr({ ...okr, keyResult: updated });
  };

  const saveOkr = async () => {
    try {
      setSaving(true);
      
      const { data } = await axios.post("http://localhost:3002/objective", {
        title: okr.title,
      });

      const newOkr = {
        title : data.title,
        id : data.id,
        keyResult : []
      }

      for (let kr of okr.keyResult) {
        const krData = await axios.post(`http://localhost:3002/objective/${data.id}/keyResult`, { ...kr });
    
        newOkr.keyResult.push({id : krData.data.id,isCompleted: krData.data.isCompleted,description: krData.data.description,currentProgress: krData.data.currentProgress,targetProgress: krData.data.targetProgress,metric: krData.data.metric,objectiveId : data.id});
      }

      updateOkrList(newOkr);



      alert("OKR Saved Successfully");
      setShowModal(false);
      setPrompt("");
    } catch {
      alert("Failed to save OKR");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
        <div className="pointer-events-none absolute -top-32 -left-32  bg-indigo-600 opacity-10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24  bg-violet-600 opacity-10 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl">

          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              placeholder="What's your Goal?"
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateOkr()}
              className="flex-1 bg-white/5 border border-white text-white  rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-amber-50"
            />
            <button
              onClick={generateOkr}
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-900/50 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>✦ AI Generate</>
              )}
            </button>
          </div>
        </div>
      {showModal && okr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-white/[0.02] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">✨ Edit Your OKR</h2>
                <p className="text-slate-500 text-xs mt-0.5">Review and refine before saving</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto scrollbar-none flex-1 px-8 py-6 space-y-6">

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  Objective
                </label>
                <input
                  type="text"
                  value={okr.title}
                  onChange={(e) => setOkr({ ...okr, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl px-5 py-3.5 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Your main objective..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Key Results
                </label>

                <div className="space-y-4">
                  {okr.keyResult.map((kr, index) => {
                    const percentage =
                      kr.targetProgress > 0
                        ? (kr.currentProgress / kr.targetProgress) * 100
                        : 0;

                    return (
                      <div
                        key={index}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
                            Key Result
                          </span>
                        </div>

                        <input
                          type="text"
                          value={kr.description}
                          onChange={(e) =>
                            handleKeyResultChange(index, "description", e.target.value)
                          }
                          placeholder="Key Result Description"
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-slate-500 mb-1.5">Current</label>
                            <input
                              type="number"
                              value={kr.currentProgress}
                              onChange={(e) =>
                                handleKeyResultChange(index, "currentProgress", e.target.value)
                              }
                              placeholder="0"
                              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-500 mb-1.5">Target</label>
                            <input
                              type="number"
                              value={kr.targetProgress}
                              onChange={(e) =>
                                handleKeyResultChange(index, "targetProgress", e.target.value)
                              }
                              placeholder="100"
                              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-500 mb-1.5">Metric</label>
                            <input
                              type="text"
                              value={kr.metric}
                              onChange={(e) =>
                                handleKeyResultChange(index, "metric", e.target.value)
                              }
                              placeholder="e.g. %"
                              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500">Progress</span>
                            <span className="text-xs font-semibold text-indigo-300">
                              {Math.round(Math.min(percentage, 100))}%
                            </span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(percentage, 100)}%`,
                                background: kr.isCompleted
                                  ? "linear-gradient(90deg,#10b981,#34d399)"
                                  : "linear-gradient(90deg,#6366f1,#a78bfa)",
                              }}
                            />
                          </div>
                          <div className="flex justify-end pt-1">
                            <span
                              className={`text-xs font-medium px-3 py-1 rounded-full border ${
                                kr.isCompleted
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              }`}
                            >
                              {kr.isCompleted ? "Completed ✅" : "In Progress ⏳"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-white/10 bg-white/[0.02] shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveOkr}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-900/40"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>💾 Save OKR</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
