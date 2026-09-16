import { useState } from 'react';
import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ProgressBar } from '../../components/common/ProgressBar';
import { mockStudentsList } from '../../mock/skillBridgeData';
import { Users, Search, Filter, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import type { StudentProfile } from '../../types/skillbridge';

export const InstituteStudents: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const filteredStudents = mockStudentsList.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.placementStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Student Directory
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Searchable cohort profiles, verified readiness scores, and placement tracking.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students or course..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Clean Compact Student Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-5">Student</th>
                <th className="py-3 px-5">Course / Program</th>
                <th className="py-3 px-5 text-center">Skill Readiness</th>
                <th className="py-3 px-5 text-center">Training Progress</th>
                <th className="py-3 px-5 text-right">Placement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredStudents.map((s) => {
                const isPlaced = s.placementStatus === 'Placed';
                const isInProcess = s.placementStatus === 'In Process';

                return (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block hover:text-purple-600">
                            {s.name}
                          </span>
                          <span className="text-[11px] text-slate-400">{s.year}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-slate-700">
                      {s.program}
                    </td>

                    <td className="py-3.5 px-5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 font-bold tabular-nums">
                        {s.readinessScore}%
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 font-bold tabular-nums">
                        {s.learningProgress}%
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <Badge
                        variant={isPlaced ? 'success' : isInProcess ? 'purple' : 'warning'}
                        size="sm"
                      >
                        {s.placementStatus}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Detailed Modal Profile */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={selectedStudent.name}
          subtitle={`${selectedStudent.program} • ${selectedStudent.year}`}
          footer={
            <button
              onClick={() => setSelectedStudent(null)}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
            >
              Close Profile
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            {/* KPI Summary Grid */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Readiness</span>
                <span className="text-base font-bold text-slate-900">{selectedStudent.readinessScore}%</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Training Completed</span>
                <span className="text-base font-bold text-slate-900">{selectedStudent.learningProgress}%</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Placement</span>
                <span className="text-base font-bold text-purple-700">{selectedStudent.placementStatus}</span>
              </div>
            </div>

            {/* Skills Matched */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-1.5">Industry Competency Profile</h4>
              <div className="space-y-2 p-3 bg-white rounded-xl border border-slate-200">
                <ProgressBar
                  value={selectedStudent.readinessScore}
                  label="Target Job Readiness"
                  color="brand"
                  size="md"
                />
                <div className="flex justify-between text-slate-500 pt-1 text-[11px]">
                  <span>Matched Skills: <strong>{selectedStudent.skillsMatchedCount} of {selectedStudent.skillsTotalCount}</strong></span>
                  <span>CGPA: <strong>{selectedStudent.cgpa} / 10.0</strong></span>
                </div>
              </div>
            </div>

            {/* Placement Diagnostic */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <h4 className="font-semibold text-slate-800 mb-1">Campus Placement Status</h4>
              <p className="text-slate-600 leading-relaxed">
                {selectedStudent.placementStatus === 'Placed'
                  ? 'Candidate successfully placed through campus recruitment drive. All core industry technical prerequisites verified.'
                  : selectedStudent.placementStatus === 'In Process'
                  ? 'Shortlisted for technical interviews with partnering tech employers. Preparing for live coding evaluations.'
                  : 'Actively participating in skill training programs. Recommended to complete Cloud & Communication modules to boost employability.'}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
