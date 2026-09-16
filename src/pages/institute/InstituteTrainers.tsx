import { useState } from 'react';
import type { FC } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { mockTrainers } from '../../mock/skillBridgeData';
import { GraduationCap, Award, BookOpen, Users, Sparkles, AlertCircle } from 'lucide-react';
import type { TrainerItem } from '../../types/skillbridge';

export const InstituteTrainers: FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerItem | null>(null);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Faculty &amp; Trainer Management
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Oversee departmental instructors, student load, and faculty upskilling programs.
          </p>
        </div>
        <Badge variant="purple" size="md">
          {mockTrainers.length} Active Instructors
        </Badge>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTrainers.map((trainer) => (
          <Card key={trainer.id} padding="md" className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 border border-purple-200">
                    {trainer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {trainer.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">{trainer.specialization}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <span>★</span>
                  <span>{trainer.performanceRating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Courses Taught</span>
                  <span className="font-semibold text-slate-800">{trainer.coursesCount} Programs</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Students Mentored</span>
                  <span className="font-semibold text-slate-800">{trainer.studentsCount} Students</span>
                </div>
              </div>

              {/* Recommended Upskilling Box */}
              <div className="p-2.5 rounded-lg border border-purple-200 bg-purple-50/40 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-purple-900 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Trainer Upskilling Need:</span>
                </div>
                <p className="text-purple-800 text-[11px] leading-relaxed">
                  {trainer.recommendedUpskilling}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Student Avg Readiness: <strong className="text-slate-900">{trainer.studentAvgReadiness}%</strong>
              </span>

              <button
                onClick={() => setSelectedTrainer(trainer)}
                className="text-xs font-semibold text-purple-700 hover:text-purple-800 hover:underline"
              >
                View Details
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Trainer Detail Modal */}
      {selectedTrainer && (
        <Modal
          isOpen={!!selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
          title={selectedTrainer.name}
          subtitle={selectedTrainer.specialization}
          footer={
            <button
              onClick={() => setSelectedTrainer(null)}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-semibold text-slate-800 mb-1.5">Courses Assigned</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedTrainer.courses.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-medium border border-slate-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h4 className="font-semibold text-slate-800">Student Cohort Skill Deficit</h4>
              <p className="text-slate-600">
                Identified gap among enrolled students: <strong>{selectedTrainer.topSkillGapAmongStudents}</strong>
              </p>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1.5">
              <h4 className="font-semibold text-purple-900">Recommended Faculty Development Program (FDP)</h4>
              <p className="text-purple-800 leading-relaxed">
                {selectedTrainer.recommendedUpskilling}. Sponsored by state technical education board grants to upgrade lab infrastructure.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
