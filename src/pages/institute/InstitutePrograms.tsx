import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Layers, Plus, Users, Clock, CheckCircle2, Play } from 'lucide-react';
import type { TrainingProgramItem } from '../../types/skillbridge';

export const InstitutePrograms: FC = () => {
  const { trainingPrograms, createTrainingProgram } = useSkillBridge();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Cloud');
  const [newStudents, setNewStudents] = useState('120');
  const [newWeeks, setNewWeeks] = useState('8');
  const [newTrainer, setNewTrainer] = useState('Rajesh Kulkarni');

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createTrainingProgram({
      title: newTitle,
      category: newCategory,
      enrolledStudents: parseInt(newStudents) || 100,
      completionRate: 10,
      durationWeeks: parseInt(newWeeks) || 8,
      trainerName: newTrainer,
      status: 'Active'
    });

    setNewTitle('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Training Programs
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Institutional cohorts, practical labs, and skill development tracks.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Program</span>
        </button>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trainingPrograms.map((prog) => (
          <Card key={prog.id} padding="md" className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    {prog.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {prog.title}
                  </h3>
                </div>
                <Badge variant={prog.status === 'Active' ? 'success' : 'neutral'} size="sm">
                  {prog.status}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{prog.enrolledStudents} Enrolled</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{prog.durationWeeks} Weeks Duration</span>
                </div>
                <span>&bull;</span>
                <span>Lead: <strong className="text-slate-700">{prog.trainerName}</strong></span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <ProgressBar
                value={prog.completionRate}
                label="Cohort Syllabus Completion"
                color={prog.completionRate >= 70 ? 'emerald' : 'brand'}
                size="md"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  AY 2026-27 Active Schedule
                </span>

                <button
                  onClick={() => {}}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  View Program
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Program Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Training Program"
          subtitle="Deploy a new lab track or semester skill module for enrolled students"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Program Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                placeholder="e.g. Advanced Cloud Engineering & Kubernetes Lab"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Cloud">Cloud &amp; DevOps</option>
                  <option value="AI & ML">AI &amp; Machine Learning</option>
                  <option value="Data">Data Analytics</option>
                  <option value="Programming">Programming</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Duration (Weeks)
                </label>
                <input
                  type="number"
                  value={newWeeks}
                  onChange={(e) => setNewWeeks(e.target.value)}
                  min="2"
                  max="24"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Enrolled Students
                </label>
                <input
                  type="number"
                  value={newStudents}
                  onChange={(e) => setNewStudents(e.target.value)}
                  min="20"
                  max="500"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Assigned Lead Trainer
                </label>
                <select
                  value={newTrainer}
                  onChange={(e) => setNewTrainer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Rajesh Kulkarni">Rajesh Kulkarni (Cloud)</option>
                  <option value="Arjun Rao">Arjun Rao (AI/ML)</option>
                  <option value="Priya Sharma">Priya Sharma (Data)</option>
                  <option value="Dr. Meenakshi Sundaram">Dr. Meenakshi Sundaram</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-xs"
              >
                Launch Program
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
