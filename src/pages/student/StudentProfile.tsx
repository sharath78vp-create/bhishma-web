import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { User, Building2, Award, Mail, BookOpen, CheckCircle2 } from 'lucide-react';

export const StudentProfile: FC = () => {
  const { student, studentSkills } = useSkillBridge();

  const strongSkills = studentSkills.filter(s => s.proficiency >= 70);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-brand-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Student Profile
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Verified academic credentials and digital skill competency transcript.
          </p>
        </div>
        <Badge variant="success" size="md">
          Placement Status: {student.placementStatus}
        </Badge>
      </div>

      {/* Main Profile Info Card */}
      <Card padding="lg" className="border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
              <span className="text-slate-400 font-mono text-xs">({student.id})</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {student.program} &bull; {student.year}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{student.instituteName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{student.email}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cumulative GPA</span>
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">{student.cgpa} / 10.0</span>
          </div>
        </div>
      </Card>

      {/* Verified Digital Competency Badges */}
      <Card padding="lg">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900">
            Verified Competencies &amp; Badges ({strongSkills.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Skills meeting or exceeding the 70% threshold verified via proctored institutional assessments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {strongSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                </div>
                <span className="text-[11px] text-emerald-800 font-medium pl-5 block">
                  {skill.proficiency}% Proficiency
                </span>
              </div>
              <Badge variant="success" size="sm">
                Verified
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
